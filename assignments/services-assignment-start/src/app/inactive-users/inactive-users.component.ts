import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CounterService } from '../services/counter.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent implements OnInit {
  users: string[];

  constructor(private counterService: CounterService, private userService: UserService) {}

  ngOnInit(): void {
    this.users = this.userService.inactiveUsers;
  }

  onSetToActive(id: number) {
    this.counterService.countEventTriggered.emit('User set to inactive - counter: ' + this.counterService.count);
    this.userService.setToActive(id);
  }
}
