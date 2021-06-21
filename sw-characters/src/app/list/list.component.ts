import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from "../models/Character";
import { StarWarsService } from '../star-wars.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  characters: Character[] = [];
  private loadedSide: string= 'all';

  constructor(
    private activatedRoute: ActivatedRoute,
    private starWarsService: StarWarsService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.reloadCharacters(params.side);
      this.loadedSide = params.side;
    });
    this.starWarsService.charactersChanged.subscribe(() => {
      this.reloadCharacters(this.loadedSide);
    });
  }

  private reloadCharacters(side: string) {
    this.characters = this.starWarsService.getCharacters(side);
  }
}
