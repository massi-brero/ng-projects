import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Character } from "../models/Character";
import { StarWarsService } from '../star-wars.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  characters: Character[] = [];
  private loadedSide: string = 'all';
  private subscription: Subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private starWarsService: StarWarsService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.reloadCharacters(params.side);
      this.loadedSide = params.side;
    });
    this.subscription = this.starWarsService.charactersChanged.subscribe(() => {
      this.reloadCharacters(this.loadedSide);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private reloadCharacters(side: string) {
    this.characters = this.starWarsService.getCharacters(side);
  }
}
