import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-first-app';

  createServerDisabled: boolean = true;
  detailsDisplayed: boolean = false;
  serverStatus: string = '';
  serverName: string = '';
  clickTimestamps: any[] = [];

  userName: string = '';

  constructor() {
    setTimeout(() => {
      this.createServerDisabled = false;
    }, 2000);
    console.log()
  }

  onCreateServer() {
    this.serverStatus = this.serverName + ' added';
    this.serverName = '';
  }

  onServerNameEntry(event: Event) {
    console.log(event);
    this.serverName = (<HTMLInputElement>event.target).value;
  }

  displayDetails() {
    this.detailsDisplayed = !this.detailsDisplayed;
    this.clickTimestamps.push(new Date());
  }

  getStyle(ts: number) {
    return ts > 3
      ? {'background-color': 'blue'} : {};
  }
}
