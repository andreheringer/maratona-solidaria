import { Component, OnInit, OnDestroy } from '@angular/core';
import { DonationService } from 'src/app/shared/stores/donations/donations.service';
import { Subscription } from 'rxjs';
import { Donation } from 'src/app/shared/models/donation';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.css'],
})
export class AdminComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public allDonations: Donation[];
  constructor(private donationService: DonationService) {}

  ngOnInit(): void {
    this.sub = this.donationService.allDonations$.subscribe((donations) => {
      this.allDonations = donations;
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  public isEven(i: number) {
    return i % 2 === 0 ? true : false;
  }

  public confirmDonation(id: number){
    this.donationService.confirmDonation(id);
  }
}
