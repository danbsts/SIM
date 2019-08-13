export class Monitor {
    nome: string;
    disponibilidade: boolean[];
    restricoes: string[];
    alocacoes: number;
    chefe: boolean;

    constructor() {
        this.clean();
    }

    clean() : void {
        this.nome = "";
        this.disponibilidade = [false,false,false,false,false];
        this.restricoes = [];
        this.alocacoes = 0;
        this.chefe = false;
    }

    copyFrom(from: Monitor): void{
        this.nome = from.nome;
        this.copyDisponibilidade(from.disponibilidade);
        this.copyRestricoes(from.restricoes);
        this.alocacoes = from.alocacoes;
        this.chefe = from.chefe
    }

    copyDisponibilidade(from: boolean[]) : void {
        this.disponibilidade = [false, false, false, false, false];
        for(var i = 0; i < from.length; i++) {
            this.disponibilidade[i] = from[i];
        }
    }

    copyRestricoes(from: string[]) : void {
        this.restricoes = [];
        for(var i = 0; i < from.length; i++) {
            if(from[i] != "") this.restricoes[i] = from[i];
        }
    }
}