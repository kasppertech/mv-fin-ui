import { ElementRef } from '@angular/core';
import { Injector } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/helper/base.component';
import { RequestLogin } from 'src/app/model/requestLogin';

import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent extends BaseComponent {

  public validacaoRequestLogin = new RequestLogin();
  public requestLogin: RequestLogin;
  

  constructor(
    public injector: Injector,
    public el: ElementRef,
    public router: Router,
    private loginService: LoginService) {
      super(injector, el);

     }

  ngOnInit(): void {
    this.requestLogin = new RequestLogin();
  }

  public doLogin(): void {

    localStorage.removeItem('mv-app-nome');
    localStorage.removeItem('mv-app-token');
    
    this.limpaCamposValidacao();

    //if (this.validaCampos()) {
      this.loginService.doLogin(this.requestLogin).subscribe(data => {

        let resposta: any;
        resposta = data;
        
        localStorage.setItem('mv-app-token', resposta.jwtToken);
        localStorage.setItem('mv-app-nome', resposta.nome);

        this.router.navigate(['/', 'home']);

      }, error => {
        
        this.validaErro(error);       
        console.error(error);
      });
    //}
  }


 


  validaCampos() {

    let valida = true;

    valida = this.validaCampoObrigatorio("username", valida);
    valida = this.validaCampoObrigatorio("password", valida);

    return valida;

  }

  validaCampoObrigatorio(str, valida) {

    if (this.isNullOrEmpty(this.requestLogin[str])) {
      this.mensagemErro(str, "Campo Obrigatorio.");
      return false;
    }

    if (!valida) { return false }

    return true;
  }

  mensagemErro(str, msg) {
    this.validacaoRequestLogin[str] = msg;
  }

  limpaCamposValidacao() {
    this.validacaoRequestLogin = new RequestLogin();
  }

  isNullOrEmpty(str) {

    if (str == null) {
      return true;
    }


    if (str == undefined) {
      return true;
    }


    if (str.trim() == "") {
      return true;
    }

    return false;
  }

}
