import { LazyLoadDto } from './lazyLoadDto';
export class ClienteFilter {

    nome: string;
    identificador: string
    page = 0;
    itensPorPagina = 10;
    lazyLoadDto = new LazyLoadDto();

}


// public idCliente: number;
//     public nome: string;
//     public identificador: string;
//     public tipoCliente: string;
//     public telefone: string;
//     public email: string;