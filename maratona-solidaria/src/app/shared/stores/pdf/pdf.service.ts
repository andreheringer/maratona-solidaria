import { SetPath } from "./pdf.actions";
import { Store } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { Dispatch } from "@ngxs-labs/dispatch-decorator";
import { PDFStateModel } from "./pdf.state";
@Injectable({
  providedIn: "root",
})
export class PDFService {
  constructor(private store: Store) {}

  private getStore() {
    return this.store.snapshot().pdf as PDFStateModel;
  }

  @Dispatch()
  public setPath(path: string) {
    return new SetPath(path);
  }

  public getPath(): string {
    return this.getStore().path;
  }
}
