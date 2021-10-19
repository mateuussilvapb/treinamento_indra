import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContasService } from 'src/app/services/contas.service';

@Component({
  selector: 'app-caixa-eletronico',
  templateUrl: './caixa-eletronico.component.html',
  styleUrls: ['./caixa-eletronico.component.css']
})
export class CaixaEletronicoComponent implements OnInit {

  constructor(
    private transferenciaService: ContasService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  formValue: FormGroup = new FormGroup({
    agenciaOrigem: new FormControl('', Validators.required),
    agenciaDestino: new FormControl('', Validators.required),
    numeroContaOrigem: new FormControl('', Validators.required),
    numeroContaDestino: new FormControl('', Validators.required),
    valor: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
  }

}
