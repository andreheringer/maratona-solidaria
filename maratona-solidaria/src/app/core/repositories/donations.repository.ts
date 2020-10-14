import { Student } from './../../shared/models/student';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Donation } from 'src/app/shared/models/donation';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DonationsRepository {
  constructor(private http: HttpClient) {}

  public getDonations(): Observable<any> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders({
      'Authorization': 'Bearer: ' + token,
    });
    
    return this.http.get(environment.apiUrl + 'donation/list', {
      headers: header
    });
  }

  public createDonation(donation: Donation): any {
    let body = JSON.stringify({
      doacao: donation.doacao,
      tipo: donation.tipo,
      quantidade: donation.quantidade,
      data: null,//donation.data,
      aluno_id: donation.representante.id,
      pontuacao: donation.pontuacao,
      observacao: donation.observacao,
    });

    const token = localStorage.getItem('token');
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer: ' + token,
    });

    return this.http.post(environment.apiUrl + 'donation/create', body, {
      headers: header,
    });
  }
}
