import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { CriteriosService } from './criterios.service';
import { Criterio } from './criterio';

@Component({
  selector: 'app-criterios',
  templateUrl: './criterios.component.html',
  styleUrls: ['./criterios.component.css']
})
export class CriteriosComponent implements OnInit {

constructor(private criteriosService: CriteriosService) {}

   criterios: Criterio[];
   criterioDuplicado : boolean = false;
   criterio: Criterio = new Criterio();

   criarCriterio(c: Criterio): void {
     this.criteriosService.criar(c)
        .then(ab => {
           if (ab) {
              this.criterios.push(ab);
           } else {
              this.criterioDuplicado = true;
           }
        })
        .catch(erro => alert(erro));
   }

    deletarCriterio(c: Criterio): void {
      this.criteriosService.deletar(c)
      .then(ab => {
         if (ab) {
            var result: Criterio = this.criterios.find(k => k.nome == c.nome);
            this.criterios.splice(this.criterios.indexOf(result), 1);
         }
      })
      .catch(erro => alert(erro));
     }

     ngOnInit(): void {
      this.criteriosService.getCriterios()
         .then(criterios => this.criterios = criterios)
         .catch(erro => alert(erro));
    }

    onMove(): void {
      this.criterioDuplicado = false;
   }
}
