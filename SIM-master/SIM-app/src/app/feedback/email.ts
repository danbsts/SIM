 export class Email{   
    from: string;
    to: string;
    subject: string;
    text: string;

    constructor(){
        this.from = "simappsender@gmail.com";
        this.to = "";
        this.text ="";
        this.subject= "";
    }
}