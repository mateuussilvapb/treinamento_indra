import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemClientesComponent } from './clientes/listagem-clientes/listagem-clientes.component';
import { CadastroEdicaoClientesComponent } from './clientes/cadastro-edicao-clientes/cadastro-edicao-clientes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { ListagemContasComponent } from './contas/listagem-contas/listagem-contas.component';
import { CaixaEletronicoComponent } from './contas/caixa-eletronico/caixa-eletronico.component';
import { SaqueComponent } from './contas/caixa-eletronico/saque/saque.component';
import { DepositoComponent } from './contas/caixa-eletronico/deposito/deposito.component';
import { TransferenciaComponent } from './contas/caixa-eletronico/transferencia/transferencia.component';
import { CadastroContasComponent } from './contas/cadastro-contas/cadastro-contas.component';
import { ExtratoBancarioComponent } from './contas/extrato-bancario/extrato-bancario.component';
import { PorClienteComponent } from './contas/listagem-contas/por-cliente/por-cliente.component';



@NgModule({
  declarations: [
    ListagemClientesComponent,
    CadastroEdicaoClientesComponent,
    ListagemContasComponent,
    CaixaEletronicoComponent,
    SaqueComponent,
    DepositoComponent,
    TransferenciaComponent,
    CadastroContasComponent,
    ExtratoBancarioComponent,
    PorClienteComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ]
})
export class PagesModule { }
