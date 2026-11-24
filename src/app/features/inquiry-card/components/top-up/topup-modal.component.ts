import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InquiryStore } from '../../stores/inquiry.store';
import { InquiryUiStore } from '../../stores/inquiry-ui.store';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { WalletFacade } from '../../../wallet/facades/wallet.facade';
import { InfiniFundingFlow } from '../../../wallet/services/infini-card.service';
import { INFINI_TOP_UP_MIN } from '../../../wallet/types/infini-card.type';

@Component({
  selector: 'app-top-up-modal',
  imports: [CommonModule],
  templateUrl: './topup-modal.component.html',
})
export class TopUpModalComponent {
  private walletFacade = inject(WalletFacade);
  private funding = inject(InfiniFundingFlow);
  private inquiryStore = inject(InquiryStore);
  private toast = inject(ToastrService);

  protected inquiryUiStore = inject(InquiryUiStore);

  readonly MIN_AMOUNT = INFINI_TOP_UP_MIN;

  card = this.inquiryStore.selectedCard;
  walletBalance = signal<number | null>(null);
  currency = signal('USD');
  rechargeAmount = signal(INFINI_TOP_UP_MIN);
  isLoading = signal(false);

  error = computed(() => {
    const amount = this.rechargeAmount();
    const balance = this.walletBalance();
    if (amount < this.MIN_AMOUNT) return `Minimum amount is ${this.MIN_AMOUNT} USD`;
    if (!/^\d+(\.\d{1,2})?$/.test(String(amount))) return 'Use at most 2 decimal places';
    if (balance !== null && amount > balance) return 'Insufficient wallet balance';
    return '';
  });
  isInvalid = computed(() => !!this.error() || this.walletBalance() === null);

  ngOnInit() {
    this.walletFacade.getBalance().subscribe({
      next: (res) => this.walletBalance.set(Number(res.data.wallet_balance)),
      error: (err) => this.toast.error(err?.error?.message),
    });
  }

  handleTopup() {
    const card = this.card();
    if (!card || this.isLoading() || this.isInvalid()) return;
    this.isLoading.set(true);

    this.funding
      .run('topup', card.id, this.rechargeAmount())
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (order) => {
          if (order.status === 'FAILED') {
            this.showError(
              order.failure_reason === 'TOP_UP_TOO_SMALL'
                ? 'The top-up amount is below the minimum allowed. No funds were moved.'
                : 'The top-up was rejected. No funds were moved.',
            );
            return;
          }
          if (order.status === 'SUCCEEDED') this.toast.success('Card topped up successfully.');
          else this.toast.info('The top-up is still being processed.');

          this.inquiryStore.fundingChanged.update((n) => n + 1);
          this.close();
        },
        error: (err) =>
          this.showError(err?.error?.message ?? 'Unable to reach the server. Please try again.'),
      });
  }

  close() {
    this.inquiryStore.selectedCard.set(null);
    this.inquiryUiStore.isTopUpModalOpen.set(false);
  }

  private showError(text: string) {
    Swal.fire({ icon: 'error', title: 'Error', text, confirmButtonText: 'OK' });
  }
}
