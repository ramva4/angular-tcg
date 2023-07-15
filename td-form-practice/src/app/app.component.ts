import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'td-form-practice';
  subscriptions = ['Basic', 'Advanced', 'Pro'];
  selectedSubscription = 'Basic';
  submitted: boolean = false;
  form: {
    email: string;
    subscription: string;
    password: string;
  };

  onSubmit(form: NgForm) {
    console.log(form);
    
    this.form = {
      email: form.value.email,
      subscription: form.value.subscription,
      password: btoa(form.value.password)
    };
    this.submitted = true;
  }

}
