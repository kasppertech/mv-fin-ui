import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Conta } from '../model/conta';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  apiUrl: string;
  contaToEdit: any;
  contaToSee: boolean = true;

  constructor(
    private http: HttpClient) {
    this.apiUrl = `${environment.apiUrl}/conta`;
  }


  getConta(filter: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/consulta-conta`, filter);
  }

  getContaById(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/consulta-conta-por-codigo/${id}`);
  }

  createConta(filter: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/salvar-conta`, filter);
  }

  editConta(conta: any) {

    
    this.contaToEdit = conta;
  }

  seeConta(conta: any) {
    this.contaToSee;
  }

  public getToEdit(): any {
    return this.contaToEdit;
  }

  public getToSee(): any {
    return this.contaToSee = true;
  }

  deleteConta(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deletar-conta/${id}`);
  }


}
