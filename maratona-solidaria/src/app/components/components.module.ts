import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { SimpleDonationComponent } from "./simple-donation/simple-donation.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [HeaderComponent, SimpleDonationComponent],
  imports: [CommonModule, NgbModule],
  exports: [HeaderComponent, SimpleDonationComponent],
})
export class ComponentsModule {}
