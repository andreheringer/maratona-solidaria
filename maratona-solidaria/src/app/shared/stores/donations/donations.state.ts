import { Action, State, StateContext, Selector } from '@ngxs/store';
import { Donation } from '../../models/donation';
import {
  ClearDonationStore,
  AppendDonationsState,
  UpdateDonationsState,
} from './donations.actions';
import { SimpleDonation } from '../../models/simpleDonation';

const INITIAL_STATE = {
  allDonations: [],
  teamDonations: [],
};

export class DonationStateModel {
  public allDonations: Donation[];
  public teamDonations: Donation[];
}

@State<DonationStateModel>({
  name: 'donations',
  defaults: INITIAL_STATE,
})
export class DonationState {
  @Action(ClearDonationStore)
  public clearDonationStore({ setState }: StateContext<DonationStateModel>) {
    setState(INITIAL_STATE);
  }

  @Action(UpdateDonationsState)
  public updateAllDonationState(
    { patchState }: StateContext<DonationStateModel>,
    { partialDonationStateModel }: UpdateDonationsState
  ) {
    patchState(partialDonationStateModel);
  }

  @Action(AppendDonationsState)
  public appendDonationsState(
    ctx: StateContext<DonationStateModel>,
    action: AppendDonationsState
  ) {
    const state = ctx.getState();
    ctx.patchState({
      allDonations: [...state.allDonations, action.newDonation],
      teamDonations: [...state.teamDonations, action.newDonation],
    });
  }

  @Selector()
  public static allDonations(state: DonationStateModel): Donation[] {
    return state.allDonations;
  }

  @Selector()
  public static teamDonations(state: DonationStateModel): Donation[] {
    return state.teamDonations;
  }
}
