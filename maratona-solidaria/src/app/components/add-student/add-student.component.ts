import { Subscription } from 'rxjs';
import { TeamService } from './../../shared/stores/teams/teams.service';
import { AddStudentService } from "./../../shared/stores/add-student/add-student.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Team } from 'src/app/shared/models/team';

@Component({
  selector: "app-add-student",
  templateUrl: "./add-student.component.html",
  styleUrls: ["./add-student.component.css"],
})
export class AddStudentComponent implements OnInit {
  private sub: Subscription;
  teams: Team[];
  defaultTeamDisabled: boolean = false;
  addStudentForm = new FormGroup({
    nome: new FormControl(),
    matricula: new FormControl(),
    curso: new FormControl(),
    email: new FormControl(),
    telefone: new FormControl(),
    observacao: new FormControl(),
  });

  constructor(private addStudentService: AddStudentService, private teamService: TeamService) {}

  ngOnInit(): void {
    this.teamService.syncTeams();
    this.sub = this.teamService.allTeams$.subscribe((teams) => {
      this.teams = teams;
    });
  }

  onTeamChange() {
    this.defaultTeamDisabled = true
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit() {
    this.addStudentService.submit();
  }
}
