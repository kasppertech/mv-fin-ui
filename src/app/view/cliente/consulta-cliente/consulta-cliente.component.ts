import { EnderecoService } from './../../../services/endereco.service';
import { ContaService } from './../../../services/conta.service';

// @ngdoc Classe de controle da tela "consulta-cliente.ts"
// @name 
//
// @module Cliente
//
// description
//
// Controle do serviço de Consulta de Clientes .
// Ele realiza buscas com base nos filtros e na listagem existente no banco.
//

import { ClienteFilter } from './../../../model/cliente.filter';
import { ClienteService } from './../../../services/cliente.service';
import { Router } from '@angular/router';
import { Endereco } from './../../../model/endereco';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Cliente } from 'src/app/model/cliente';

import { Conta } from 'src/app/model/conta';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BaseComponent } from 'src/app/helper/base.component';
import { Injector } from '@angular/core';
import { ElementRef } from '@angular/core';

interface Tipo {
  tipo: string,

}

interface Cadastro {
  tipo: string
}

@Component({
  selector: 'app-consulta-cliente',
  templateUrl: './consulta-cliente.component.html',
  styleUrls: ['./consulta-cliente.component.scss']
})
export class ConsultaClienteComponent extends BaseComponent {
  clienteDialog: boolean;

  cliente: Cliente;
  clientes: Cliente[];
  tipoConta: Tipo[];
  tipoCadastro: Cadastro[];
  conta: Conta[];
  endereco: Endereco[];
  tipoSelected: Tipo[];
  clienteFS: boolean = false;
  submitted: boolean;
  clientAcoes: any;
  contAcoes: any;
  disabledEdit: boolean = false;
  clienteFilter = new ClienteFilter();
  clienteSelect = new Cliente();
  enderecoSelect: any;
  contaSelect: any;
  totalRegistros = 0;

  constructor(
    public injector: Injector,
    public el: ElementRef,
    public app: AppComponent,
    public messageService: MessageService,
    public router: Router,
    private clienteService: ClienteService,
    private contaService: ContaService,
    private enderecoService: EnderecoService,    
    private confirmationService: ConfirmationService,

  ) {
    super(injector, el);
     
    this.tipoCadastro = [ 
      { tipo: 'Fisica' },
      { tipo: 'Juridica' },

    ];
    this.tipoConta = [
      { tipo: 'Conta Poupança' },
      { tipo: 'Conta Corrente' },

    ];
  }

  // @tipo method
  // @name ngOnInit
  // @methodOf cliente>consulta-cliente>consulta-cliente.ts
  // @description
  // Método responsável por inicializar os métodos necessários

  ngOnInit(): void {
    this.getClientes();
    this.getContas();
    this.getEnderecos();

  }

  // @tipo method
  // @name editCliente
  // @methodOf cliente>consulta-cliente>consulta-cliente.ts
  // @description
  // Método responsável por editar clientes carregados na tablea

  // editCliente(cliente: any) {
  //   this.clienteService.editCliente(cliente)
  //   this.router.navigate(["/cadastro-cliente"]);
  // }

  editCliente(cliente: any, conta: any, endereco: any) {
    this.cliente = { ...cliente };
    this.conta = { ...conta };
    this.endereco = { ...endereco };
    this.clienteService.editCliente(cliente);
    this.router.navigate(["/cadastro-cliente"]);
  }


  movimentoCliente(cliente: any, conta: any, endereco: any) {
    this.cliente = { ...cliente };
    this.conta = { ...conta };
    this.endereco = { ...endereco };
    this.clienteService.editCliente(cliente);
    this.router.navigate(["/dashboard"]);
  }

  relatorioCliente(cliente: any, conta: any, endereco: any){
    this.cliente = { ...cliente };
    this.conta = { ...conta };
    this.endereco = { ...endereco };
    this.clienteService.editCliente(cliente);
    this.router.navigate(["/relatorios"]);
  }

  consultarCliente(clienteSelect: Cliente, enderecoSelect: Endereco, contaSelect: Conta ) {
    this.clienteSelect = {...clienteSelect};
    this.enderecoSelect = {...enderecoSelect};
    this.contaSelect = {...contaSelect};
    this.clienteDialog = true;
    // this.router.navigate(["/cadastro-cliente"]);
  }

  // @tipo method
  // @name pesquisar
  // @methodOf cliente>consulta-cliente>consulta-cliente.ts
  // @description
  // Método responsável por realizar a busca dos Clientes no banco

  pesquisar() {
 
    this.clienteService.getCliente(this.clienteFilter)
      .subscribe(
        data => {
          this.clientAcoes = data.listVo;
          this.totalRegistros = data.total;
          console.log(this.clientAcoes);
        },
        error => {
          this.clienteFilter = new ClienteFilter();

          this.validaErro(error);
        });
  }

  // @tipo method
  // @name movimentoCliente
  // @methodOf cliente>consulta-cliente>consulta-cliente.ts
  // @description
  // Método responsável por carregar a tela de movimentos do cliente



  // @tipo method
  // @name deleteCliente
  // @methodOf cliente>consulta-cliente>consulta-cliente.ts
  // @description
  // Método responsável por deletar o cliente

  deleteCliente(cliente: Cliente) {
    
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + cliente.nome + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        
        this.clienteService.deleteCliente(cliente.idCliente).subscribe(
          data => {
            this.getClientes();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
          },
          error => {
            this.validaErro(error);
          });;
        // this.cliente = new Cliente();
       
      }
    });
  }

  // @tipo method
  // @name cadastrar
  // @methodOf cliente>consulta-cliente>consulta-cliente.ts
  // @description
  // Método responsável por carregar a tela de agendamento com a data padrão

  cadastrar() {
    this.cliente = new Cliente();
    this.router.navigate(["/cadastro-cliente"]);
  }

  // @tipo method
  // @name clienteTipo
  // @methodOf cliente>consulta-cliente>consulta-cliente.ts
  // @description
  // Método responsável por indicar escolha do usuário para o tipo de cadastro

  clienteTipo(event) {
    let r
    r = event.value.tipo;
    this.cliente.tipoCliente = r;

    if (r == "Juridica") {
      this.clienteFS = true;
    } else {
      this.clienteFS = false;
    }
  }

  // @tipo method
  // @name getClientes
  // @methodOf cliente>consulta-cliente>consulta-cliente.ts
  // @description
  // Método responsável por listar clientes, conta e enderecos do banco

  getClientes() {
    this.clienteService.getCliente(this.clienteFilter).subscribe(
      data => {
        this.clientAcoes = data.listVo;
        console.log(this.clientAcoes);
      },
      error => {
        this.validaErro(error);
      });
  }

  getContas() {
    this.contaService.getConta(this.clienteFilter).subscribe(
      data => {
        this.contAcoes = data.listVo;
        console.log(this.contAcoes);
      },
      error => {
        this.validaErro(error);
      });
  }

  getEnderecos() {
    this.enderecoService.getEnderecos(this.clienteFilter).subscribe(
      data => {
        this.contAcoes = data.listVo;
        console.log(this.contAcoes);
      },
      error => {
        this.validaErro(error);
      });
  }
}