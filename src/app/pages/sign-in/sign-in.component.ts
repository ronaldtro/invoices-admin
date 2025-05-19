import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DangerAlert } from "../../utils/DangerAlert";
import { SuccessAlert } from '../../utils/SuccessAlert';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { WarningAlert } from '../../utils/WarningAlert';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SpinnerComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

  loginForm: FormGroup;
  spinner: boolean;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.spinner = false;
  }

  submit() {

    this.loginForm.markAllAsTouched();

    if (!this.loginForm.valid) {
      WarningAlert.setMessageAlertSubject("Datos inválidos.");
      WarningAlert.setStateAlertSubject(true);
    } else {
      //console.log('Form values:', this.loginForm.value);
      this.spinner = true;
      setTimeout(() => {
        this.spinner = false;
        if (this.loginForm.value.email === "test@hotmail.com" &&
          this.loginForm.value.password === "12345678"
        ) {
          this.router.navigate(['/dashboard/register-invoice']);
          SuccessAlert.setMessageAlertSubject("Hola, Bienvenid@.");
          SuccessAlert.setStateAlertSubject(true);
        } else {
          DangerAlert.setMessageAlertSubject("Credenciales inválidas.");
          DangerAlert.setStateAlertSubject(true);
        }

      }, 2000);

    }
  }

}
