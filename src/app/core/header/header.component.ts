import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    items: MenuItem[];
    nome = "";
    constructor(
        public app: AppComponent,
        private router: Router
    ) {

    }

    ngOnInit() {

        this.nome = localStorage.getItem('mv-app-nome');

        this.items = [

            {
                label: 'Home',
                icon: 'fas fa-laptop-house',
                routerLink: '/home'
            },
            {
                label: 'Clientes',
                icon: 'fa fa-user-tag',
                routerLink: '/consulta-cliente'
            },
            // {
            //     label: 'Relatórios',
            //     icon: 'fa fa-user-tag',
            //     routerLink: '/relatorios'
            // },
            // {
            //     label: 'Perfil',
            //     icon: 'fa fa-user',
            //     routerLink: '/usuario'
            // },
            // {
            //     label: 'Movimentações',
            //     icon: 'fa fa-chart-pie',
            //     routerLink: '/dashboard'
            // },
            
        ];
    }

    logout() {
        localStorage.removeItem('mv-app-nome')
        localStorage.removeItem('mv-app-token')
        this.router.navigate(["/login"]);
      }
}