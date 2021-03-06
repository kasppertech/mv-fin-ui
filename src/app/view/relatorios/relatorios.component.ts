import { RelatorioFilter } from './../../model/relatorio.filter';
import { MovimentacaoService } from './../../services/movimentacao.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { Conta } from 'src/app/model/conta';
import { Endereco } from 'src/app/model/endereco';
import { ClienteService } from 'src/app/services/cliente.service';
import { UtilsService } from 'src/app/services/utils.service';
import { DatePipe } from '@angular/common';

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
    private router: Router,
    private movimentacaoService: MovimentacaoService,
    private datePipe: DatePipe
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


  saldoCliente() {

    this.relatorioFilter.idCliente = this.cliente.idCliente;
    this.movimentacaoService.getSaldoByCliente(this.relatorioFilter.idCliente).subscribe(response => {

      var FileSaver = require('file-saver');

      let blob = new Blob([this.utilsService.base64toBlob(response.data, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')], {});
      FileSaver.saveAs(blob, response.nomeArquivo);
    });
  }

  saldoCLientePeriodo() {

    this.relatorioFilter.idCliente = this.cliente.idCliente;
    this.relatorioFilter.dataInicial = this.datePipe.transform(this.relatorioFilter.dataInicial, "yyyy-MM-dd");
    this.relatorioFilter.dataFinal = this.datePipe.transform(this.relatorioFilter.dataFinal, "yyyy-MM-dd");

    this.movimentacaoService.getSaldoPeriodo(this.relatorioFilter).subscribe(response => {

      var FileSaver = require("file-saver");

      let blob = new Blob([this.utilsService.base64toBlob(response.data, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')], {});
      FileSaver.saveAs(blob, response.nomeArquivo);
    });

    this.relatorioFilter = new RelatorioFilter();

  }

}
