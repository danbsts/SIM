import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Aluno } from '../alunos/aluno';
import { AlunoService } from '../alunos/aluno.service';
import { CriteriosService } from '../criterios/criterios.service';
import { Criterio } from '../criterios/criterio';

@Component({
  selector: 'app-root',
  templateUrl: './correcao.component.html',
  styleUrls: ['./correcao.component.css']
})
export class CorrecaoComponent implements OnInit {

constructor(private alunoService: AlunoService, private criterioService: CriteriosService) {}

   alunos: Aluno[];
   criteriosPossiveis: Criterio[];
   temConceitosErrados: boolean = false;
   criteriosErrados: string[];
   

  atualizarAluno(aluno: Aluno): void {
      this.criteriosErrados = this.verificaConceitos(aluno);
      if(this.criteriosErrados.length == 0){
        this.temConceitosErrados = false;
        aluno.nota = this.calculaNota(aluno);
        this.alunoService.atualizar(aluno);
      }else{
        this.temConceitosErrados = true;
      }
  }

  verificaConceitos(aluno: Aluno): string[]{
    var conceitos: string[] = [];
    if(aluno.criterios.size != this.criteriosPossiveis.length){
      for(let i = 0; i < this.criteriosPossiveis.length; i++){
        if(aluno.criterios[this.criteriosPossiveis[i].nome] == undefined){
          aluno.criterios[this.criteriosPossiveis[i].nome] = 0;
        }
      }
      this.alunoService.atualizar(aluno);
    }
    return conceitos;
  }

  calculaNota(aluno: Aluno) : number{
    var notaAtual : number = 0;
    var pesoTotal : number = 0;
    for (let key in aluno.criterios) {
      var criterioAtual = this.criteriosPossiveis.find(a => a.nome == key);
      pesoTotal = pesoTotal + Number(criterioAtual.peso);
      if(aluno.criterios[key] >= 0 && aluno.criterios[key] <= 1)
      aluno.criterios[key] = aluno.criterios[key] * 10;
      notaAtual = (aluno.criterios[key] * criterioAtual.peso) + notaAtual;
    }
    notaAtual = (notaAtual)/pesoTotal;
    return notaAtual;
  }

  ngOnInit(): void {
      this.alunoService.getAlunos()
         .then(alunos => this.alunos = alunos)
         .catch(erro => alert(erro));
      this.criterioService.getCriterios()
         .then(criterios => this.criteriosPossiveis = criterios)
         .catch(erro => alert(erro));
  }

  onMove(): void {
      this.temConceitosErrados = false;
  }
}
