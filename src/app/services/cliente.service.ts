import { ClienteFilter } from './../model/cliente.filter';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  apiUrl: string;
  clienteToEdit: any;
  clienteToSee: boolean = true;

  constructor(
    private http: HttpClient) {
    this.apiUrl = `${environment.apiUrl}/cliente`;
  }

  getCliente(filter: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/consulta-cliente`, filter);
  }

  getClienteById(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/consulta-cliente-por-codigo/${id}`);
  }

  createCliente(cliente: Cliente): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/salvar-cliente` ,cliente);
  }

  editCliente(cliente: any) {
    this.clienteToEdit = cliente;
  }

  seeCliente(cliente: any) {
    this.clienteToSee;
  }

  public getToEdit(): any {
    return this.clienteToEdit;
  }

  public getToSee(): any {
    return this.clienteToSee = true;
  }

  deleteCliente(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/exclusao-cliente-por-codigo/${id}`);
  }

  public exportar(filter: any) {
    return this.http.post<any>(`${this.apiUrl}/export/xls`, filter);
  }
}
