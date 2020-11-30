import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  apiUrl: string;

  constructor(
    private http: HttpClient) {
    this.apiUrl = `${environment.apiUrl}/empresa`;
  }


  getEmpresa(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get-all`);
  }

  createEmpresa(filter: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, filter);
  }

  editEmpresa(filter: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/edit`, filter);
  }

  filtrarEmpresa(filter: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/get-by-filtro`, filter);
  }

  deleteEmpresa(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete ${id}`);
  }

  public exportar(filter: any){
    return this.http.post<any>(`${this.apiUrl}/--------/export/xls`, filter);
  }


}
