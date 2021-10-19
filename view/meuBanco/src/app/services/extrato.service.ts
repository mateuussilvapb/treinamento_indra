import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IExtrato } from '../interfaces/extrato';

@Injectable({
  providedIn: 'root'
})
export class ExtratoService {

  endpoint = 'contas/consultar-extrato/';
  api = environment.api;

  constructor(private http: HttpClient) { }

  findByAgenciaAndConta(agencia: string, numero: string): Observable<IExtrato[]> {
    return this.http.get<IExtrato[]>(`${this.api}/${this.endpoint}/${agencia}/${numero}`);
  }
}
