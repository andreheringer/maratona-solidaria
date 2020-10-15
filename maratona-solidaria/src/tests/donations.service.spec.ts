import { StudentState } from './../app/shared/stores/students/students.state';
import { StudentService } from './../app/shared/stores/students/students.service';
import { PRODUCTS } from './../app/shared/models/product';
import { DonationState } from './../app/shared/stores/donations/donations.state';
import { DonationService } from './../app/shared/stores/donations/donations.service';
import { TeamState } from './../app/shared/stores/teams/teams.state';
import { HttpClientModule } from '@angular/common/http';
import { TeamService } from './../app/shared/stores/teams/teams.service';
import { Observable } from 'rxjs';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { Store } from '@ngxs/store';
import { NgxsModule } from '@ngxs/store';
import { TestBed } from '@angular/core/testing';

const donationStub = {
  doacao: "Doação Teste",
  tipo: PRODUCTS[0].id,
  quantidade: 3,
  representante: {
    id: 0,
    nome: 'Henrique',
    matricula: 2016100000,
    curso: {
      id: 0,
      name: 'Ciência da Computação',
      points: 0,
      acronime: undefined
    },
    email: 'henrique@mail.com',
    telefone: null,
    observacao: null,
  },
  data: null,
  pontuacao: PRODUCTS[0].points,
  observacao: null,
}

const createTeamsRepositoryMock = (): any => {
  return {
    getEquipes: () => {
      return new Observable(subscriber => {
        subscriber.next([{
          id: 0,
          nome: 'Ciência da Computação',
          pontuacao: 0,
        }]);
        subscriber.complete();
      })
    }
  }
}

const createStudentsRepositoryMock = (): any => {
  return {
    getStudents: () => {
      return new Observable(subscriber => {
        subscriber.next([{
          id: 0,
          nome: 'Henrique',
          matricula: 2016100000,
          equipe_id: 0,
          email: 'henrique@mail.com',
          telefone: null,
          observacao: null,
        }]);
        subscriber.complete();
      })
    },
    createStudent: (student) => {
      return new Observable((subscriber) => {
        subscriber.next({
          id: 0
        });
        subscriber.complete();
      });
    }
  }
}

const createDonationsRepositoryMock = (): any => {
  return {
    getDonations: () => {
      return new Observable(subscriber => {
        subscriber.next([{
          id: 0,
          doacao: "Doação Teste",
          tipo: "0",
          quantidade: 3,
          aluno_id: 0,
          data: null,
          pontuacao: 100,
          observacao: null
        }]);
        subscriber.complete();
      })
    },
    createDonation: (donation) => {
      return new Observable((subscriber) => {
        subscriber.next({
          donate_id: 0
        });
        subscriber.complete();
      });
    }
  }
}

describe('DonationService', () => {
  let store: Store;
  let donationService: DonationService;
  let teamService: TeamService;
  let studentService: StudentService;
  let teamsRepo = createTeamsRepositoryMock();
  let studentsRepo = createStudentsRepositoryMock();
  let donationsRepo = createDonationsRepositoryMock();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([DonationState, TeamState, StudentState]), NgxsDispatchPluginModule, HttpClientModule]
    });

    store = TestBed.inject(Store);
    teamService = new TeamService(store, teamsRepo);
    studentService = new StudentService(store, studentsRepo, teamService);
    donationService = new DonationService(store, teamService, studentService, donationsRepo);
  });


  it('should start empty', () => {
    let allDonations: any[];
    let teamDonations: any[];

    donationService.allDonations$.subscribe((storeDonations) => {
      allDonations = storeDonations;
    });
    donationService.teamDonations$.subscribe((storeDonations) => {
      teamDonations = storeDonations;
    });

    expect(allDonations).toEqual([]);
    expect(teamDonations).toEqual([]);
  });


  it('should sync with mocked donations', () => {
    let allDonations: any[];

    teamService.syncTeams();
    teamService.addTeamScore(0, 0); //setting acronime property
    studentService.syncStudents();

    donationService.syncDonations();
    donationService.allDonations$.subscribe((storeDonations) => {
      allDonations = storeDonations;
    });

    expect(allDonations).toEqual([{
      id: 0,
      ...donationStub
    }]);
  });


  it('should create a donation and add points to team', () => {
    //ARRANGE
    let allDonations: any[];

    studentService.syncStudents();

    //ACT
    donationService.allDonations$.subscribe((storeDonations) => {
      allDonations = storeDonations;
    });
    donationService.donate({
      id: null,
      ...donationStub
    });
    
    //ASSERT
    expect(allDonations).toEqual([{
      id: 0,
      ...donationStub
    }]);
  });

});