import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  apiUrl: string;

  constructor(
    private http: HttpClient) {
    this.apiUrl = `${environment.apiUrl}/usuario`;
  }

  getUsuario(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get-all`);
  }

  createUsuario(filter: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/`, filter);
  }

  editUsuario(filter: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/`, filter);
  }

  filtrarUsuario(filter: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/get-by-filtro`, filter);
  }

  deleteUsuario(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/ ${id}`);
  }

  public exportar(filter: any){
    return this.http.post<any>(`${this.apiUrl}/--------/export/xls`, filter);
  }


}
