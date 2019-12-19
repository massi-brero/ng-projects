import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-server-entity',
  templateUrl: './server-entity.component.html',
  styleUrls: ['./server-entity.component.css']
})
export class ServerEntityComponent implements OnInit {
  @Input() entity: {
    type: string,
    name: string,
    content: string
  };


  constructor() { }

  ngOnInit() {
  }

}
