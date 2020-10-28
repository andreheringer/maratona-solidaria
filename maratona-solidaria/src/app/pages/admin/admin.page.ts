import { Component, OnInit, OnDestroy, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { DonationService } from 'src/app/shared/stores/donations/donations.service';
import { Subscription } from 'rxjs';
import { Donation } from 'src/app/shared/models/donation';
import { TeamService } from 'src/app/shared/stores/teams/teams.service';
import { Team } from 'src/app/shared/models/team';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.css'],
})
export class AdminComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];
  public allDonations: Donation[];
  public allTeams: Team[];
  public teamId: number;
  @ViewChild('tooltip') tooltip: ElementRef;
  
  constructor(private donationService: DonationService, private teamService: TeamService, private renderer: Renderer2) {}

  ngOnInit(): void {
    let sub = this.donationService.teamDonations$.subscribe((donations) => {
      this.allDonations = donations;
    });
    this.subs.push(sub)
     sub = this.teamService.allTeams$.subscribe((teams) => {
      this.allTeams = teams;
    });
    this.subs.push(sub)
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.forEach((sub) => {
        sub.unsubscribe();
      })
    }
  }

  public isEven(i: number) {
    return i % 2 === 0 ? true : false;
  }

  public confirmDonation(id: number){
    this.donationService.confirmDonation(id);
  }

  filterDonations(){
    debugger;
    this.donationService.filterDonationsState(this.teamId)
  }

  clearFilter(){
    this.donationService.clearDonationsFilter();
  }
}
