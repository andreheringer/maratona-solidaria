import { AddStudentService } from "./../../shared/stores/add-student/add-student.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-add-student",
  templateUrl: "./add-student.component.html",
  styleUrls: ["./add-student.component.css"],
})
export class AddStudentComponent implements OnInit {
  addStudentForm = new FormGroup({
    name: new FormControl(),
    registration: new FormControl(),
    course: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    obs: new FormControl(),
  });

  constructor(private addStudentService: AddStudentService) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.addStudentForm.value);
    this.addStudentService.clearForm();
  }
}
