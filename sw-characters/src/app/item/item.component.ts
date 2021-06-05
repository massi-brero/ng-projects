import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Character} from "../models/Character";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() character: Character = new class implements Character {
    name: string = '';
    side: string = '';
  };
  @Output() sideAssigned = new EventEmitter<Character>();

  constructor() { }

  ngOnInit(): void {
  }

  onAssign(side: string) {
    // this.character.side = side;
    this.character.side = side;
    this.sideAssigned.emit(this.character)
  }
}
