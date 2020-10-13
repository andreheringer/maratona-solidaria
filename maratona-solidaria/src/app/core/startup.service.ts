import { Injectable } from '@angular/core';
import { DonationService } from '../shared/stores/donations/donations.service';
import { StudentService } from '../shared/stores/students/students.service';
import { TeamService } from '../shared/stores/teams/teams.service';

@Injectable({
  providedIn: 'root'
})
export class StartupService {

  constructor(private teamService: TeamService, private studentService: StudentService, private donationService: DonationService){}

  public async preloadStores(): Promise<void>{
    this.teamService.syncTeams();
    this.studentService.syncStudents();
    this.donationService.synchDonations();
  }
}
