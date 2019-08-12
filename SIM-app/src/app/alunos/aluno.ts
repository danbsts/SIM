export class Aluno {
  nome: string;
  login: string;
  criterios: Map<string,number>;
  nota: number;

  constructor() {
    this.clean();
  }

  clean(): void {
    this.nome = "";
    this.login = "";
    this.criterios = new Map<string,number>();
    this.nota = 0;
  }

  clone(): Aluno {
    var aluno: Aluno = new Aluno();
    aluno.criterios = new Map<string,number>();
    aluno.copyFrom(this);
    return aluno;
  }

  copyFrom(from: Aluno): void {
    this.nome = from.nome;
    this.login = from.login;
    this.nota = from.nota;
    this.copyCriteriosFrom(from.criterios);
  }

  copyCriteriosFrom(from: Map<string,number>): void {
    this.criterios = new Map<string,number>();
    for (let key in from) {
      this.criterios[key] = from[key];
    }
  }

  verificaAluno(): string[]{
    var conceitos: string[] = [];
    for (let key in this.criterios) {
      if(this.criterios[key] <= 0 || this.criterios[key] > 10){
        this.criterios[key] = '';
        conceitos.push(key);
      }
    }
    return conceitos;
  }
}