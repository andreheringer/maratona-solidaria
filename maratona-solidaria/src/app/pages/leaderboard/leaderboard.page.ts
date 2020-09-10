import { Subscription } from 'rxjs';
import { Team } from './../../shared/models/team';
import { TeamService } from './../../shared/stores/teams/teams.service';
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
  private routeSub: Subscription;
  private teamsSub: Subscription;
  teams: Team[];
  leaderPoints: number;

  constructor(private router: Router, private route: ActivatedRoute, private teamService: TeamService) {
    this.routeSub = this.route.queryParams.subscribe((params) => {
      if (params.returnUrl) {
        this.returnUrl = params.returnUrl;
      } else {
        this.returnUrl = "";
      }
    });

    this.teamsSub = this.teamService.allTeams$.subscribe((teams) => {
      this.teams = teams;
    });
  }

  public ngOnInit() {
    const a = this.router.url;
    this.leaderPoints = this.teams.reduce((max, team) => max.points > team.points ? max : team).points;
    // this.teams = this.teams.sort((t1, t2) => {
    //   if (t1.points < t2.points){
    //     return 1;
    //   } else if (t1.points === t2.points){
    //     return 0;
    //   } else {
    //     return -1;
    //   }
    // });
  }

  public ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.teamsSub.unsubscribe();
  }

  public getRandomColor(){
    return "warning";
  }
}
