import { ColaborateComponent } from "./pages/colaborate/colaborate.page";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.page";
import { AboutComponent } from "./pages/about/about.page";
import { AuthGuard } from "./core/middleware/AuthGuard";
import { PDFComponent } from "./pages/pdfs/pdfs.page";
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.page';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "about", component: AboutComponent },
  {
    path: "colaborate",
    component: ColaborateComponent,
    canActivate: [AuthGuard],
  },
  { path: "uploads/Regulamento.pdf", component: PDFComponent },
  { path: "leaderboard", component: LeaderboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
