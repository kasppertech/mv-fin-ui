import { MovimentacaoFilter } from './../../model/movimentacao.filter';
import { MovimentacaoService } from './../../services/movimentacao.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Cliente } from 'src/app/model/cliente';

import { Conta } from 'src/app/model/conta';
import { MessageService } from 'primeng/api';
import { ClienteService } from 'src/app/services/cliente.service';
import { ContaService } from 'src/app/services/conta.service';
import { EnderecoService } from 'src/app/services/endereco.service';
import { ClienteFilter } from 'src/app/model/cliente.filter';
import { UtilsService } from 'src/app/services/utils.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Movimentacao } from 'src/app/model/movimentacao';
import { DatePipe } from '@angular/common';

declare var require: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data: any;
  dateIni: Date;
  dateFim: Date;
  clientAcoes: any;
  clienteDialog: boolean;

  cliente: Cliente;
  clientes: Cliente[];
  conta: Conta[];
  clienteFS: boolean = false;
  submitted: boolean;

  contAcoes: any;
  disabledEdit: boolean = false;
  clienteFilter = new ClienteFilter();
  clienteSelect = new Cliente();
  enderecoSelect: any;
  contaSelect: any;
  totalClientes: any;
  totalRegistros = 0;
  movimentacaoFilter = new MovimentacaoFilter();
  utilsService = new UtilsService;
  // movimentacoes: Movimentacao;
  movimentacoes = new Movimentacao();

  constructor(
    public app: AppComponent,
    private router: Router,
    private clienteService: ClienteService,
    private contaService: ContaService,
    private enderecoService: EnderecoService,
    private messageService: MessageService,
    private dashboardService: DashboardService,
    private movimentacaoService: MovimentacaoService,
    private datePipe: DatePipe
  ) {
  }

  selectData(event) {
    this.messageService.add({ severity: 'info', summary: 'Data Selected', 'detail': this.data.datasets[event.element._datasetIndex].data[event.element._index] });
  }

  ngOnInit(): void {
    this.getClientes();
    this.getMovimentos();
  }

  saldoTodosCliente() {

    let t: any;
    this.movimentacaoService.getSaldoClientes().subscribe(response => {

      var FileSaver = require("file-saver");

      let blob = new Blob([this.utilsService.base64toBlob(response.data, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')], {});
      FileSaver.saveAs(blob, response.nomeArquivo);
    });

  }

  getMovimentos() {
    
    this.dashboardService.getDash().subscribe(
      data => {
       this.movimentacoes = data;
      },
      error => {
        // this.validaErro(error);
      });
  }

  ReceitaPorPeriodo() {
    this.movimentacaoFilter.dataInicial = this.datePipe.transform(this.movimentacaoFilter.dataInicial,"yyyy-MM-dd");
    this.movimentacaoFilter.dataFinal = this.datePipe.transform(this.movimentacaoFilter.dataFinal,"yyyy-MM-dd");

    this.movimentacaoService.getReceita(this.movimentacaoFilter).subscribe(response => {
      var FileSaver = require("file-saver");

      let blob = new Blob([this.utilsService.base64toBlob(response.data, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')], {});
      FileSaver.saveAs(blob, response.nomeArquivo);
    });

    this.movimentacaoFilter = new MovimentacaoFilter();

  }

  getClientes() {

    this.clienteService.getCliente(this.clienteFilter).subscribe(
      data => {

        this.clientAcoes = data.listVo;
        this.totalClientes = data.listVo.length;
        console.log(this.totalClientes);
        ;
      },
      error => {
        console.log(error)
      });
  }

  getContas() {
    this.contaService.getConta(this.clienteFilter).subscribe(
      data => {
        this.contAcoes = data.listVo;
        console.log(this.contAcoes);
      },
      error => {
        console.log(error)
      });
  }

  getEnderecos() {
    this.enderecoService.getEnderecos(this.clienteFilter).subscribe(
      data => {
        this.contAcoes = data.listVo;
        console.log(this.contAcoes);
      },
      error => {
        console.log(error)
      });
  }

}
