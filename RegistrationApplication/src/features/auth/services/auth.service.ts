import { Injectable } from '@angular/core';
import { HttpService } from 'src/shared/services/http.service';
import { Registration } from '../models/registration';
import { IAuthService } from './IAuthService';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {
  isUserAuthenticated: boolean = false;

  constructor(private httpService: HttpService) { }

  vallidateUserPassword(userPassword: string): boolean {
    return this.httpService.VallidateUserPassword(userPassword);
  }

  addUser(userData: Registration): boolean {
    return this.httpService.AddUser(userData);
  }

  sendEmail(to: string, subject: string, text: string): Observable<any> {
    return this.httpService.sendEmail(to, subject, text);
  }
}
