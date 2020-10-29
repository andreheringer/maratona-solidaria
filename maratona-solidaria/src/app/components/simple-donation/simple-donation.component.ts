import { StudentService } from './../../shared/stores/students/students.service';
import { Student } from './../../shared/models/student';
import { SimpleDonationService } from './../../shared/stores/simple-donation/simple-donation.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PRODUCTS, Product } from 'src/app/shared/models/product';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-simple-donation',
  templateUrl: './simple-donation.component.html',
  styleUrls: ['./simple-donation.component.css'],
})
export class SimpleDonationComponent implements OnInit {
  private sub: Subscription[] = [];
  students: Student[];
  products = PRODUCTS;
  donation: boolean = false;
  student: boolean = false;
  newSimpleDonationForm = new FormGroup({
    doacao: new FormControl(),
    tipo: new FormControl([Validators.required]),
    quantidade: new FormControl([Validators.required]),
    representante: new FormControl([Validators.required]),
    pontuacao: new FormControl([Validators.required]),
    observacao: new FormControl(),
  });

  @Output('changeForm') changeForm = new EventEmitter();

  constructor(
    private simpleDonationService: SimpleDonationService,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.donationTypeChangeHandler();
    this.donationAmountChangeHandler();

    this.studentService.syncStudents();

    const newSub = this.studentService.teamStudents$.subscribe((students) => {
      this.students = students;
    });
    this.sub.push(newSub);
  }

  public ngOnDestroy() {
    this.sub.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  onSubmit() {
    if (this.newSimpleDonationForm.valid) {
      this.simpleDonationService.submit();
      this.donation = false;
    } else {
      alert("Preencha os campos obrigatórios indicados por '*'");
    }
  }
  onDonationChange() {
    this.donation = true;
  }

  private donationTypeChangeHandler() {
    const newSub = this.newSimpleDonationForm.controls[
      'tipo'
    ].valueChanges.subscribe((tipo) => {
      if (tipo != null && tipo !== 'Tipo') {
        const pts = this.products.find((prod) => prod.id === tipo).points;
        const qts = this.newSimpleDonationForm.get('quantidade').value;
        this.newSimpleDonationForm.controls['pontuacao'].setValue(
          pts * (qts != null ? qts : 0)
        );
      }
    });
    this.sub.push(newSub);
  }

  private donationAmountChangeHandler() {
    const newSub = this.newSimpleDonationForm.controls[
      'quantidade'
    ].valueChanges.subscribe((quantidade) => {
      if (quantidade != null) {
        let tipo = this.newSimpleDonationForm.get('tipo').value;
        const pts =
          tipo != null
            ? this.products.find((prod) => prod.id === tipo).points
            : 0;
        this.newSimpleDonationForm.controls['pontuacao'].setValue(
          pts * quantidade
        );
      }
    });
    this.sub.push(newSub);
  }

  onStudentChange() {
    this.student = true;
  }

  onChangeForm() {
    this.changeForm.emit({});
  }
}
