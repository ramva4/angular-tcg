import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  genders = ['male', 'female'];

  myFormGroup: FormGroup;

  blacklistedUsernames = ['admin', 'root', 'helpdesk'];

  ngOnInit(): void {
    /*  bind(this) will bind the current 'this' to the usernameValidator function-
       - if not the function will execute in the context of some other object */
    this.myFormGroup = new FormGroup({
      username: new FormControl(null,
        [Validators.required, this.usernameValidator.bind(this)]),
      email: new FormControl(null,
        [Validators.email, Validators.required],
        this.asyncEmailValidator),
      address: new FormGroup({
        line1: new FormControl(null, Validators.required),
        line2: new FormControl(null)
      }),
      gender: new FormControl(),
      hobbies: new FormArray([])
    });
    // this.myFormGroup.get('email').statusChanges.subscribe((status) => {});
  }

  onSubmit() {
    console.log(this.myFormGroup);
  }

  getHobbyControls() {
    return (this.myFormGroup.get('hobbies') as FormArray).controls;
  }

  addHobby() {
    const newHobby = new FormControl();
    (<FormArray>this.myFormGroup.get('hobbies')).push(newHobby);
    console.log(Validators.required(this.myFormGroup.get('email')));
    console.log(this.myFormGroup);
  }

  usernameValidator(formControl: FormControl): { [k: string]: boolean } {
    return (this.blacklistedUsernames.indexOf(formControl.value) !== -1) ? { 'blacklistedUsername': true } : null;
  }

  asyncEmailValidator(formControl: FormControl): Promise<any> | Observable<any> {
    return new Promise((resolve, reject) => {
      setInterval(() => {
        if (formControl.value === 'a@b.com') resolve({ 'emailValidationFailure': true });
        else resolve(null);
      }, 2000);
    });
  }

}
