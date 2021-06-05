import { Component, OnInit } from '@angular/core';
import {Character} from "../models/Character";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  characters = [
    { name:'Luke Skywalker', side: '' },
    { name:'Darth Vader', side: '' }
  ];
  chosenList = 'all';

  constructor() { }

  ngOnInit(): void {
  }

  getCharacters() {
      if (this.chosenList === 'all') {
        return this.characters.slice();
      } else {
        return this.characters.filter((character: Character) => {
          return character.side === this.chosenList;
        });
      }
  }

  onChoose(side: string) {
    this.chosenList = side;
  }

  onSideAssigned(changedCharacter: Character) {
    const pos = this.characters.findIndex((character: Character) => {
      return character.name === changedCharacter.name;
    });
    this.characters[pos].side = changedCharacter.side;
  }

}
