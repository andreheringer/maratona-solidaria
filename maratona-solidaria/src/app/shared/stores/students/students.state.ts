import { Action, State, StateContext, Selector } from "@ngxs/store";
import { Student } from "../../models/student";
import {
  ClearStudentStore,
  AppendStudentsState,
  UpdateStudentsState,
} from "./students.actions";

const INITIAL_STATE = {
  allStudents: [],
  teamStudents: [],
};

export class StudentStateModel {
  public allStudents: Student[];
  public teamStudents: Student[];
}

@State<StudentStateModel>({
  name: "students",
  defaults: INITIAL_STATE,
})
export class StudentState {
  @Action(ClearStudentStore)
  public clearStudentStore({ setState }: StateContext<StudentStateModel>) {
    setState(INITIAL_STATE);
  }

  @Action(UpdateStudentsState)
  public updateAllStudentState(
    { patchState }: StateContext<StudentStateModel>,
    { partialStudentStateModel }: UpdateStudentsState
  ) {
    patchState(partialStudentStateModel);
  }

  @Action(AppendStudentsState)
  public appendStudentsState(
    ctx: StateContext<StudentStateModel>,
    action: AppendStudentsState
  ) {
    const state = ctx.getState();
    ctx.patchState({
      allStudents: [...state.allStudents, action.newStudent],
      teamStudents: [...state.teamStudents, action.newStudent],
    });
  }

  @Selector()
  public static allStudents(state: StudentStateModel): Student[] {
    return state.allStudents;
  }

  @Selector()
  public static teamStudents(state: StudentStateModel): Student[] {
    return state.teamStudents;
  }
}
