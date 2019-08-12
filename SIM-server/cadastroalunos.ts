import { Aluno } from '../SIM-app/src/app/alunos/aluno';

export class CadastroAlunos {
  alunos: Aluno[] = [];

  criar(aluno: Aluno): Aluno {
    var result = null;
    if (this.loginNaoCadastrado(aluno.login) && this.checkAluno(aluno)) {
      result = new Aluno();
      result.copyFrom(aluno);
      this.alunos.push(result);
    }
    return result;
  }

  deletar(aluno: Aluno): boolean {
    var result: Aluno = this.alunos.find(a => a.login == aluno.login);
    var saida: boolean = false;
    if (result){
      this.alunos.splice(this.alunos.indexOf(result), 1);
      saida = true;
    } 
    return saida;
  }

  loginNaoCadastrado(login: string): boolean {
     return !this.alunos.find(a => a.login == login);
  }

  checkAluno(aluno: Aluno) {
    return (aluno.nome != undefined && aluno.login != undefined);
  }

  atualizar(aluno: Aluno): Aluno {
    var result: Aluno = this.alunos.find(a => a.login == aluno.login);
    if (result) result.copyFrom(aluno);
    return result;
  }

  getAlunos(): Aluno[] {
    return this.alunos;
  }
}

