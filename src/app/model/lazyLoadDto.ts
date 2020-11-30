import { Filter } from './filter';


export class LazyLoadDto extends Filter{

    public pagina: number = 0;
    public linhas: number = 10;
    public campoOrdenacao: string = null;
    public ordem: number = 1;
    public totalRegistros: number = 0
}