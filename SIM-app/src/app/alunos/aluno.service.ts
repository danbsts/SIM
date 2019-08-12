import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Aluno } from './aluno';

@Injectable()
export class AlunoService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private simURL = 'http://localhost:3000';

  constructor(private http: Http) { }

  criar(aluno: Aluno): Promise<Aluno> {
    return this.http.post(this.simURL + "/aluno",JSON.stringify(aluno), {headers: this.headers})
           .toPromise()
           .then(res => {
              if (res.json().success) {return aluno;} else {return null;}
           })
           .catch(this.tratarErro);
  }

  deletar(aluno: Aluno): Promise<Aluno> {
  return this.http.delete(this.simURL + "/deletarAluno", {headers: this.headers, body: JSON.stringify(aluno)})
    .toPromise()
    .then(res => {
      if (res.json().success) {return aluno;} else {return null;}
    })
    .catch(this.tratarErro);
  }

  atualizar(aluno: Aluno): Promise<Aluno> {
    return this.http.put(this.simURL + "/aluno",JSON.stringify(aluno), {headers: this.headers})
         .toPromise()
         .then(res => {
            if (res.json().success) {return aluno;} else {return null;}
         })
         .catch(this.tratarErro);
  }

  getAlunos(): Promise<Aluno[]> {
    return this.http.get(this.simURL + "/alunos")
             .toPromise()
             .then(res => res.json() as Aluno[])
             .catch(this.tratarErro);
  }

  private tratarErro(erro: any): Promise<any>{
    console.error('Acesso mal sucedido ao serviço de alunos',erro);
    return Promise.reject(erro.message || erro);
  }
}