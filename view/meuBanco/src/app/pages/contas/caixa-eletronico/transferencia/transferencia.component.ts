import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ITransferencia } from 'src/app/interfaces/transferencia';
import { ContasService } from 'src/app/services/contas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit {

  formValue: FormGroup = new FormGroup({
    agenciaOrigem: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
    agenciaDestino: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
    numeroContaOrigem: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    numeroContaDestino: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    valor: new FormControl('', Validators.required)
  });

  constructor(
    private transferenciaService: ContasService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  transferir() {
    const transferencia: ITransferencia = this.formValue.value;
    this.transferenciaService.transferir(transferencia).subscribe(result => {
      Swal.fire("Sucesso!", 'Transferência realizada com sucesso!', 'success');
      this.router.navigate(['/contas']);
    }, error => {
      Swal.fire('Oops...', 'Algo deu errado com sua transferência.', 'error');
      console.error(error);
    });
  }

}
