import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isFormInValid: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const userPassword = this.loginForm.controls['password'].value;
      const data: boolean = this.authService.vallidateUserPassword(userPassword);
      if (data) {
        this.router.navigate(['registration']);
      }
      else {
        this.loginForm.controls['password'].setErrors({ wrongPassword: true });
      }
    }
  }
}
