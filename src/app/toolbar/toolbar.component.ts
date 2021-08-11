import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  fixedHeader: boolean = false

  @HostListener('window:scroll', ['$event']) onScroll() {
    if (window.scrollY > 50) {
      this.fixedHeader = true
    } else {
      this.fixedHeader = false
    }
  }

}
