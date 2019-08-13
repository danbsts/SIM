import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Email } from './email';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';

  constructor(private http: Http) { }

  send(email: Email): Promise<Email> {
    return this.http.post(this.taURL + "/sendemail",JSON.stringify(email), {headers: this.headers})
           .toPromise()
           .then(res => {
              if (res.json().success) {return email;} else {return null;}
           })
           .catch(this.tratarErro);
  }

  private tratarErro(erro: any): Promise<any>{
    console.error('Acesso mal sucedido ao serviço',erro);
    return Promise.reject(erro.message || erro);
  }
}
