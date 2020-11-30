import { RelatorioFilter } from './../../model/relatorio.filter';
import { MovimentacaoService } from './../../services/movimentacao.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Cliente } from 'src/app/model/cliente';
import { Conta } from 'src/app/model/conta';
import { Endereco } from 'src/app/model/endereco';
import { ClienteService } from 'src/app/services/cliente.service';
import { ContaService } from 'src/app/services/conta.service';
import { EnderecoService } from 'src/app/services/endereco.service';
import { UtilsService } from 'src/app/services/utils.service';

declare var require: any;

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss']
})
export class RelatoriosComponent implements OnInit {

  relatorios: any[];

  selected: any;

  cliente = new Cliente();
  conta: Conta;
  endereco: Endereco;
  contas: Conta[];
  enderecos: Endereco[];
  utilsService = new UtilsService;
  gerarRSC: boolean = false;
  gerarRSCP: boolean = false;
  relatorioFilter = new RelatorioFilter();

  constructor(
    private clienteService: ClienteService,
    private enderecoService: EnderecoService,
    private confirmationService: ConfirmationService,
    private contaService: ContaService,
    private messageService: MessageService,
    private router: Router,
    private movimentacaoService: MovimentacaoService
  ) {
    this.relatorios = [
      { name: 'Relatório de saldo do cliente', code: 'RSC' },
      { name: 'Relatório de saldo do cliente e período', code: 'RSCP' },
    ];
  }

  ngOnInit(): void {
    this.cliente = (this.clienteService.getToEdit() ? this.clienteService.getToEdit() : new Cliente());
    
  }




  voltaPag() {
    this.router.navigate(['/consulta-cliente']);
  }


saldoCliente(){
  
  this.relatorioFilter.idCliente = this.cliente.idCliente;
  this.movimentacaoService.getSaldoByCliente(this.relatorioFilter.idCliente).subscribe(response => {

    var FileSaver = require('file-saver');

     
    let blob = new Blob([this.utilsService.base64toBlob(response.data, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')], {});
    FileSaver.saveAs(blob, response.nomeArquivo);
  });
}

saldoCLientePeriodo(){
  
  this.movimentacaoService.getSaldoPeriodo(this.relatorioFilter).subscribe(response => {
  
    var FileSaver = require("file-saver");

     
    let blob = new Blob([this.utilsService.base64toBlob(response.data, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')], {});
    FileSaver.saveAs(blob, response.nomeArquivo);
  });
}



 

}
