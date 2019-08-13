import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Sub} from "./sub";

@Injectable({
  providedIn: 'root'
})
export class SubService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';
  private sub: Sub;

  constructor(private http: Http) { }

  criar(sub: Sub): Promise<Sub> {
    return this.http.post(this.taURL + "/sub",JSON.stringify(sub), {headers: this.headers})
           .toPromise()
           .then(res => {
              if (res.json().success) {return sub;} else {return null;}
           })
           .catch(this.tratarErro);
  }

  getSubs(): Promise<Sub[]> {
    return this.http.get(this.taURL + "/subs")
             .toPromise()
             .then(res => res.json() as Sub[])
             .catch(this.tratarErro);
  }

  receivesub(a: Sub){
    this.sub =a ;
  }

  atualizar(sub: Sub): Promise<Sub> {
    return this.http.put(this.taURL + "/sub",JSON.stringify(sub), {headers: this.headers})
         .toPromise()
         .then(res => {
            if (res.json().success) {return sub;} else {return null;}
         })
         .catch(this.tratarErro);
  }

  usesub(){
    return this.sub;
  }

  private tratarErro(erro: any): Promise<any>{
    console.error('Acesso mal sucedido ao serviço de submissiões',erro);
    return Promise.reject(erro.message || erro);
  }
}
