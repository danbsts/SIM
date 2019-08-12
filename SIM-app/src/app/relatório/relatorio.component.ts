import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Aluno } from '../alunos/aluno';
import { AlunoService } from '../alunos/aluno.service';
import { CriteriosService } from '../criterios/criterios.service';
import { Criterio } from '../criterios/criterio';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {

constructor(private alunoService: AlunoService, private criterioService: CriteriosService) {}

  alunos: Aluno[];
  criteriosPossiveis: Criterio[];
  mediaCriterios: Map<string,number> = new Map<string,number>();
  jaGerouRelatorio: boolean = false;

  calculaMedia(): void{
    var contadorCriterios: number = 0;
    for(let criterio in this.criteriosPossiveis){
      var valorCriterio: number = 0;
      var numPessoas: number = 0;
      for (let aluno in this.alunos) {
        numPessoas = numPessoas + 1;
        valorCriterio = valorCriterio + (Number(this.alunos[aluno].criterios[this.criteriosPossiveis[contadorCriterios].nome]));
      }
      if(numPessoas != 0){
        this.mediaCriterios[this.criteriosPossiveis[contadorCriterios].nome + ""] = valorCriterio/numPessoas;
      }else{
        this.mediaCriterios[this.criteriosPossiveis[contadorCriterios].nome + ""] = 0;
      }
      contadorCriterios = contadorCriterios + 1;
    }
    this.jaGerouRelatorio = true;
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
      
  }
}

