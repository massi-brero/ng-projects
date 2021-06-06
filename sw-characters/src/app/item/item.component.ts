import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Character} from "../models/Character";
import { StarWarsService } from '../star-wars.service';

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

  constructor(
    private swService: StarWarsService
  ) { }

  ngOnInit(): void {
  }

  onAssign(side: string) {
    this.character.side = side;
    this.swService.onSideAssigned(this.character);
  }
}
