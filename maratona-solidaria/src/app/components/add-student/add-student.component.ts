import { AddStudentService } from "./../../shared/stores/add-student/add-student.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-add-student",
  templateUrl: "./add-student.component.html",
  styleUrls: ["./add-student.component.css"],
})
export class AddStudentComponent implements OnInit {
  defaultTeamDisabled: boolean = false;
  addStudentForm = new FormGroup({
    nome: new FormControl(),
    matricula: new FormControl(),
    curso: new FormControl(),
    email: new FormControl(),
    telefone: new FormControl(),
    observacao: new FormControl(),
  });

  constructor(private addStudentService: AddStudentService) {}

  ngOnInit(): void {}

  onTeamChange() {
    this.defaultTeamDisabled = true
  }

  onSubmit() {
    this.addStudentService.submit();
  }
}
