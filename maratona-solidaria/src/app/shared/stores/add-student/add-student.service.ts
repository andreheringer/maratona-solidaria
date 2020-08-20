import { Store } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { Dispatch } from "@ngxs-labs/dispatch-decorator";
import { UpdateFormValue, UpdateFormDirty } from "@ngxs/form-plugin";
import getEmpty, { AddStudent } from "../../models/addStudent";

@Injectable({
  providedIn: "root",
})
export class AddStudentService {
  constructor(private store: Store) {}

  @Dispatch()
  private clearFormValues() {
    return new UpdateFormValue({
      path: "addStudent.form",
      value: getEmpty(),
    });
  }

  @Dispatch()
  private setFormClean() {
    return new UpdateFormDirty({
      dirty: false,
      path: "addStudent.form",
    });
  }

  public clearForm() {
    this.clearFormValues();
    this.setFormClean();
  }
}
