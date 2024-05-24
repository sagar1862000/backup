
import { Component, OnInit } from '@angular/core';
import { DbService } from '../../../../../src/app/services/db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})

export class MessageComponent implements OnInit {
  constructor(public db: DbService, private router: Router) {}
  childc: boolean = false;
  ngOnInit(): void {
  }
  change(): void {
    this.router.navigate(['message', 'message-template']);
  }
}