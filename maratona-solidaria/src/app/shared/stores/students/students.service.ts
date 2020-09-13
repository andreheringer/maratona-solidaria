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
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Student } from '../../models/student';
import { Permission } from '../../enums/permission';
import { AddStudent } from '../../models/addStudent';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private store: Store, private http: HttpClient) {}

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

  public addStudent(student: AddStudent) {
    //post student
    this.appendStudentsState(student);
  }
}
