import { UsuarioComponent } from './view/usuario/usuario.component';
import { HeaderComponent } from './core/header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { NavbarComponent } from './core/navbar/navbar.component';
import { LoginComponent } from './view/login/login.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { HomeComponent } from './view/home/home.component';
import { CadastroClienteComponent } from './view/cliente/cadastro-cliente/cadastro-cliente.component';
import { ConsultaClienteComponent } from './view/cliente/consulta-cliente/consulta-cliente.component';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { FieldsetModule } from 'primeng/fieldset';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { TabMenuModule } from 'primeng/tabmenu';
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenubarModule } from 'primeng/menubar';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { AuthInterceptor } from './auth.interceptor';
import { RelatoriosComponent } from './view/relatorios/relatorios.component';
import {InputMaskModule} from 'primeng/inputmask';
 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    CadastroClienteComponent,
    ConsultaClienteComponent,
    RelatoriosComponent,
    UsuarioComponent 

  ],
  exports: [

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ConfirmDialogModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    DialogModule,
    BrowserAnimationsModule,
    InputTextModule,
    PanelModule,
    FieldsetModule,
    TableModule,
    MultiSelectModule,
    RadioButtonModule,
    CheckboxModule,
    InputTextareaModule,
    CardModule,
    ChartModule,
    TabMenuModule,
    StepsModule,
    DialogModule,
    ToastModule,
    CalendarModule,
    DropdownModule,
    SplitButtonModule,
    MenubarModule,
    ButtonModule,
    RippleModule,
    ToolbarModule,
    TooltipModule,
    FormsModule,
    ReactiveFormsModule,
    InputMaskModule

  ],
  providers: [
    ConfirmationService, 
    DatePipe,
    MessageService,
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
