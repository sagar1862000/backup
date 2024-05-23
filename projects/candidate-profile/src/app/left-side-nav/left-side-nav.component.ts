import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-left-side-nav',
  templateUrl: './left-side-nav.component.html',
  styleUrls: ['./left-side-nav.component.css'],
})
export class LeftSideNavComponent {
  experienceText = 'Experience';
  @Output() newItemEvent = new EventEmitter<string>();
  GettingValue(Type: any) {
    // console.log('Type : ' , Type);
    this.newItemEvent.emit(Type);
  }
}