import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') myForm: NgForm;
  genders = ['male', 'female'];
  suggestUserName() {
    // this.myForm.setValue(..)
    const suggestedName = 'Superuser';
    /*
    This will rewrite the whole form
    this.myForm.setValue(
          {
            nameAndEmailGroup: {
              username: 'Suggested name',
            }
          }
        ); */

    /* This will only update the desired fields */
    this.myForm.form.patchValue(
      {
        nameAndEmailGroup: {
          username: 'Suggested name',
        }
      }
    );
  }

  onSubmit(ngForm: NgForm) {
    console.log(ngForm)
  }
}
