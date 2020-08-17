import { Injectable } from "@angular/core";
import { State, Action, StateContext } from "@ngxs/store";
import { SetPath } from "./pdf.actions";

const INITIAL_STATE = {
  path: "",
};

export class PDFStateModel {
  public path: string;
}

@State<PDFStateModel>({
  name: "pdf",
  defaults: INITIAL_STATE,
})
@Injectable()
export class PDFState {
  @Action(SetPath)
  setPath(context: StateContext<PDFStateModel>, action: SetPath) {
    const state = context.getState();
    context.setState({
      ...state,
      path: action.path,
    });
  }
}
