import { Component } from '@angular/core';
import { StorageAccessService } from '../shared/storage-access.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(private serverAccessService: StorageAccessService) { }

  onSaveData() {
    this.serverAccessService.saveRecipes();
  }

  onFetchData() {
    this.serverAccessService.fetchRecipes().subscribe();
  }
}