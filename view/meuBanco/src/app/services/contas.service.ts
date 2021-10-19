import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IConta } from '../interfaces/conta';
import { ISaqueDeposito } from '../interfaces/saque-deposito';
import { ITransferencia } from '../interfaces/transferencia';

@Injectable({
  providedIn: 'root'
})
export class ContasService {

  endpoint = "contas/";
  endpointSaque = "saque/";
  endpointDeposito = "deposito/";
  endpointTransferencia = "transferencia/";
  api = environment.api;

  constructor(private http: HttpClient) { }

  listaTodasContas() {
    return this.http.get(`${this.api}/${this.endpoint}`);
  }

  findById(id: number) {
    return this.http.get<IConta>(`${this.api}/${this.endpoint}/${id}`);
  }

  findByCpf(cpf: string) {
    return this.http.get<IConta[]>(`${this.api}/${this.endpoint}/consultar-contas-cliente/${cpf}`);
  }

  cadastrarConta(conta: IConta) {
    return this.http.post<IConta>(`${this.api}/${this.endpoint}/`, conta);
  }

  sacar(saque: ISaqueDeposito) {
    return this.http.post(`${this.api}/${this.endpoint}/${this.endpointSaque}/`, saque);
  }

  depositar(deposito: ISaqueDeposito) {
    return this.http.post(`${this.api}/${this.endpoint}/${this.endpointDeposito}/`, deposito);
  }

  transferir(trasnferencia: ITransferencia) {
    return this.http.post(`${this.api}/${this.endpoint}/${this.endpointTransferencia}/`, trasnferencia);
  }
  remover(id: number) {
    return this.http.delete(`${this.api}/${this.endpoint}/${id}`);
  }
}
