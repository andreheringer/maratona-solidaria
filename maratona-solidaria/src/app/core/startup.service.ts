import { Injectable } from '@angular/core';
import { StudentService } from '../shared/stores/students/students.service';
import { TeamService } from '../shared/stores/teams/teams.service';

@Injectable({
  providedIn: 'root'
})
export class StartupService {

  constructor(private teamService: TeamService, private studentService: StudentService){}

  public async preloadStores(): Promise<void>{
    this.teamService.syncTeams();
    this.studentService.syncStudents();
  }
}
