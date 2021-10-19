import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IExtrato } from 'src/app/interfaces/extrato';
import { ContasService } from 'src/app/services/contas.service';
import { ExtratoService } from 'src/app/services/extrato.service';

@Component({
  selector: 'app-extrato-bancario',
  templateUrl: './extrato-bancario.component.html',
  styleUrls: ['./extrato-bancario.component.css']
})
export class ExtratoBancarioComponent implements OnInit {

  extratos: IExtrato[] = [];

  constructor(
    private contaService: ContasService,
    private extratoService: ExtratoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const agencia = this.route.snapshot.paramMap.get('agencia');
    const numero = this.route.snapshot.paramMap.get('numero');
    this.extratoCompleto(agencia!, numero!);
  }

  extratoCompleto(agencia: string, numero: string) {
    this.extratoService.findByAgenciaAndConta(agencia, numero).subscribe((result: IExtrato[]) => {
      this.extratos = result;
      this.extratos.reverse();
    });
  }
}
