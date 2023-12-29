import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-primary-ui',
  templateUrl: './primary-ui.component.html',
  styleUrls: ['./primary-ui.component.scss']
})
export class PrimaryUiComponent {

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  getBodyClass() {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    }
    else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body md screen'
    }

    return styleClass;
  }

}
