import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { StarWarsService } from '../star-wars.service';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.css']
})
export class CreateCharacterComponent implements OnInit {
  availableSides = [
    {
      display: 'None',
      value: ''
    },
    {
      display: 'Light',
      value: 'light'
    },
    {
      display: 'Dark',
      value: 'dark'
    }
  ];

  constructor(private swService: StarWarsService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    if (!form.invalid) {
      this.swService.addCharacter(form.value.name, form.value.side);
    }
  }

}
