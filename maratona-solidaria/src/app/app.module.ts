import { StudentState } from './shared/stores/students/students.state';
import { AddStudentState } from './shared/stores/add-student/add-student.state';
import { PDFState } from "./shared/stores/pdf/pdf.state";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { NgxsModule } from "@ngxs/store";
import { UserState } from "./shared/stores/user/user.state";
import { NgxsDispatchPluginModule } from "@ngxs-labs/dispatch-decorator";
import { PagesModule } from "./pages/pages.module";
import { CoreModule } from "./core/core.module";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentsModule } from "./components/components.module";
import { NgxSpinnerModule } from "ngx-spinner";
import { environment } from "src/environments/environment";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxsFormPluginModule } from "@ngxs/form-plugin";
import { SimpleDonationState } from "./shared/stores/simple-donation/simple-donation.state";
import { DonationState } from "./shared/stores/donations/donations.state";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot(
      [UserState, PDFState, SimpleDonationState, DonationState, AddStudentState, StudentState],
      {
        developmentMode: !environment.production,
      }
    ),
    NgxsLoggerPluginModule.forRoot({ disabled: environment.production }),
    NgxsDispatchPluginModule.forRoot(),
    PagesModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    NgxSpinnerModule,
    NgbModule,
    NgxsFormPluginModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
