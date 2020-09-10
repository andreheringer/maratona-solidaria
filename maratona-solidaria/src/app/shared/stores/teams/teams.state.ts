import { Action, State, StateContext, Selector } from "@ngxs/store";
import { Team, TEAMS } from "../../models/team";
import {
  ClearTeamStore,
  AppendTeamsState,
  UpdateTeamsState,
} from "./teams.actions";

const INITIAL_STATE = {
  allTeams: TEAMS,
};

export class TeamStateModel {
  public allTeams: Team[];
}

@State<TeamStateModel>({
  name: "teams",
  defaults: INITIAL_STATE,
})
export class TeamState {
  @Action(ClearTeamStore)
  public clearTeamStore({ setState }: StateContext<TeamStateModel>) {
    setState(INITIAL_STATE);
  }

  @Action(UpdateTeamsState)
  public updateAllTeamState(
    { patchState }: StateContext<TeamStateModel>,
    { partialTeamStateModel }: UpdateTeamsState
  ) {
    patchState(partialTeamStateModel);
  }

  @Action(AppendTeamsState)
  public appendTeamsState(
    ctx: StateContext<TeamStateModel>,
    action: AppendTeamsState
  ) {
    const state = ctx.getState();
    ctx.patchState({
      allTeams: [...state.allTeams, action.newTeam],
    });
  }

  @Selector()
  public static allTeams(state: TeamStateModel): Team[] {
    return state.allTeams;
  }
}
