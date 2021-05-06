import { UserService } from './../services/user.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  registrationForm: FormGroup;

  isLoginActive = true;
  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.resetLoginForm();
  }

  resetLoginForm(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  resetRegistrationForm(): void {
    this.registrationForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      passwordAgain: new FormControl(''),
    });
  }

  setIsLoginActive(): void {
    if (this.isLoginActive) {
      this.resetRegistrationForm();
    } else {
      this.resetLoginForm();
    }
    this.isLoginActive = !this.isLoginActive;
  }

  submit(): void {
    if (this.isLoginActive) {
      this.loginUserWithEmailAndPassword();
    } else {
      if (
        this.registrationForm.value.password ===
        this.registrationForm.value.passwordAgain
      ) {
        this.createUser({
          email: this.registrationForm.value.email,
          username: this.registrationForm.value.name,
          password: this.registrationForm.value.password,
        });
      } else {
        this.registrationForm.controls.passwordAgain.setErrors({
          incorrect: true,
        });
      }
    }
  }

  private createUser(user): void {
    this.userService
      .create(user)
      .pipe(first())
      .subscribe(
        (res) => {
          this.snackBar.open('Sikeres regisztráció!', null, { duration: 2000 });
          setTimeout(() => this.setIsLoginActive(), 1000);
        },
        (err) => {
          console.error(err);
          this.snackBar.open('Regisztráció sikertelen', null, {
            duration: 2000,
          });
        }
      );
  }

  private loginUserWithEmailAndPassword(): void {
    this.userService
      .login({
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      })
      .pipe(first())
      .subscribe(
        (res) => {
          localStorage.setItem('user', this.loginForm.value.username);
          this.router.navigate(['/products']);
        },
        () => {
          this.snackBar.open('Wrong credentials', null, { duration: 2000 });
        }
      );
  }
}
