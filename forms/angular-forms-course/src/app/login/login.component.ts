import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  val = {
    email: 'hello@gmail.com',
    password: '123456'
  };

  constructor() {


  }

  ngOnInit() {
  }

  login(loginForm: NgForm, $e) {
    console.log(loginForm.errors, loginForm.valid, $e);
    console.log('val: ', this.val);
  }
}
