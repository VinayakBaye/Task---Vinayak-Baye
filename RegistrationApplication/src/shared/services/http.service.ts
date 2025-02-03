import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiUrl = environment.apiUrl;
  private userPassword: string = environment.userPassword;
  private emailServerUrl = environment.emailServerUrl;

  constructor(private http: HttpClient) { }

  public AddUser(postData: any): boolean {
    console.log(postData);
    return true;
    //return this.http.post(this.apiUrl, postData);
  }

  public VallidateUserPassword(inputPassword: any): boolean {
    let result = false;
    if (this.userPassword == inputPassword) {
      result = true;
    }
    sessionStorage.setItem('isValidUser', JSON.stringify(result));
    return result;
  }

  public sendEmail(to: string, subject: string, text: string): Observable<any> {
    const emailData = { to, subject, text };
    return this.http.post<any>(this.emailServerUrl, emailData);
  }
}
