import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Registration } from '../../models/registration';
import { confirmEmailValidator } from 'src/shared/validators/confirm-email.validator';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, DoCheck {

  registrationForm: FormGroup;
  isFormInValid: boolean = false;
  responseMessage: string = '';
  showMessage: boolean = false;
  isRegisterComplete = false;
  step = 1;

  stateDropdownOptions = [
    { value: 'amravati', label: 'Amravati' },
    { value: 'dhule', label: 'Dhule' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'nashik', label: 'Nashik' },
    { value: 'thane', label: 'Thane' },
    { value: 'palghar', label: 'Palghar' },
    { value: 'pune', label: 'Pune' },
    { value: 'raigad', label: 'Raigad' },
    { value: 'sangli', label: 'Sangali' },
    { value: 'palghar', label: 'Palghar' },
  ];

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]*$')]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]*$')]],
      state: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
      subscribeToNewsLetter: ['', []],
    },
      {
        validators: confirmEmailValidator('email', 'confirmEmail'),
      });
  }

  ngDoCheck(): void {
    if (!this.isRegisterComplete) {
      this.step = this.registrationForm.valid ? 2 : 1;
    }
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const userData: Registration = {
        firstName: this.registrationForm.controls['firstName'].value,
        lastName: this.registrationForm.controls['lastName'].value,
        state: this.registrationForm.controls['state'].value,
        email: this.registrationForm.controls['email'].value,
        confirmEmail: this.registrationForm.controls['confirmEmail'].value,
        isSubscribeToNewsLetter: this.registrationForm.controls['subscribeToNewsLetter'].value,
      }
      const state = this.authService.addUser(userData);
      this.responseMessage = state ? 'Data saved successfully!' : 'Error while saving user data!';
      if (state) {
        this.step = 3;
        this.isRegisterComplete = true;
        this.sendEmail();
      }
    }
  }

  sendEmail() {
    const firstName = this.registrationForm.controls['firstName'].value;
    const lastName = this.registrationForm.controls['lastName'].value;
    const email = this.registrationForm.controls['email'].value;
    const subject = 'IntraMed : User registration';
    const emailTemplate =
      `Dear ${firstName} ${lastName}
                On behalf of Pharma Company, Inc. thank you for registering for the Speaker Training Meeting.

                You will receive a formal confirmation email within the next 3-5 business days, including information for booking 
                your travel.

                Regards,
                IntraMed`
    this.authService
      .sendEmail(email, subject, emailTemplate)
      .subscribe(
        (response) => {
          alert('Email sent successfully!');
        },
        (error) => {
          alert('Sorry,there was an error sending the email, please contact administrator.');
        }
      );
  }

  onLogout(): void {
    sessionStorage.removeItem('isValidUser');
    this.router.navigate(['/']);
  }
}
