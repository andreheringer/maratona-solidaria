import { StudentState } from './../app/shared/stores/students/students.state';
import { StudentService } from './../app/shared/stores/students/students.service';
import { PRODUCTS } from './../app/shared/models/product';
import { DonationState } from './../app/shared/stores/donations/donations.state';
import { DonationService } from './../app/shared/stores/donations/donations.service';
import { TeamState } from './../app/shared/stores/teams/teams.state';
import { HttpClientModule } from '@angular/common/http';
import { TeamService } from './../app/shared/stores/teams/teams.service';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { Store } from '@ngxs/store';
import { NgxsModule } from '@ngxs/store';
import { TestBed } from '@angular/core/testing';
import {
  createTeamsRepositoryMock,
  createStudentsRepositoryMock,
  createDonationsRepositoryMock,
  donationStub,
} from './mocks';

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
      imports: [
        NgxsModule.forRoot([DonationState, TeamState, StudentState]),
        NgxsDispatchPluginModule,
        HttpClientModule,
      ],
    });

    store = TestBed.inject(Store);
    teamService = new TeamService(store, teamsRepo);
    studentService = new StudentService(store, studentsRepo, teamService);
    donationService = new DonationService(
      store,
      teamService,
      studentService,
      donationsRepo
    );
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

  it('should sync with mocked donations and add confirmed points', () => {
    let allDonations: any[];
    let allTeams: any[];

    teamService.allTeams$.subscribe((storeTeams) => {
      allTeams = storeTeams;
    });
    teamService.syncTeams();
    studentService.syncStudents();

    donationService.syncDonations();
    donationService.allDonations$.subscribe((storeDonations) => {
      allDonations = storeDonations;
    });

    expect(allDonations).toEqual([
      {
        id: 0,
        ...donationStub,
      },
    ]);
    expect(allTeams).toEqual([
      {
        id: 0,
        name: 'Ciência da Computação',
        points: 0,
        acronime: 'CC',
        size: 1,
      },
    ]);
  });

  it('should create a donation', () => {
    //ARRANGE
    let allDonations: any[];

    studentService.syncStudents();

    //ACT
    donationService.allDonations$.subscribe((storeDonations) => {
      allDonations = storeDonations;
    });
    donationService.donate({
      id: null,
      ...donationStub,
    });

    //ASSERT
    expect(allDonations).toEqual([
      {
        id: 0,
        ...donationStub,
      },
    ]);
  });

  it('should confirm a donation', () => {
    let allDonations: any[];
    let allTeams: any[];
    teamService.syncTeams();
    studentService.syncStudents();

    teamService.allTeams$.subscribe((storeTeams) => {
      allTeams = storeTeams;
    });
    donationService.allDonations$.subscribe((storeDonations) => {
      allDonations = storeDonations;
    });
    donationService.syncDonations();
    donationService.confirmDonation(allDonations[0].id);

    expect(allDonations).toEqual([
      {
        id: 0,
        ...donationStub,
        confirmado: true,
      },
    ]);
    expect(allTeams).toEqual([
      {
        id: 0,
        name: 'Ciência da Computação',
        points: PRODUCTS[0].points,
        acronime: 'CC',
      },
    ]);
  });
});
