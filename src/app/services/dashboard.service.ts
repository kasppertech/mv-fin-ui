import { ClienteFilter } from './../model/cliente.filter';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../model/cliente';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  apiUrl: string;
  clienteToEdit: any;
  clienteToSee: boolean = true;

  constructor(
    private http: HttpClient) {
    this.apiUrl = `${environment.apiUrl}/dashboard`;
  }

  getDash(): Observable<any> {
    debugger
    return this.http.get<any>(`${this.apiUrl}/movimentacao`);
  }
}