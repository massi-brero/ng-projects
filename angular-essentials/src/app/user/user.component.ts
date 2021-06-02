import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() name;
  @Output() nameChanged = new EventEmitter<string>();


  constructor() { }

  ngOnInit(): void {
  }

  onUserInput(e) {
    this.nameChanged.emit(e.target.value);
  }

}
