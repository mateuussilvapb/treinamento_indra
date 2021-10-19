import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IConta } from 'src/app/interfaces/conta';
import { ISaqueDeposito } from 'src/app/interfaces/saque-deposito';
import { ContasService } from 'src/app/services/contas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-saque',
  templateUrl: './saque.component.html',
  styleUrls: ['./saque.component.css']
})

export class SaqueComponent implements OnInit {

  formValue: FormGroup = new FormGroup({
    agencia: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
    numeroConta: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    valor: new FormControl('', Validators.required),
  });

  constructor(
    private saqueDepositoService: ContasService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (Number(id)) {
      this.saqueDepositoService.findById(Number(id)).subscribe(result => {
        this.preencheFormValue(result)
      })
    }
  }

  preencheFormValue(conta: IConta) {
    this.formValue = new FormGroup({
      id: new FormControl(conta.id, Validators.required),
      agencia: new FormControl(conta.agencia, Validators.required),
      numeroConta: new FormControl(conta.numero, Validators.required),
      valor: new FormControl('', Validators.required)
    })
  }

  sacar() {
    const saque: ISaqueDeposito = this.formValue.value;
    this.saqueDepositoService.sacar(saque).subscribe(result => {
      Swal.fire("Sucesso!", 'Saque  realizado com sucesso!', 'success');
      this.router.navigate(['/contas']);
    }, error => {
      Swal.fire('Oops...', 'Algo deu errado com seu saque.', 'error');
      console.error(error);
    });
  }

}
