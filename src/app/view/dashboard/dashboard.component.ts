import { ClienteService } from './../../services/cliente.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
 
declare var require: any
 
import { Cliente } from 'src/app/model/cliente';
import { Conta } from 'src/app/model/conta';
import { Endereco } from 'src/app/model/endereco';
import { EnderecoService } from 'src/app/services/endereco.service';
import { ContaService } from 'src/app/services/conta.service';
import { Router } from '@angular/router';

 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {

  data: any;
  dateIni: Date;
  dateFim: Date;
  cliente = new Cliente();
  conta: |Conta;
  endereco: Endereco;
  contas: Conta[];
  enderecos: Endereco[];
  

  constructor(
    private enderecoService: EnderecoService,
    private confirmationService: ConfirmationService,
    private contaService: ContaService,
    private messageService: MessageService,
    private clienteService: ClienteService,
    private router: Router,
 
    ) {

      this.data = {
        labels: ['Número de Clientes','Total de Movimentações','Contas Vinculadas','Valor','Contas Inativas'],
        datasets: [
            {
                data: [300, 50, 100,98,56],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    '#AA7906',
                    "#CCDD87",


                ],
                hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  '#AA7906',
                  "#CCDD87",
                ]
            }]    
        };

   }

   selectData(event) {
    this.messageService.add({ severity: 'info', summary: 'Data Selected', 'detail': this.data.datasets[event.element._datasetIndex].data[event.element._index] });
  }

  ngOnInit(): void {

    this.cliente = (this.clienteService.getToEdit() ? this.clienteService.getToEdit() : new Cliente());
    this.conta = new Conta();
    this.endereco = new Endereco();
    if(this.cliente.idCliente == null){
      this.enderecos = [];
      this.contas = [];
    }
  }

  voltaPag() {
    this.router.navigate(['/consulta-cliente']);
  }

}
 