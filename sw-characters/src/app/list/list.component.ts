import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Character} from "../models/Character";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() characters: Character[] = [];

  constructor() { }

  ngOnInit(): void {
  }
}
