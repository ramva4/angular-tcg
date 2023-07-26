import { Component } from '@angular/core';
import { ServerAccessService } from '../shared/server-access.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  providers: [ServerAccessService]
})
export class HeaderComponent {
  constructor(private serverAccessService: ServerAccessService) { }

  onSaveData() {
    this.serverAccessService.saveRecipes();
  }

  onFetchData() {
    this.serverAccessService.fetchRecipes();
  }
}