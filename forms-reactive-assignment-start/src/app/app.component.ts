import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectStatuses = ['Stable', 'Critical', 'Finished'];
  myForm: FormGroup | undefined;

  ngOnInit(): void {
    this.myForm = new FormGroup({
      'project': new FormControl(
        null,
        [
          Validators.required,
          this.projectValidator
        ],
        this.projectAsyncValidator as AsyncValidatorFn
      ),

      'mail': new FormControl('',
        [
          Validators.required,
          Validators.email
        ]
      ),

      'projectStatus': new FormControl(this.projectStatuses[1])
    });
  }

  projectValidator(project: FormControl): { [s: string]: boolean } | null {
    if (project.value === 'Test') return {
      'projectNameValidation': true
    }; else return null;
  }

  projectAsyncValidator(formControl: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          if (formControl.value === 'Test1') {
            resolve({ 'projectNameValidation': true });
          } else {
            resolve(null);
          }
        }, 500);
      }
    );
    return promise;
  }

  onSubmit() {
    console.log(this.myForm.value);
  }

}
