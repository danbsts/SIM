import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Aula } from '../aula';
import { Monitor } from '../monitor';
import { AulaService } from '../aula.service';
import { MonitorService } from '../monitor.service';

@Component({
  selector: 'app-root',
  templateUrl: './alteracao.component.html',
  styleUrls: ['./alteracao.component.css']
})
export class AlteracaoComponent implements OnInit {
  
  constructor(private aulaService: AulaService, private monitorService: MonitorService) { }

  monitores: Monitor[];
  aulas: Aula[] = [];
  data: string;
  diaSelect: Aula;
  monitoresAlocados: string;
  erroAloc:boolean = false;

  ngOnInit() {
    this.aulaService.getAulas()
    .then(as => this.aulas = as)
    .catch(erro => alert(erro));
    this.monitorService.getMonitores()
    .then(as => this.monitores = as)
    .catch(erro => alert(erro));
  }

  buscar() : void {
    console.log(this.aulas);
    for(var i = 0; i < this.aulas.length; i++) {
      if(this.aulas[i].data == this.data) {
        this.diaSelect = this.aulas[i];
        this.monitoresAlocados = this.monitoresString(this.diaSelect.monitores);
        console.log(this.diaSelect);
        break;
      }
    }
  }

  monitoresString(monitores: Monitor[]) : string{
    if(monitores.length == 0) {
      return "";
    } else {
      var result:string = "";
      monitores.forEach(m => {
        if(m) result += m.nome + " ";
      })
      console.log(result.substr(0, result.length-1));
      return result.substr(0, result.length-1);
    }
  }

  atualizarAula() : void {
    this.diaSelect.monitores = this.getMonitores();
    this.aulaService.atualizar(this.diaSelect)
    .then(as => {
      if(as) {
        console.log(as);
        this.diaSelect = undefined;
        this.monitoresAlocados = undefined;
        this.data = "";
        for(var i = 0; i < this.aulas.length; i++) {
          if (this.aulas[i].data == as.data) {
            this.aulas[i] = as;
          }
        }
      }
    })
    .catch(erro => alert(erro));
  }

  getMonitores() : Monitor[]{
    var result = [];
    if(this.monitoresAlocados == undefined || this.monitoresAlocados == "")
      return result;
    else {
      var names = this.monitoresAlocados.split(" ");
      names.forEach(nome => {
        result.push(this.monitores.find(e => e.nome == nome));
      });
    }
    return result;
  }
  alocarMonitores(){
    this.diaSelect.monitores = this.getMonitores();
    if(this.diaSelect.monitores.length < this.diaSelect.numAlocados){
      this.erroAloc = true;
    }else{
      this.aulaService.atualizar(this.diaSelect)
      .then(as => {
        if(as) {
          console.log(as);
          this.diaSelect = undefined;
          this.monitoresAlocados = undefined;
          this.data = "";
          this.erroAloc = false;
          for(var i = 0; i < this.aulas.length; i++) {
            if (this.aulas[i].data == as.data) {
              this.aulas[i] = as;
            }
          }
        }
      })
      .catch(erro => alert(erro));
    }
  }
}
