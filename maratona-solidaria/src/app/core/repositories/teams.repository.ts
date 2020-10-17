import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from 'src/app/shared/models/team';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TeamsRepository {
  constructor(private http: HttpClient) {}

  public getEquipes(): any {
    return this.http.get(environment.apiUrl + 'public/equipes');
  }
  public getClassificacao(): any {
    return this.http.get(environment.apiUrl + 'public/classificacao');
  }

  public createEquipe(team: Team) {
    let body = JSON.stringify({});
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(environment.apiUrl + 'aluno/create', body, {
      headers: header,
    });
  }
}
