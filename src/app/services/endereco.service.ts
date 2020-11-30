import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  apiUrl: string;
  enderecoToEdit: any;
  enderecoToSee: boolean = true;

  constructor(
    private http: HttpClient) {
    this.apiUrl = `${environment.apiUrl}/endereco`;
  }


  getEnderecos(filter: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/consulta-endereco`, filter);
  }

  createEndereco(filter: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/salvar-endereco`, filter);
  }

  editEndereco(endereco: any) {
    this.enderecoToEdit = endereco;
  }

  seeEndereco(endereco: any) {
    this.enderecoToSee;
  }

  public getToEdit(): any {
    return this.enderecoToEdit;
  }

  public getToSee(): any {
    return this.enderecoToSee = true;
  }

  deleteEndereco(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deletar-endereco/${id}`);
  }

  // public exportar(filter: any) {
  //   return this.http.post<any>(`${this.apiUrl}/export/xls`, filter);
  // }

}
