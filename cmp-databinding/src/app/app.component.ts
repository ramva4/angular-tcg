import { Component, ViewEncapsulation } from '@angular/core';
import { Event } from './model/event';
//import { Event } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  serverElements = [{ type: 'server', name: 'Testserver', content: 'Just a test!' }];
  oddComponents: Event[] = [];
  evenComponents = [];


  onServerAdded(serverData: { serverName: string, serverContent: string }) {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }

  eventReceived(event: number) {
    if (event % 2 == 0)
      this.evenComponents.push(new Event(event, 'even'))
    else this.oddComponents.push(new Event(event, 'odd'))
    console.log(this.oddComponents);
    console.log(this.evenComponents);
  }


  onChangeFirst() {
    this.serverElements[0].name = 'Changed!';
  }

  onDestroyFirst() {
    this.serverElements.splice(0, 1);
  }
}
