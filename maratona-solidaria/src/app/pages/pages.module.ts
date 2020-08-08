import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.page";
import { NgxsFormPluginModule } from "@ngxs/form-plugin";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentsModule } from "../components/components.module";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    NgxsFormPluginModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
})
export class PagesModule {}
