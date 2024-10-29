import { Component } from '@angular/core';
import { AuthService } from '../auth-service/auth.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  errorMsg: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(event: MouseEvent): void {
    const btn = event.target as HTMLInputElement;
    const btnId = btn.id;
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    if (username && password) {
      if (btnId === 'login') {
        this.authService.login(username, password).subscribe({
          next: response => {
            console.log('Login successful', response);
            this.router.navigate(['/table']).then(r => {});
          },
          error: error => {
            console.log('Login failed', error);
            this.errorMsg = 'Неверный логин или пароль';
          },
        });
      } else if (btnId === 'register') {
        this.authService.register(username, password).subscribe({
          next: response => {
            console.log('Registration successful', response);
            this.router.navigate(['/table']).then(r => {});
          },
          error: error => {
            console.log('Registration failed', error);
            this.errorMsg = 'Аккаунт с таким именем уже существует';
          },
        });
      }
    }
  }
}
