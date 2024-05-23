import { Component, OnInit } from '@angular/core';
import { DbService } from '../../../../../src/app/services/db.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})

export class EmailComponent implements OnInit {
  constructor(public db: DbService, private router: Router) { }
  childc: boolean = false;
  ngOnInit(): void {
  }
  change(): void {
    this.router.navigate(['email', 'email-template']);
  }
}
