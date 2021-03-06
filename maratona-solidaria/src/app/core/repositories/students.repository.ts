import { Student } from './../../shared/models/student';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from 'src/app/shared/models/team';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentsRepository {
  constructor(private http: HttpClient) {}

  public getStudents(): any {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders({
      'Authorization': 'Bearer: ' + token,
    });
    
    return this.http.get(environment.apiUrl + 'aluno/list', {
      headers: header
    });
  }

  public createStudent(student: Student): any {
    let body = JSON.stringify({
      nome: student.nome,
      matricula: student.matricula,
      email: student.email,
      equipe_id: student.curso.id,
    });

    const token = localStorage.getItem('token');
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer: " + token,
    });

    return this.http.post(environment.apiUrl + 'aluno/create', body, {
      headers: header,
    });
  }
}
