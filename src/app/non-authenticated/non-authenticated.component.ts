import { Component } from '@angular/core';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-non-authenticated',
  templateUrl: './non-authenticated.component.html',
  styleUrls: ['./non-authenticated.component.scss']
})
export class NonAuthenticatedComponent {
  constructor(public db: DbService) { }
  public todayDate: Date = new Date();
}