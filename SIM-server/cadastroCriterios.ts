import { Criterio } from '../SIM-app/src/app/criterios/criterio';
export class CadastroCriterios {
  criterios: Criterio[] = [];

  criar(criterio: Criterio): Criterio {
    var result = null;
    if (this.criterioNaoCadastrado(criterio) && this.checkCriterio(criterio)) {
      result = criterio;
      this.criterios.push(result);
    }
    return result;
  }

  deletar(criterio: Criterio): boolean {
    var result: Criterio = this.criterios.find(a => a.nome == criterio.nome);
    var saida: boolean = false;
    if (result){
      this.criterios.splice(this.criterios.indexOf(result), 1);
      saida = true;
    } 
    return saida;
  }

  atualizar(criterio: Criterio): Criterio {
    var result: Criterio = this.criterios.find(a => a.nome == criterio.nome);
    if (!this.criterioNaoCadastrado(result)){
      this.deletar(result);
      result.nome = criterio.nome;
      result.peso = criterio.peso;
      this.criar(result);
    }
    return result;
  }

  checkCriterio(criterio: Criterio) : boolean {
    return (criterio.nome != undefined && criterio.peso != undefined);
  }

  criterioNaoCadastrado(criterio: Criterio): boolean {
     return !this.criterios.find(a => a.nome == criterio.nome);
  }

  getCriterios(): Criterio[] {
    return this.criterios;
  }
}

