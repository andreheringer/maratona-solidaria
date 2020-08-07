import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.page";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
