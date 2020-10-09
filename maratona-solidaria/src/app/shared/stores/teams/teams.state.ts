import { Action, State, StateContext, Selector } from '@ngxs/store';
import { Team } from '../../models/team';
import {
  ClearTeamStore,
  AppendTeamsState,
  UpdateTeamsState,
  IncreaseTeamSocre,
} from './teams.actions';

const INITIAL_STATE = {
  allTeams: [],
};

export class TeamStateModel {
  public allTeams: Team[];
}

@State<TeamStateModel>({
  name: 'teams',
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
  @Action(IncreaseTeamSocre)
  public increaseTeamScore(
    ctx: StateContext<TeamStateModel>,
    action: IncreaseTeamSocre
  ) {
    const state = ctx.getState();
    let allTeams: Team[] = [];
    state.allTeams.forEach((team) => {
      const newTeam = {
        acronime: '',
        id: 0,
        name: '',
        points: 0,
      } as Team;
      newTeam.id = team.id;
      newTeam.acronime = team.acronime;
      newTeam.name = team.name;
      newTeam.points =
        team.id === action.teamId ? team.points + action.score : team.points;
      allTeams.push(newTeam);
    });
    ctx.patchState({
      allTeams: [...allTeams],
    });
  }

  @Selector()
  public static allTeams(state: TeamStateModel): Team[] {
    return state.allTeams;
  }
}
