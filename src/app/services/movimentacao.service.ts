import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovimentacaoService {

  apiUrl: string;

  constructor(
    private http: HttpClient) {
    this.apiUrl = `${environment.apiUrl}/movimentacao`;
  }

  getReceita(filter: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/relatorio-receita-empresas-periodo`, filter);
  }

  getSaldoPeriodo(filter: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/relatorio-saldo-cliente-periodo`, filter);
  }

  getSaldoByCliente(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/relatorio-saldo-cliente/${id}`);
  }

  getSaldoClientes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/relatorio-saldo-todos-cliente`);
  }

 


}
