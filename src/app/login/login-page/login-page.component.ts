import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  loginForm!: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // LOGIN FUNCTION
  login() {
    this.errorMessage = "";

    if (this.loginForm.invalid) {
      this.errorMessage = "Please fill all fields";
      return;
    }

    this.loading = true;

    const payload = {
      email: 'email@gmail.com',
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    this.api.post('auth/login', payload).subscribe({
      next: (res: any) => {
        this.loading = false;
    
        // store user in localStorage
        localStorage.setItem('user', JSON.stringify(res.user));
    
        // redirect
        this.router.navigate(['/item']);
      },
    
      error: (err: any) => {
        this.loading = false;
        this.errorMessage = err.error?.error || "Invalid username or password";
      }
    });
    
  }
}
