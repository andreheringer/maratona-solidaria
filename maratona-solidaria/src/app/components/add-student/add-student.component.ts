import { UserService } from 'src/app/shared/stores/user/user.service';
import { Subscription } from 'rxjs';
import { TeamService } from './../../shared/stores/teams/teams.service';
import { AddStudentService } from './../../shared/stores/add-student/add-student.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Team } from 'src/app/shared/models/team';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements OnInit {
  private sub: Subscription;
  teams: Team[];
  defaultTeamDisabled: boolean = false;
  team: Team;
  addStudentForm = new FormGroup({
    nome: new FormControl([Validators.required]),
    matricula: new FormControl([Validators.required]),
    curso: new FormControl([Validators.required]),
    email: new FormControl(),
    telefone: new FormControl([Validators.required]),
    observacao: new FormControl(),
  });

  @Output('changeForm') changeForm = new EventEmitter();

  constructor(
    private addStudentService: AddStudentService,
    private teamService: TeamService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.teamService.syncTeams();
    this.sub = this.teamService.allTeams$.subscribe((teams) => {
      this.teams = teams;
    });

    const user = this.userService.getUser();
    this.team = this.teams.find((team) => team.id === user.data.teamId);
    this.addStudentService.setTeam(this.team);
  }

  onTeamChange() {
    this.defaultTeamDisabled = true;
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit() {
    this.addStudentForm.valid
      ? this.addStudentService.submit()
      : alert("Preencha todos os campos obrigatórios indicados por '*");
  }

  onChangeForm() {
    this.changeForm.emit({});
  }
}
