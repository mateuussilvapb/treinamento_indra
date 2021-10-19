import { Component, OnInit } from '@angular/core';
import { ICliente } from 'src/app/interfaces/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listagem-clientes',
  templateUrl: './listagem-clientes.component.html',
  styleUrls: ['./listagem-clientes.component.css']
})
export class ListagemClientesComponent implements OnInit {

  clientes: ICliente[] = [];
  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos() {
    this.clienteService.listaTodosClientes().subscribe((result: ICliente[]) => {
      this.clientes = result;
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
        this.clienteService.remover(id).subscribe(result => {
          Swal.fire(
            'Excluído!',
            'A conta foi excluído.',
            'success'
          )
          this.listarTodos();
        }, error => {
          Swal.fire('Oops...', 'Algo deu errado.', 'error');
          console.error(error);
          this.listarTodos();
        });
      }
    })
  }
}
