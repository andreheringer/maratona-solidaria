import { Team } from './../app/shared/models/team';
import { Observable } from 'rxjs';
import { TeamService } from './../app/shared/stores/teams/teams.service';
import { TeamState } from './../app/shared/stores/teams/teams.state';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { Store } from '@ngxs/store';
import { NgxsModule } from '@ngxs/store';
import { TestBed } from '@angular/core/testing';

const createTeamsRepositoryMock = (): any => {
  return {
    getClassificacao: () => {
      return new Observable((subscriber) => {
        subscriber.next([
          {
            id: 0,
            nome: 'Ciência da Computação',
            pontuacao: 0,
            tamanho: 1,
          },
        ]);
        subscriber.complete();
      });
    },
  };
};

describe('TeamService', () => {
  let store: Store;
  let teamService: TeamService;
  let teamsRepo = createTeamsRepositoryMock();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([TeamState]), NgxsDispatchPluginModule],
    });

    store = TestBed.inject(Store);
    teamService = new TeamService(store, teamsRepo);
  });

  it('should start empty', () => {
    let teams: Team[];

    teamService.allTeams$.subscribe((storeTeams) => {
      teams = storeTeams;
    });

    expect(teams).toEqual([]);
  });

  it('should sync with mocked teams', () => {
    let teams: any[];

    teamService.allTeams$.subscribe((storeTeams) => {
      teams = storeTeams;
    });
    teamService.syncTeams();

    expect(teams).toEqual([
      {
        id: 0,
        name: 'Ciência da Computação',
        points: 0,
        size: 1,
      },
    ]);
  });

  it("should add score to id'd team", () => {
    let teams: any[];

    teamService.allTeams$.subscribe((storeTeams) => {
      teams = storeTeams;
    });
    teamService.syncTeams();
    teamService.addTeamScore(teams[0].id, 8);

    expect(teams).toEqual([
      {
        id: 0,
        name: 'Ciência da Computação',
        points: 8,
        acronime: undefined,
      },
    ]);
  });
});
