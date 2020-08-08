import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.page";
import { AboutComponent } from "./pages/about/about.page";
import { AuthGuard } from "./core/middleware/AuthGuard";

const routes: Routes = [
  { path: "", redirectTo: "about", pathMatch: "full" },
  { path: "login", component: LoginComponent, canActivate: [AuthGuard] },
  { path: "about", component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
