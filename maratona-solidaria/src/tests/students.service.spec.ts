import { TeamState } from './../app/shared/stores/teams/teams.state';
import { HttpClientModule } from '@angular/common/http';
import { TeamService } from './../app/shared/stores/teams/teams.service';
import { StudentState } from './../app/shared/stores/students/students.state';
import { StudentService } from './../app/shared/stores/students/students.service';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { Store } from '@ngxs/store';
import { NgxsModule } from '@ngxs/store';
import { TestBed } from '@angular/core/testing';
import {
  createTeamsRepositoryMock,
  createStudentsRepositoryMock,
} from './mocks';

describe('StudentService', () => {
  let store: Store;
  let studentService: StudentService;
  let teamService: TeamService;
  let teamsRepo = createTeamsRepositoryMock();
  let studentsRepo = createStudentsRepositoryMock();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([StudentState, TeamState]),
        NgxsDispatchPluginModule,
        HttpClientModule,
      ],
    });

    store = TestBed.inject(Store);
    teamService = new TeamService(store, teamsRepo);
    studentService = new StudentService(store, studentsRepo, teamService);
  });

  it('should start empty', () => {
    let allStudents: any[];
    let teamStudents: any[];

    studentService.allStudents$.subscribe((storeStudents) => {
      allStudents = storeStudents;
    });
    studentService.teamStudents$.subscribe((storeStudents) => {
      teamStudents = storeStudents;
    });

    expect(allStudents).toEqual([]);
    expect(teamStudents).toEqual([]);
  });

  it('should sync with mocked students', () => {
    let teamStudents: any[];

    teamService.syncTeams();
    studentService.teamStudents$.subscribe((storeStudents) => {
      teamStudents = storeStudents;
    });
    studentService.syncStudents();

    expect(teamStudents).toEqual([
      {
        id: 0,
        nome: 'Henrique',
        matricula: 2016100000,
        curso: {
          id: 0,
          name: 'Ciência da Computação',
          points: 0,
          size: 1,
          acronime: 'CC',
        },
        email: 'henrique@mail.com',
        telefone: null,
        observacao: null,
      },
    ]);
  });

  it('should create a student', () => {
    let teamStudents: any[];

    teamService.syncTeams();
    studentService.teamStudents$.subscribe((storeStudents) => {
      teamStudents = storeStudents;
    });
    studentService.addStudent({
      id: null,
      nome: 'Henrique',
      matricula: 2016100000,
      curso: {
        id: 0,
        name: 'Ciência da Computação',
        points: 0,
        acronime: 'CC',
      },
      email: 'henrique@mail.com',
      telefone: null,
      observacao: null,
    });

    expect(teamStudents).toEqual([
      {
        id: 0,
        nome: 'Henrique',
        matricula: 2016100000,
        curso: {
          id: 0,
          name: 'Ciência da Computação',
          points: 0,
          acronime: 'CC',
        },
        email: 'henrique@mail.com',
        telefone: null,
        observacao: null,
      },
    ]);
  });
});
