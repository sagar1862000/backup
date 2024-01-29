
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.scss']
})

export class BotComponent implements OnInit {
  bot: any = [];
  constructor(public router: Router) { }

  ngOnInit(): void {
    // alert('hii');
    this.getbot();
  }

  getbot(): void {
    this.bot;
    // if (this.bot.length == 0) {
    //   this.router.navigate(['botflow/bot/new', {}]);
    // }
  }




}
