import { ElementRef } from '@angular/core';
import { Directive } from '@angular/core';
import { Injector } from '@angular/core';
import { OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Directive()
export abstract class BaseComponent implements OnInit {

    protected router: Router;
    protected messageService: MessageService;

    constructor(
        protected injector: Injector,
        protected el: ElementRef
    ) {
        this.router = this.injector.get(Router);
        this.messageService = this.injector.get(MessageService);

        console.log(this.router);

        if (this.router.routerState.snapshot.url != "/Login") {
            let token = localStorage.getItem('mv-app-token');
            if (token == undefined) {
                this.router.navigate(["/login"]);
            }
        }
    }

    ngOnInit(): void {

        console.log(this.router);

    }

    validaErro(retorno) {

        console.log(retorno)

        if (retorno.status == 401) {

            if (this.router.routerState.snapshot.url == "/login") {
                this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: retorno.error.mensagem, life: 3000 });
            } else {

                this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: "Sua sessão expirou!", life: 3000 });

                setTimeout(function () {
                    window.location.href = `/login`;
                }, 3000);


            }
        } else if (retorno.status == 409) {
            this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: retorno.error.mensagem, life: 3000 });
        }
        else if (retorno.status == 500) {
            this.messageService.add({ severity: 'Error', summary: 'Atenção', detail: "Ocorreu um erro inesperado!", life: 3000 });
        }


    }

}