import { Injectable } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { TeamStateModel, TeamState } from './teams.state';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import {
  ClearTeamStore,
  UpdateTeamsState,
  AppendTeamsState,
  IncreaseTeamSocre,
} from './teams.actions';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Team } from '../../models/team';
import { Permission } from '../../enums/permission';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private store: Store, private http: HttpClient) {}

  private getStore() {
    return this.store.snapshot().teams as TeamStateModel;
  }

  @Dispatch()
  private clearTeamsStore() {
    return new ClearTeamStore();
  }

  @Dispatch()
  private updateTeamsState(partialTeamStateModel: Partial<TeamStateModel>) {
    return new UpdateTeamsState(partialTeamStateModel);
  }

  @Dispatch()
  private appendTeamsState(team: Team) {
    return new AppendTeamsState(team);
  }
  @Dispatch()
  private increaseTeamScore(teamId: number, score: number) {
    return new IncreaseTeamSocre(teamId, score);
  }

  @Select(TeamState.allTeams)
  public allTeams$: Observable<Team[]>;

  public updateAllTeams(teams: Team[]) {
    this.updateTeamsState({ allTeams: teams });
  }

  public addTeam(team: Team) {
    //post team
    this.appendTeamsState(team);
  }

  public addTeamScore(teamId: number, score: number) {
    this.increaseTeamScore(teamId, score);
  }
}
