import { Injectable } from "@angular/core";
import { CounterService } from "./counter.service";

@Injectable()
export class UsersService {
    activeUsers = [ 'Jambu', 'Swami'];
    inactiveUsers = ['Vaidehi' ];

    constructor(private counterService: CounterService) {}

    activateUser(idx: number) {
        this.activeUsers.push(this.inactiveUsers[idx]);
        this.inactiveUsers.splice(idx, 1);
    }

    deactivateUser(idx: number) {
        this.inactiveUsers.push(this.activeUsers[idx]);
        this.activeUsers.splice(idx, 1);
    }
}