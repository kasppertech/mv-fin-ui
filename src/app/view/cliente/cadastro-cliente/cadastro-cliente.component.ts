import { InputTextModule } from 'primeng/inputtext';
import { Conta } from './../../../model/conta';
import { ContaService } from './../../../services/conta.service';
import { Endereco } from './../../../model/endereco';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { EnderecoService } from 'src/app/services/endereco.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injector } from '@angular/core';
import { ElementRef } from '@angular/core';
import { BaseComponent } from 'src/app/helper/base.component';

interface Banco {
  nome: string;
  cod: string;
}

interface Tipo {
  tipo: string
}

interface Cadastro {
  tipo: string
}

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.scss']
})
export class CadastroClienteComponent extends BaseComponent {


  // clienteSee = new Cliente();
  clientes: Cliente[];
  contas: Conta[];
  enderecos: Endereco[];
  conta: Conta;
  endereco: Endereco;
  cliente: Cliente;
  endAcoes: any;
  contAcoes: any;

  pessoaJuridica: boolean = false;
  clienteDialog: boolean;
  disabledEdit: boolean

  //add Conta
  submitted: boolean;
  contaDialog: boolean;

  bancoSelected: Banco;
  selectedTpConta: Tipo;
  tipoCliente: string;

  banco: Banco[];
  selectedContas: Conta[];

  tipoCadastro: Cadastro[];
  tipoConta: Tipo[];
  clienteFS: boolean;
  clienteToSee: boolean;

  myGroup = new FormGroup({
    name: new FormControl()
  });

  constructor(public app: AppComponent,
    public injector: Injector,
    public el: ElementRef,
    private clienteService: ClienteService,
    private enderecoService: EnderecoService,
    private confirmationService: ConfirmationService,
    private contaService: ContaService,
    public messageService: MessageService,
    public router: Router,
  ) {
    super(injector, el);
    this.banco = [
      { nome: 'Itau', cod: '341' },
      { nome: 'Bradesco', cod: '237' },
      { nome: 'Santander', cod: '033' },
      { nome: 'NuBank', cod: '260' },

    ];
    this.tipoCadastro = [
      { tipo: 'Fisica' },
      { tipo: 'Juridica' },

    ];
    this.tipoConta = [
      { tipo: 'Poupança' },
      { tipo: 'Corrente' },

    ];
  }

  ngOnInit(): void {

    this.cliente = (this.clienteService.getToEdit() ? this.clienteService.getToEdit() : new Cliente());
    this.conta = new Conta();
    this.endereco = new Endereco();
    if (this.cliente.idCliente == null) {
      this.enderecos = [];
      this.contas = [];
    }
  }

  openNew() {
    this.submitted = false;
    this.contaDialog = true;
  }

  public hideDialog() {
    this.contaDialog = false;
    this.submitted = false;
  }

  clienteTipo(event) {
    let r
    r = event.value.tipo;
    this.cliente.tipoCliente = r;

    if (r == "Fisica") {
      this.clienteFS = true;

    } else {
      this.clienteFS = false;

    }
  }

  contaTipo(event) {
    let r
    r = event.value.tipo;
    this.conta.tipoConta = r;
  }

  changeBanco(event) {
    let b
    let c
    c = event.value.cod;
    b = event.value.nome;
    this.conta.banco = b;
    this.conta.codigoBanco = c;
  }



  addConta() {
    this.submitted = true;
    if (this.contas == undefined) {
      this.contas = [];
    }
    if (this.conta.banco.trim()) {
      if (this.conta.idConta) {
        this.contas[this.findIndexByIdConta(this.conta.idConta)] = this.conta;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Conta Updated', life: 3000 });
      }
      else {
        this.contas.push(this.conta);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Conta Created', life: 3000 });
      }
      this.contas = [...this.contas];
      this.conta = new Conta();
    }
  }

  addEndereco() {
    this.submitted = true;
    if (this.enderecos == undefined) {
      this.enderecos = [];
    }
    if (this.endereco.cep.trim()) {
      if (this.endereco.idEndereco) {
        this.enderecos[this.findIndexByIdEndereco(this.endereco.idEndereco)] = this.endereco;
        // this.enderecoService.createEndereco
      }
      else {

        this.enderecos.push(this.endereco);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Endereço Created', life: 3000 });
      }
      this.enderecos = [...this.enderecos];
      this.endereco = new Endereco();
    }
  }

