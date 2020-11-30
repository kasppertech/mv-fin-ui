import { Cliente } from './cliente';
import { Endereco } from './endereco';

export class Empresa {

    public id: number;
    public razaoSocial:string;
    public cnpj:string;
    public telefone:string;
    public endereco = new Endereco();
    public cliente: Cliente[];

}