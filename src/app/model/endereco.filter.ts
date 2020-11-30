import { LazyLoadDto } from './lazyLoadDto';
export class EnderecoFilter {

    idEndereco: number;
    idCliente:number;
    cep: string;
    logradouro:string;
    numero:string;
    complemento:string;
    bairro:string;
    cidade:string;
    uf:string;
    page = 0;
    itensPorPagina = 10;
    lazyLoadDto = new LazyLoadDto();

}