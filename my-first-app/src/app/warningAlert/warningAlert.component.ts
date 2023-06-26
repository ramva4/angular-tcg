import { Component } from '@angular/core';

@Component({
    selector: 'app-warning_alert',
    template: '<h3>WARN: {{ warning_text }} </h3>',
    styles: [ `h3 {
        color: orange;
    }` ]
})
export class WarningAlertComponent {
    warning_text: string = 'This is a warning!'
}