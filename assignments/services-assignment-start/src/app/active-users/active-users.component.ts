import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CounterService } from '../services/counter.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent implements OnInit {
  users: string[];

  constructor(private counterService: CounterService, private userService: UserService) {}

  ngOnInit(): void {
    this.users = this.userService.activeUsers;
  }

  onSetToInactive(id: number) {
    this.counterService.countEventTriggered.emit('User set to active - counter: ' + this.counterService.count);
    this.userService.setToInactive(id);
  }
}
