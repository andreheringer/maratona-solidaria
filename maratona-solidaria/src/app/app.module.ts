import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { NgxsModule } from "@ngxs/store";
import { UserState } from "./shared/stores/user/user.state";
import { NgxsDispatchPluginModule } from "@ngxs-labs/dispatch-decorator";
import { PagesModule } from "./pages/pages.module";
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([UserState]),
    NgxsDispatchPluginModule,
    PagesModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
