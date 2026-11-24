import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { InquiryStore } from '../../stores/inquiry.store';
import { InquiryUiStore } from '../../stores/inquiry-ui.store';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { InfiniFundingFlow } from '../../../wallet/services/infini-card.service';
import {
  INFINI_MIN_CARD_BALANCE,
  INFINI_WITHDRAW_MIN,
} from '../../../wallet/types/infini-card.type';

@Component({
  selector: 'app-widthdrawl-card-modal',
  imports: [CommonModule],
  templateUrl: './widthdrawl-modal.component.html',
})
export class WidthdrawlCardModalComponent {
  private inquiryStore = inject(InquiryStore);
  private funding = inject(InfiniFundingFlow);
  private toast = inject(ToastrService);

  protected inquiryUiStore = inject(InquiryUiStore);

  readonly MIN_AMOUNT = INFINI_WITHDRAW_MIN;
  readonly MIN_CARD_BALANCE = INFINI_MIN_CARD_BALANCE;

  card = this.inquiryStore.selectedCard;
  currency = signal('USD');
  transferAmount = signal(1);
  isLoading = signal(false);

  // The backend checks the real card balance at the provider before moving funds.
  cardBalance = computed(() => Number(this.card()?.remaining_amount ?? 0));
  maxAmount = computed(() =>
    Math.max(0, (Math.floor(this.cardBalance() * 100 + 1e-6) - this.MIN_CARD_BALANCE * 100) / 100),
  );

  error = computed(() => {
    const amount = this.transferAmount();
    if (amount < this.MIN_AMOUNT) return 'Please enter an amount';
    if (!/^\d+(\.\d{1,2})?$/.test(String(amount))) return 'Use at most 2 decimal places';
    if (amount > this.maxAmount()) {
      return `The card must keep at least ${this.MIN_CARD_BALANCE} USD (maximum ${this.maxAmount().toFixed(2)} USD)`;
    }
    return '';
  });
  isInvalid = computed(() => !!this.error());

  handleWidthdrawl() {
    const card = this.card();
    if (!card || this.isLoading() || this.isInvalid()) return;
    this.isLoading.set(true);

    this.funding
      .run('withdraw', card.id, this.transferAmount())
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (order) => {
          if (order.status === 'FAILED') {
            this.showError(
              order.failure_reason === 'WITHDRAW_COOLDOWN'
                ? 'Funds can be withdrawn 30 minutes after the last top-up. No funds were moved.'
                : 'The withdrawal was rejected. No funds were moved.',
            );
            return;
          }
          if (order.status === 'SUCCEEDED') {
            this.toast.success('Funds moved to your wallet successfully.');
          } else {
            this.toast.info('The withdrawal is still being processed.');
          }

          this.inquiryStore.fundingChanged.update((n) => n + 1);
          this.close();
        },
        error: (err) => {
          const message = err?.error?.message ?? 'Unable to reach the server. Please try again.';
          const availableAt = err?.error?.data?.available_at;
          this.showError(
            availableAt
              ? `${message} Available at ${new Date(availableAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`
              : message,
          );
        },
      });
  }

  close() {
    this.inquiryStore.selectedCard.set(null);
    this.inquiryUiStore.isWidthdrawlOpen.set(false);
  }

  private showError(text: string) {
    Swal.fire({ icon: 'error', title: 'Error', text, confirmButtonText: 'OK' });
  }
}
