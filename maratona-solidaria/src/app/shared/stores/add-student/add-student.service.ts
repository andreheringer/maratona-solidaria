import { UpdateFormValue } from '@ngxs/form-plugin';
import { Team } from 'src/app/shared/models/team';
import { Store } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { Dispatch } from "@ngxs-labs/dispatch-decorator";
import { ClearAddStudentStore } from "./add-student.actions";
import { StudentService } from "../students/students.service";
import { AddStudentStateModel } from "./add-student.state";

@Injectable({
  providedIn: "root",
})
export class AddStudentService {
  constructor(private store: Store, private studentService: StudentService) {}

  private getStore() {
    return this.store.snapshot().addStudent as AddStudentStateModel;
  }

  @Dispatch()
  private clearFormStore() {
    return new ClearAddStudentStore();
  }

  public clearForm() {
    this.clearFormStore();
  }

  public setTeam(team: Team) {
    this.store.dispatch(new UpdateFormValue({value: team, path: "addStudent.form", propertyPath: "curso"}));
  }

  public submit() {
    this.studentService.addStudent(this.getStore().form.model);
    this.clearFormStore();
  }
}
