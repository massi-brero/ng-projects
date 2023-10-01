import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

enum STAR_STATE {
  EMPTY,
  HALF,
  FULL,
}

interface Star {
  state: STAR_STATE;
}

@Component({
  selector: 'app-stars-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stars-rating.component.html',
  styleUrls: ['./stars-rating.component.scss'],
})
export class StarsRatingComponent implements OnInit {
  @Input() rating = 0;
  starsRow: Star[] = [
    { state: STAR_STATE.EMPTY },
    { state: STAR_STATE.EMPTY },
    { state: STAR_STATE.EMPTY },
    { state: STAR_STATE.EMPTY },
    { state: STAR_STATE.EMPTY },
  ];

  ngOnInit(): void {
    console.log(this.rating.toString().split('.'));

    if (
      this.rating > 5 ||
      this.rating < 0 ||
      this.rating.toString().split('.')[1] !== '5'
    ) {
      console.error('Only half steps and numbers from 0-5 are allowed');
      return;
    }

    let idx = 0;
    while (this.rating > 0) {
      if (this.rating === 0.5) {
        this.starsRow[idx].state = STAR_STATE.HALF;
        break;
      }
      this.starsRow[idx].state = STAR_STATE.FULL;
      this.rating -= 1;
      idx += 1;
    }

    console.log(this.starsRow);
  }
}
