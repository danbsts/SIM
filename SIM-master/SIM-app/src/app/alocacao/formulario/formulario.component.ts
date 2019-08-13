import { Component, OnInit } from '@angular/core';
import { MonitorService } from '../monitor.service';
import { Monitor } from '../monitor';
import { stringify } from 'querystring';

@Component({
  selector: 'app-root',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  
  constructor(private monitorService: MonitorService) { }

  monitor: Monitor = new Monitor();
  monitores: Monitor[];
  restricoesStr: string;

  ngOnInit() {
    this.monitorService.getMonitores()
    .then(as => this.monitores = as)
    .catch(erro => alert(erro));
  }

  criarMonitor() : void {
    this.atribuirRestricoes();
    console.log(this.monitor.disponibilidade);
    this.monitorService.criar(this.monitor)
    .then(ab => {
      if(ab) {
        this.monitores.push(ab);
        this.monitor = new Monitor();
        this.restricoesStr = "";
      }
    })
    .catch(erro => alert(erro));
  }

  atribuirRestricoes() : void {
    if (this.restricoesStr == undefined) {
      this.monitor.restricoes = [];
    } else if(this.restricoesStr.indexOf(" ") > 0) {
      this.monitor.restricoes = this.restricoesStr.split(" ");
    } else {
      this.monitor.restricoes = [this.restricoesStr];
    }
  }

}
