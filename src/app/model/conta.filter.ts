import { LazyLoadDto } from './lazyLoadDto';
export class ContaFilter {

    idConta: number;
    idCliente:number;
    identificador:string
    agencia: string;
    conta: string;
    page = 0;
    itensPorPagina = 10;
    lazyLoadDto = new LazyLoadDto();

}

