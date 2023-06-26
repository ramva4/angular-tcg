import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'recipe-shopping';
  currentSelection: string = 'recipe';
  
  switchView(viewName: string) {
    this.currentSelection = viewName;
  }
}
