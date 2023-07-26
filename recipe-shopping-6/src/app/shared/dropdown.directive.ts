import { Directive, HostBinding, HostListener, ElementRef } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    @HostBinding('class.open') menuOpened: boolean;

    constructor(private elRef: ElementRef) {}

    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.menuOpened = this.elRef.nativeElement.contains(event.target) ? !this.menuOpened : false;
      }

    /* @HostListener('click') mouseClick() {
        this.menuOpened = !this.menuOpened;
    } */
}