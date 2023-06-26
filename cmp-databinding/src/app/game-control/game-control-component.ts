import { Component, EventEmitter, Output } from '@angular/core';


@Component({
    selector: 'app-game-control',
    templateUrl: './game-control-component.html'
})
export class GameControlComponent {
    eventNum: number = 0;
    isStarted: boolean = false;
    intervalTimer;
    @Output('eventEmit')
    eventEmit = new EventEmitter<number>();


    onStart() {
        this.isStarted = true;
        this.intervalTimer = setInterval(() => { this.eventEmit.emit(this.eventNum++); }, 1000)
    }

    onStop() {
        this.isStarted = false;
        clearInterval(this.intervalTimer);
    }

}