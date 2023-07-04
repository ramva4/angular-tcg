import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/users.service';
import { CounterService } from '../shared/counter.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html'
})
export class ActiveUsersComponent implements OnInit {
  users: string[];

  constructor(private userService: UsersService, public counterService: CounterService) {    
  }

  ngOnInit() {
    this.users = this.userService.activeUsers;
  }

  onSetToInactive(id: number) {
    this.userService.deactivateUser(id);
    this.counterService.increment('deactivate');
  }
}
