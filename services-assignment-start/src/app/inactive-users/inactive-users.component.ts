import { Component } from '@angular/core';
import { CounterService } from '../shared/counter.service';
import { UsersService } from '../shared/users.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html'
})
export class InactiveUsersComponent {
  users: string[];

  constructor(private userService: UsersService, public counterService: CounterService) {}

  ngOnInit() {
    this.users = this.userService.inactiveUsers;
  }

  onSetToActive(id: number) {
    this.userService.activateUser(id);
    this.counterService.increment('activate');
  }
 
}
