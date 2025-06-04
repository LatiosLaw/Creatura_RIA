import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      nickname: ['', Validators.required],
      contrasena: ['', Validators.required],
    });
  }
  
  iniciarSesion() {
    if (this.loginForm.valid) {
      const { nickname, contrasena } = this.loginForm.value;
      console.log('Nickname:', nickname);
      console.log('Contraseña:', contrasena);
    }
  }
  
}