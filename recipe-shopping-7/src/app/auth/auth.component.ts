import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  //providers: [AuthService]
})
export class AuthComponent {
  //@Input('loginMode')
  loginMode: boolean = true;
  //@ViewChild('f') form: NgForm;
  @ViewChild('f', { static: false }) form: NgForm;
  authIdToken: string;
  error: string | null = null;
  isLoading: boolean = false;

  constructor(private authService: AuthService) { }

  onSubmit(myForm: NgForm) {
    // console.log(myForm.value);
    // this.authService.signup(myForm.value.email, myForm.value.password).subscribe(response => console.log(response));
    this.error = null;
    this.isLoading = true;

    ((this.loginMode)
      ? this.authService.login(myForm.value.email, myForm.value.password)
      : this.authService.signup(myForm.value.email, myForm.value.password))
      .subscribe({
        next: (response) => {
          this.authIdToken = response.idToken;
          this.isLoading = false;
        },
         error: (error) => {
          this.error = error.message;
          this.isLoading = false;
        }
      });
    //this.form.reset();
  }

  onCloseError() {
    this.error = null;
  }

  onSwitch() {
    this.loginMode = !this.loginMode;
  }

  onClear() {
    this.form.reset();
  }
}