  findIndexByIdConta(idConta: number) {
    let index = -1;
    for (let i = 0; i < this.contas.length; i++) {
      if (this.contas[i].idConta === idConta) {
        index = i;
        break;
      }
    }

    return index;
  }

  findIndexByIdEndereco(idEndereco: number) {
    let index = -1;
    for (let i = 0; i < this.enderecos.length; i++) {
      if (this.enderecos[i].idEndereco === idEndereco) {
        index = i;
        break;
      }
    }

    return index;
  }




  // @tipo method
  // @name clienteTipo
  // @methodOf cliente>consulta-cliente>consulta-cliente.ts
  // @description
  // Método responsável por indicar escolha do usuário para o tipo de cadastro

  salvar() {

 
    if (!this.canSaveEnd()) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Preencha pelo menos um Endereço" });
      return false;
    }

    if (!this.canSaveConta()) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Preencha pelo menos uma Conta Bancária" });
      return false;
    }

    this.cliente.identificador = this.cliente.identificador.replace(".", "").replace(".", "").replace("-", "").replace("/", "");

    this.clienteService.createCliente(this.cliente).subscribe(
      res => {

        if (res.idCliente != null) {
          this.cliente.idCliente = res.idCliente;
          this.endereco.idCliente = this.cliente.idCliente;

          for (var i = 0; this.enderecos.length > i; i++) {
            this.enderecos[i].idCliente = this.cliente.idCliente;
          }


          this.enderecoService.createEndereco(this.enderecos).subscribe(
            res => {

            }, error => {

              this.validaErro(error);
            }
          );

          for (var i = 0; this.contas.length > i; i++) {
            this.contas[i].idCliente = this.cliente.idCliente;
          }

          this.contaService.createConta(this.contas).subscribe(
            res => {

            }, error => {
              this.validaErro(error);
            }
          );
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Cliente Salvo com Sucesso', life: 3000 });
        }

        this.cliente = new Cliente();
        this.enderecos = [];
        this.contas = [];


      }, error => {

        this.validaErro(error);

        console.log("erro")
      }
    );



  }



  deleteEndereco(endereco: Endereco) {
   
    this.confirmationService.confirm({
      message: 'Deseja realmente deletar o CEP' + endereco.cep + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        if (endereco.idEndereco == null) {
          this.enderecos = this.enderecos.filter(val => (val.logradouro !== endereco.logradouro  && val.cep !== endereco.cep));
        }else{
          this.enderecos = this.enderecos.filter(val => val.idEndereco !== endereco.idEndereco);
        }


        
        this.enderecoService.deleteEndereco(endereco.idEndereco);
        this.endereco = new Endereco();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }


  deleteConta(conta: Conta) {
    this.confirmationService.confirm({
      message: 'Deseja realmente deletar a conta' + conta.conta + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        if (conta.idConta == null) {
          this.contas = this.contas.filter(val => (val.conta !== conta.conta && val.agencia !== conta.agencia));
        }else{
          this.contas = this.contas.filter(val => val.idConta !== conta.idConta);
        }

        
        this.contaService.deleteConta(conta.idConta);
        this.conta = new Conta();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }

  editEndereco(endereco: any) {

    if (endereco.idEndereco == null) {
      this.enderecos = this.enderecos.filter(val => (val.logradouro !== endereco.logradouro && val.cep !== endereco.cep));
    }
    this.endereco = { ...endereco };
    this.enderecoService.editEndereco(endereco);
  }

  editConta(conta: any) {
    if (conta.idConta == null) {
      this.contas = this.contas.filter(val => (val.conta !== conta.conta && val.agencia !== conta.agencia));
    }

    this.conta = { ...conta };
    this.contaService.editConta(conta);



  }

  voltaPag() {
    this.router.navigate(['/consulta-cliente']);
  }

  canSaveEnd() {


    if (this.enderecos.length > 0) {
      return true;
    }
    return false;
  }

  canSaveConta() {
    if (this.contas.length > 0) {
      return true;
    }
    return false;
  }


}
