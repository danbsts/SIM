import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedbackComponent } from './feedback/feedback.component';
//import { AlocacaoComponent } from './alocacao/alocacao.component';
import { CorrecaoComponent } from './correcao/correcao.component';
import { LoginComponent } from './login/login.component';
import { AlunosComponent } from './alunos/alunos.component';
import { AlunoService } from './alunos/aluno.service';
import {FeedbackService} from './feedback/feedback.service';
import { SubmissaoComponent } from './submissao/submissao.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedbackComponent,
    CorrecaoComponent,
    LoginComponent,
    AlunosComponent,
    SubmissaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'alunos',
        component: AlunosComponent
      },
      {
        path: 'feedbacks',
        component: FeedbackComponent
      },
      {
        path: 'correcao',
        component: CorrecaoComponent
      },
      {
        path: 'submissao', 
        component: SubmissaoComponent
      },
      {
        path: 'alocacao',
        loadChildren: './alocacao/alocacao.module#AlocacaoModule'
      }
    ])
  ],
  providers: [AlunoService, FeedbackService],
  bootstrap: [AppComponent]
})
export class AppModule { }
