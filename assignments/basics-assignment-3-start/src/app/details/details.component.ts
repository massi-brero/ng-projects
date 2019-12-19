import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  details = 'password is -> tuna';
  showDetails = false;
  logs: string[] = [];

  constructor() { }

  ngOnInit() {
  }

  private addLog(log: string) {
    this.logs.push(log);
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;

    const logMessage = 'Clicked: ' + formatDate(new Date(), 'medium', 'en') + ' - showDetails: ' + this.showDetails;
    this.addLog(logMessage);
  }


}
