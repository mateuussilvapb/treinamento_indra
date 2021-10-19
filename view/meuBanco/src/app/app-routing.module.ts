import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroEdicaoClientesComponent } from './pages/clientes/cadastro-edicao-clientes/cadastro-edicao-clientes.component';
import { ListagemClientesComponent } from './pages/clientes/listagem-clientes/listagem-clientes.component';
import { CadastroContasComponent } from './pages/contas/cadastro-contas/cadastro-contas.component';
import { CaixaEletronicoComponent } from './pages/contas/caixa-eletronico/caixa-eletronico.component';
import { DepositoComponent } from './pages/contas/caixa-eletronico/deposito/deposito.component';
import { SaqueComponent } from './pages/contas/caixa-eletronico/saque/saque.component';
import { TransferenciaComponent } from './pages/contas/caixa-eletronico/transferencia/transferencia.component';
import { ExtratoBancarioComponent } from './pages/contas/extrato-bancario/extrato-bancario.component';
import { ListagemContasComponent } from './pages/contas/listagem-contas/listagem-contas.component';
import { PorClienteComponent } from './pages/contas/listagem-contas/por-cliente/por-cliente.component';

const routes: Routes = [

  {
    path: '', redirectTo: '/clientes', pathMatch: 'full'
  },
  {
    path: 'clientes', component: ListagemClientesComponent
  },
  {
    path: 'contas', component: ListagemContasComponent
  },
  {
    path: 'contas/caixaEletronico', component: CaixaEletronicoComponent
  },
  {
    path: 'clientes/cadastrar', component: CadastroEdicaoClientesComponent
  },
  {
    path: 'clientes/editar/:id', component: CadastroEdicaoClientesComponent
  },
  {
    path: 'contas/caixaEletronico/deposito', component: DepositoComponent
  },
  {
    path: 'contas/caixaEletronico/saque', component: SaqueComponent
  },
  {
    path: 'contas/caixaEletronico/deposito/:id', component: DepositoComponent
  },
  {
    path: 'contas/caixaEletronico/saque/:id', component: SaqueComponent
  },
  {
    path: 'contas/caixaEletronico/trasnferencia', component: TransferenciaComponent
  },
  {
    path: 'contas/cliente/:cpf', component: CadastroContasComponent
  },
  {
    path: 'contas/cadastrar/:cpf', component: CadastroContasComponent
  },
  {
    path: 'contas/extrato/:agencia/:numero', component: ExtratoBancarioComponent
  },
  {
    path: 'contas/contasClientes/:cpf', component: PorClienteComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
