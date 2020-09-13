import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { UpdateFormValue, UpdateFormDirty } from '@ngxs/form-plugin';
import { discardPeriodicTasks } from '@angular/core/testing';
import { ClearSimpleDonationStore } from './simple-donation.actions';
import { DonationService } from '../donations/donations.service';
import { SimpleDonationStateModel } from './simple-donation.state';

@Injectable({
  providedIn: 'root',
})
export class SimpleDonationService {
  constructor(private store: Store, private donationService: DonationService) {}

  private getStore() {
    return this.store.snapshot().simpleDonation as SimpleDonationStateModel;
  }

  @Dispatch()
  private clearFormStore() {
    return new ClearSimpleDonationStore();
  }

  public clearForm() {
    this.clearFormStore();
  }

  public submit() {
    this.donationService.donate(this.getStore().form.model);
    this.clearFormStore();
  }
}
