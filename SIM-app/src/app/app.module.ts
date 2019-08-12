import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AlocacaoComponent } from './alocacao/alocacao.component';
import { CorrecaoComponent } from './correcao/correcao.component';
import { LoginComponent } from './login/login.component';
import { AlunosComponent } from './alunos/alunos.component';
import { AlunoService } from './alunos/aluno.service';
import { CriteriosComponent } from './criterios/criterios.component';
import { CriteriosService } from './criterios/criterios.service';
import { RelatorioComponent } from './relatório/relatorio.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedbackComponent,
    AlocacaoComponent,
    CorrecaoComponent,
    LoginComponent,
    AlunosComponent,
    CriteriosComponent,
    RelatorioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'alunos',
        component: AlunosComponent
      },
      {
        path: 'correcao',
        component: CorrecaoComponent
      },
      {
        path: 'criterios',
        component: CriteriosComponent
      },
      {
        path: 'relatorio',
        component: RelatorioComponent
      }
    ])
  ],
  providers: [AlunoService,CriteriosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
