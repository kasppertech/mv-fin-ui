import { UsuarioService } from './../../services/usuario.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  usuarios: Usuario[];

  constructor(
    private router: Router,
    public app: AppComponent,
    private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.getUsuarios();
  }


getUsuarios(){
    this.usuarioService.getUsuario().subscribe(
      data => {
        this.usuarios = data
      },
      error => {
        console.log(error)
      });
  }

}
