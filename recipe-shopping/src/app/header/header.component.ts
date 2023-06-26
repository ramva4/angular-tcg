import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Output() menuSelectionChange = new EventEmitter<string>();
  @Input() currentSelection: string = 'recipe';

  
  onSelectionChange(selection: string) {
    if (selection !== this.currentSelection) this.menuSelectionChange.emit(selection);
  }
}
