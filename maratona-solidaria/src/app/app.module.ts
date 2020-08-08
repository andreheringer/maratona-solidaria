import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { NgxsModule } from "@ngxs/store";
import { UserState } from "./shared/stores/user/user.state";
import { NgxsDispatchPluginModule } from "@ngxs-labs/dispatch-decorator";
import { PagesModule } from "./pages/pages.module";
import { CoreModule } from "./core/core.module";
import { NgxsFormPluginModule } from "@ngxs/form-plugin";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([UserState]),
    NgxsFormPluginModule.forRoot(),
    NgxsDispatchPluginModule,
    PagesModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
