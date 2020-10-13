import { TeamService } from './../teams/teams.service';
import { StudentsRepository } from './../../../core/repositories/students.repository';
import { Injectable } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { StudentStateModel, StudentState } from './students.state';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import {
  ClearStudentStore,
  UpdateStudentsState,
  AppendStudentsState,
} from './students.actions';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from '../../models/student';
import { AddStudent } from '../../models/addStudent';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private store: Store, private studentsRepo: StudentsRepository, private teamService: TeamService) {}

  private getStore() {
    return this.store.snapshot().students as StudentStateModel;
  }

  @Dispatch()
  public clearStudentsStore() {
    return new ClearStudentStore();
  }

  @Dispatch()
  private updateStudentsState(
    partialStudentStateModel: Partial<StudentStateModel>
  ) {
    return new UpdateStudentsState(partialStudentStateModel);
  }

  @Dispatch()
  private appendStudentsState(student: Student) {
    return new AppendStudentsState(student);
  }

  @Select(StudentState.allStudents)
  public allStudents$: Observable<Student[]>;

  @Select(StudentState.teamStudents)
  public teamStudents$: Observable<Student[]>;

  public updateAllStudents(students: Student[]) {
    this.updateStudentsState({ allStudents: students });
  }

  public updateTeamStudents(students: Student[]) {
    this.updateStudentsState({ teamStudents: students });
  }

  public syncStudents() {
    const studentsObs = this.studentsRepo.getStudents();
    studentsObs.subscribe((students) => {
      let currentTeams = [];
      this.teamService.allTeams$.subscribe((teams) => currentTeams = teams);

      this.updateTeamStudents(students.map(student => {
        return {
          id: student.id,
          nome: student.nome,
          matricula: student.matricula,
          curso: currentTeams.find(team => team.id === student.equipe_id),
          email: student.email,
          telefone: student.telefone,
          observacao: student.observacao,
        }
      }));
    });
  }

  public addStudent(student: AddStudent) {
    //post student
    const studentObs = this.studentsRepo.createStudent(student);
    studentObs.subscribe((response) => {
      student.id = response.id;
      this.appendStudentsState(student);
    });
  }
}
