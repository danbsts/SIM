import { Component, OnInit } from '@angular/core';
import { Aula } from '../aula';
import {AulaService} from '../aula.service';
import { Monitor } from '../monitor';
import { MonitorService } from '../monitor.service';

@Component({
  selector: 'app-root',
  templateUrl: './cronograma.component.html',
  styleUrls: ['./cronograma.component.css']
})
export class CronogramaComponent implements OnInit {
  aulas: Aula[];
  

  constructor(private aulaService:AulaService, private monitorService: MonitorService) { }
  
  ngOnInit() {
    this.aulaService.getAulas()
    .then(as => this.aulas = as)
    .catch(erro => alert(erro));
  }
}