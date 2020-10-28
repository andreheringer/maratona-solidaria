import { Action, State, StateContext, Selector } from '@ngxs/store';
import { Donation } from '../../models/donation';
import {
  ClearDonationStore,
  AppendDonationsState,
  UpdateDonationsState,
  ClearDonationFilter,
  FilterDonationState,
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
      teamDonations: [...state.allDonations, action.newDonation],
    });
  }

  @Action(ClearDonationFilter)
  public clearDonationFilter(
    ctx: StateContext<DonationStateModel>,
  ) {
    const state = ctx.getState();
    ctx.patchState({
      teamDonations: [...state.allDonations],
    });
  }

  @Action(FilterDonationState)
  public filterDonationState(
    ctx: StateContext<DonationStateModel>,
    action: FilterDonationState
  ) {
    const state = ctx.getState();
    ctx.patchState({
      teamDonations: [...state.allDonations.filter( (donation) => donation.representante.curso.id === action.teamId)],
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
