import { UsuarioComponent } from './view/usuario/usuario.component';
import { CadastroClienteComponent } from './view/cliente/cadastro-cliente/cadastro-cliente.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { ConsultaClienteComponent } from './view/cliente/consulta-cliente/consulta-cliente.component';
import { RelatoriosComponent } from './view/relatorios/relatorios.component';




const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, data: { title: 'Login Page' } },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cadastro-cliente', component: CadastroClienteComponent },
  { path: 'consulta-cliente', component: ConsultaClienteComponent },
  { path: 'relatorios', component: RelatoriosComponent },
  { path: 'usuario', component: UsuarioComponent },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }