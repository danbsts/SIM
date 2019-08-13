import { Component, OnInit } from '@angular/core';
import { SubService } from '../feedback/sub.service';
import {Sub} from '../feedback/sub';

@Component({
  selector: 'app-submissao',
  templateUrl: './submissao.component.html',
  styleUrls: ['./submissao.component.css']
})
export class SubmissaoComponent implements OnInit {
  sub: Sub;
  nota: number;
  feed: string;
  constructor(private subService : SubService) { }

  ngOnInit() {
    this.sub = this.subService.usesub();
  }

  mudarNota(){
    //this.sub.nota = this.nota;
    //this.sub.feedback = this.feed;
    this.subService.atualizar(this.sub);
  }
}
