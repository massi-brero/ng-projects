import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators, FormArray } from "@angular/forms";
import { Observable } from "rxjs";
import { resolve } from "dns";
import { rejects } from "assert";
import { stat } from "fs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  genders = ["male", "female"];
  signUpForm: FormGroup;
  forbiddenuserNames = ['Adolf', 'Björn'];

  ngOnInit() {
    this.signUpForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [Validators.required, (c: FormControl) => this.forbiddenNames(c)]),
        email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmail)
      }),
      gender: new FormControl("male"),
      hobbies: new FormArray([])
    });
    this.signUpForm.valueChanges.subscribe((value) =>  {
      console.log(value);
    });
    this.signUpForm.statusChanges.subscribe((status) =>  {
      console.log(status);
    });
  }

  onSubmit() {
    console.log(this.signUpForm);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(control);
  }

  get controls() {
    return (<FormArray>this.signUpForm.get('hobbies')).controls;
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenuserNames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value == 'test@test.de') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    
  }
}
