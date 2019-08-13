export class Sub{
    aluno: string;
    questao: number;
    descricao:string;
    lista: number;
    codigo: string;
    feedback: string;
    nota: number;


    constructor(aluno,  questao, descrição, lista, código ){
        this.aluno = aluno;
        this.questao = questao;
        this.descricao = descrição;
        this.lista = lista;
        this.codigo = código;
        this.feedback = "";
        this.nota = 0;
    }

    copyFrom(from: Sub): void {
        this.aluno = from.aluno;
        this.questao = from.questao;
        this.descricao = from.descricao;
        this.lista = from.lista;
        this.codigo = from.codigo;
        this.feedback = from.feedback;
        this.nota = from.nota;
        
      }

}