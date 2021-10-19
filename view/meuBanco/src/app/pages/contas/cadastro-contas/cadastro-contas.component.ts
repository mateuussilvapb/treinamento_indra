import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICliente } from 'src/app/interfaces/cliente';
import { IConta } from 'src/app/interfaces/conta';
import { ClienteService } from 'src/app/services/cliente.service';
import { ContasService } from 'src/app/services/contas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-contas',
  templateUrl: './cadastro-contas.component.html',
  styleUrls: ['./cadastro-contas.component.css']
})
export class CadastroContasComponent implements OnInit {

  cliente: ICliente = {
    id: 123,
    cpf: '123',
    email: '',
    nome: '',
    observacoes: ''
  };

  formValue: FormGroup = new FormGroup({
    id: new FormControl(null),
    agencia: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
    numero: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    saldo: new FormControl('', Validators.required)
  });

  constructor(
    private clienteService: ClienteService,
    private contaService: ContasService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const cpf = this.route.snapshot.paramMap.get('cpf');
    if (Number(cpf)) {
      this.clienteService.findByCpf(String(cpf)).subscribe((result: ICliente) => {
        this.clienteService.findById(result.id).subscribe((result: ICliente) => {
          this.cliente = result;
        }, error => console.log(error));
      }, error => console.log(error));
    }
  }

  cadastrarConta() {
    const conta: IConta = this.formValue.value;
    conta.cliente = this.cliente;
    this.contaService.cadastrarConta(conta).subscribe((result: IConta) => {
      Swal.fire("Sucesso!", `Conta cadastrada com sucesso! ID: ${result.id}`, 'success');
      this.router.navigate(['/contas']);
    }, error => {
      Swal.fire('Oops...', 'Algo deu errado com o cadastro da conta.', 'error');
      console.error(error);
    });
  }

}
