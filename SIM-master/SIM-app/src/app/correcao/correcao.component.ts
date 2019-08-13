import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Aluno } from '../alunos/aluno';
import { AlunoService } from '../alunos/aluno.service';

@Component({
  selector: 'app-correcao',
  templateUrl: './correcao.component.html',
  styleUrls: ['./correcao.component.css']
})
export class CorrecaoComponent implements OnInit {

constructor(private alunoService: AlunoService) {}

   alunos: Aluno[];
   conceitosErrados: string = '';
   temConceitosErrados: boolean = false;

   atualizarAluno(aluno: Aluno): void {
      this.alunoService.atualizar(aluno);
      var erros: string[] = aluno.verificaAluno();
      if(erros.length == 0){
      	this.temConceitosErrados = false;
      	this.conceitosErrados = '';
      }else{
      	for (let key in erros) {
      		this.conceitosErrados = this.conceitosErrados + ' ' + key;
      	}
      	this.temConceitosErrados = true;
      }
   }

   ngOnInit(): void {
      this.alunoService.getAlunos()
         .then(alunos => this.alunos = alunos)
         .catch(erro => alert(erro));
   }

}
