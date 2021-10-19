import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICliente } from 'src/app/interfaces/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-edicao-clientes',
  templateUrl: './cadastro-edicao-clientes.component.html',
  styleUrls: ['./cadastro-edicao-clientes.component.css']
})
export class CadastroEdicaoClientesComponent implements OnInit {

  formValue: FormGroup = new FormGroup({
    id: new FormControl(null),
    nome: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    cpf: new FormControl('', Validators.required),
    observacoes: new FormControl(''),
    ativo: new FormControl(true)
  });

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (Number(id)) {
      this.clienteService.findById(Number(id)).subscribe(result => {
        this.preencheFormValue(result);
      }, error => {
        console.log(error);
      }
      )
    }
  }

  preencheFormValue(cliente: ICliente) {
    this.formValue = new FormGroup({
      id: new FormControl(cliente.id),
      nome: new FormControl(cliente.nome, Validators.required),
      email: new FormControl(cliente.email, [Validators.email, Validators.required]),
      cpf: new FormControl(cliente.cpf, Validators.required),
      observacoes: new FormControl(cliente.observacoes),
      ativo: new FormControl(cliente.ativo)
    })
  }

  enviar() {
    const cliente: ICliente = this.formValue.value;
    this.clienteService.cadastrar(cliente).subscribe(result => {
      Swal.fire("Sucesso!", 'Cadastro  realizado com sucesso!', 'success');
      this.router.navigate(['/clientes']);
    }, error => {
      Swal.fire('Oops...', 'Algo deu errado.', 'error');
      console.error(error);
    });
  }

  getAttrForm(nome: string) {
    this.formValue.get(nome)?.value;
  }
}
