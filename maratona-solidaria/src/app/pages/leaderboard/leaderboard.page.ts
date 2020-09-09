import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TEAMS } from "src/app/shared/models/team";

@Component({
  selector: "app-leaderboard",
  templateUrl: "./leaderboard.page.html",
  styleUrls: ["./leaderboard.page.css"],
})
export class LeaderboardComponent implements OnInit, OnDestroy {
  public returnUrl = "";
  private sub: any;
  teams = TEAMS;
  leaderPoints: number;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.sub = this.route.queryParams.subscribe((params) => {
      if (params.returnUrl) {
        this.returnUrl = params.returnUrl;
      } else {
        this.returnUrl = "";
      }
    });
  }

  public ngOnInit() {
    const a = this.router.url;
    this.leaderPoints = this.teams.reduce((max, team) => max.points > team.points ? max : team).points;
    this.teams = this.teams.sort((t1, t2) => {
      if (t1.points < t2.points){
        return 1;
      } else if (t1.points === t2.points){
        return 0;
      } else {
        return -1;
      }
    });
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public getRandomColor(){
    return "warning";
  }
}
