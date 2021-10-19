import { Component, OnInit } from '@angular/core';
import { ContasService } from 'src/app/services/contas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listagem-contas',
  templateUrl: './listagem-contas.component.html',
  styleUrls: ['./listagem-contas.component.css']
})
export class ListagemContasComponent implements OnInit {

  contas: any[] = [];
  constructor(private contasService: ContasService) { }

  ngOnInit(): void {
    this.contasService.listaTodasContas().subscribe((result: any) => {
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
