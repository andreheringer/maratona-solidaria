import { StudentStateModel } from "./students.state";
import { Student } from "../../models/student";

export class ClearStudentStore {
  public static readonly type = "[STUDENTS] ClearStudentsState";
}

export class UpdateStudentsState {
  public static readonly type = "[STUDENTS] UpdateStudentsState";
  constructor(public partialStudentStateModel: Partial<StudentStateModel>) {}
}

export class AppendStudentsState {
  public static readonly type = "[STUDENTS] AppendStudentsState";
  constructor(public newStudent: Student) {}
}
