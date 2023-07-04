import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class CounterService {
    countMap = new Map();

    increment(counter: string) {
        const count = this.countMap.get(counter) ? this.countMap.get(counter)  + 1 : 1;
        this.countMap.set(counter, count);
    }

    getCount(counter: string): number {
        return this.countMap.get(counter) ? this.countMap.get(counter) : 0;
    }
}