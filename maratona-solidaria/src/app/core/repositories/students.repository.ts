import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentsRepository {
  constructor(private http: HttpClient) {}

  public list() {
    return this.http.get(environment.apiUrl + 'aluno/list', {});
  }
}
