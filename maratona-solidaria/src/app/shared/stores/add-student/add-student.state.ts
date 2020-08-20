import { Injectable } from "@angular/core";
import { State, Action } from "@ngxs/store";
import { AddStudent } from "../../models/addStudent";

export class AddStudentStateModel {
  form: {
    model: AddStudent;
    dirty: boolean;
    status: string;
    errors: any;
  };
}

@State<AddStudentStateModel>({
  name: "addStudent",
  defaults: {
    form: {
      model: undefined,
      dirty: false,
      status: "",
      errors: {},
    },
  },
})
@Injectable()
export class AddStudentState {}
