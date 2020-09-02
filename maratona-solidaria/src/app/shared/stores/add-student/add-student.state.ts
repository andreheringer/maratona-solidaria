import { Injectable } from "@angular/core";
import { State, Action, StateContext } from "@ngxs/store";
import { AddStudent } from "../../models/addStudent";
import { ClearAddStudentStore } from "./add-student.actions";

const INITIAL_STATE = {
  form: {
    model: new AddStudent(),
    dirty: false,
    status: "",
    errors: {},
  },
};

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
  defaults: INITIAL_STATE,
})
@Injectable()
export class AddStudentState {
  @Action(ClearAddStudentStore)
  public clearAddStudentStore({
    setState,
  }: StateContext<AddStudentStateModel>) {
    setState(INITIAL_STATE);
  }
}
