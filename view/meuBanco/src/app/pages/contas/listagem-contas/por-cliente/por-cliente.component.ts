import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IConta } from 'src/app/interfaces/conta';
import { ClienteService } from 'src/app/services/cliente.service';
import { ContasService } from 'src/app/services/contas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-por-cliente',
  templateUrl: './por-cliente.component.html',
  styleUrls: ['./por-cliente.component.css']
})
export class PorClienteComponent implements OnInit {

  formValue: FormGroup = new FormGroup({
    id: new FormControl(null),
    cpf: new FormControl('', Validators.required),
    nome: new FormControl('', Validators.required),
  });

  formValueCli: FormGroup = new FormGroup({
    cpf: new FormControl('', Validators.required),
  })

  preencheFormValueCli(cpf: string) {
    this.formValueCli = new FormGroup({
      cpf: new FormControl(cpf, Validators.required),
    })
  }

  preencheFormValue(conta: IConta[]) {
    this.formValue = new FormGroup({
      id: new FormControl(conta[0].id),
      cpf: new FormControl(conta[0].cliente.cpf, Validators.required),
      nome: new FormControl(conta[0].cliente.nome, Validators.required),
    })
  }

  somenteNumeros(cpf: string) {
    let numeros = cpf.toString().replace(/\.|-/gm, '');
    if (numeros.length === 11)
      return numeros;

    return 'cpf inválido'
  }

  constructor(
    private contasService: ContasService,
    private route: ActivatedRoute,
    private router: Router,) { }

  contas: IConta[] = [];

  ngOnInit(): void {
    const cpf = this.route.snapshot.paramMap.get('cpf');
    if (cpf) {
      this.contasService.findByCpf(this.somenteNumeros(cpf)).subscribe(result => {
        console.log(result);
        if (result.length == 0) {
          this.preencheFormValueCli(this.somenteNumeros(cpf));
          Swal.fire({
            title: 'Opps...',
            text: "O cliente não possui contas. Cadastrar nova conta?",
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, cadastrar!'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['contas/cadastrar/', cpf])
            } else {
              this.router.navigate(['/clientes']);
            }
          });
        } else {
          this.preencheFormValue(result);
        }
      }
      )
    }
    this.contasDoCliente(cpf!);
  }

  contasDoCliente(cpf: string) {
    this.contasService.findByCpf(this.somenteNumeros(cpf)).subscribe((result: IConta[]) => {
      this.contas = result;
    });
  }

  confirmar(id: number) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar?',
      text: "Você não poderá reverter esse procedimento.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.contasService.remover(id).subscribe(result => {
          Swal.fire(
            'Excluído!',
            'A conta foi excluído.',
            'success'
          )
          this.ngOnInit();
        }, error => {
          Swal.fire('Oops...', 'Algo deu errado.', 'error');
          console.error(error);
          this.ngOnInit();
        });
      }
    })
  }

}
