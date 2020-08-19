import { ColaborateComponent } from "./colaborate/colaborate.page";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.page";
import { NgxsFormPluginModule } from "@ngxs/form-plugin";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentsModule } from "../components/components.module";
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AboutComponent } from "./about/about.page";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [LoginComponent, AboutComponent, ColaborateComponent],
  imports: [
    CommonModule,
    NgxsFormPluginModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    NgxSpinnerModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
  ],
})
export class PagesModule {}
