import { TeamStateModel } from "./teams.state";
import { Team } from "../../models/team";

export class ClearTeamStore {
  public static readonly type = "[TEAMS] ClearTeamsState";
}

export class UpdateTeamsState {
  public static readonly type = "[TEAMS] UpdateTeamsState";
  constructor(public partialTeamStateModel: Partial<TeamStateModel>) {}
}

export class AppendTeamsState {
  public static readonly type = "[TEAMS] AppendTeamsState";
  constructor(public newTeam: Team) {}
}
