import { AddStudentComponent } from "./add-student/add-student.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { SimpleDonationComponent } from "./simple-donation/simple-donation.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxsFormPluginModule } from "@ngxs/form-plugin";
import { ReactiveFormsModule } from "@angular/forms";
import { DonationItemComponent } from './donation-item/donation-item.component';

@NgModule({
  declarations: [HeaderComponent, SimpleDonationComponent, AddStudentComponent, DonationItemComponent],
  imports: [
    CommonModule,
    NgbModule,
    NgxsFormPluginModule.forRoot(),
    ReactiveFormsModule,
  ],
  exports: [HeaderComponent, SimpleDonationComponent, AddStudentComponent],
})
export class ComponentsModule {}
