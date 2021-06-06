import { Component, OnInit } from '@angular/core';
import { Character } from "../models/Character";
import { StarWarsService } from '../star-wars.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  characters: Character[] = [];
  chosenList = 'all';

  constructor(private swService: StarWarsService) { }

  ngOnInit(): void {
  }

  onChoose(side: string) {
    this.chosenList = side;
  }

  getCharacters() {
   return this.swService.getCharacters(this.chosenList);
  }

}
