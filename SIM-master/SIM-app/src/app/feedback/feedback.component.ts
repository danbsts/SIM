import { Component, OnInit } from '@angular/core';
import { Email } from './email';
import { FeedbackService} from './feedback.service';
import {SubService} from "./sub.service";
import {Sub} from "./sub";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  email : Email = new Email();
  subs: Sub[] = [];
  aluno :string  = "Manoel Silva";
  aluno2:string = "Amanda Soares";
  questao : number = 1;
  lista : number = 2;
  código : string = "Printf('Hello word')";
  descrição : string = "C. Electrification time limit per test2 seconds memory limit per test256 megabytes inputstandard input outputstandard output At first, there was a legend related to the name of the problem,"+
  "but now it's just a formal statement. You are given n points a1,a2,…,an on the OX axis. Now you are asked to find such an integer point x on OX axis that fk(x) is minimal possible."+
  "The function fk(x) can be described in the following way:";
  
  submission = new Sub(this.aluno, this.questao, this.descrição, this.lista, this.código);
  submission2 = new Sub(this.aluno2, this.questao, this.descrição, this.lista, this.código);

  
  constructor(private feedbackService : FeedbackService, private subService : SubService) { }

  ngOnInit() {
    this.subService.getSubs()
         .then(as => this.subs = as)
         .catch(erro => alert(erro));
  }

  enviarEmail(email){
    this.feedbackService.send(email)
    .then(ab => {
      if (ab) {
         this.email = new Email();
      }
   })
   .catch(erro => alert(erro));
   alert("feedback enviado");
  }

  generate(){
    this.subService.criar(this.submission).then(
      ab => {
        
      }

    );
    this.subs.push(this.submission);
    this.subService.criar(this.submission2).then(
      ab => {
        
      }
    );
    this.subs.push(this.submission2);
  }

  sendsub(a){
    this.subService.receivesub(a);
  }


}
