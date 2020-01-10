import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  activeUsers: string[] = ['Max', 'Philip'];
  inactiveUsers: string[] = ['Jane', 'Joan'];

  constructor() {
  }

  setToInactive(id: number) {
    console.log('toInactive: ' + id);

    this.inactiveUsers.push(this.activeUsers[id]);
    this.activeUsers.splice(id, 1);
  }

  setToActive(id: number) {
    console.log('toActive: ' + id);
    this.activeUsers.push(this.inactiveUsers[id]);
    this.inactiveUsers.splice(id, 1);
  }
}
