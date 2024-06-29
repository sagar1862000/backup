import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DbService } from '../../../../../../src/app/services/db.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-createbot',
  templateUrl: './createbot.component.html',
  styleUrls: ['./createbot.component.scss']
})

export class CreatebotComponent implements OnInit {
  public Editor = ClassicEditor;
  bot: any = { bot_name: '', Published: 'No'};
  id: any;
  constructor(private route: ActivatedRoute, private db: DbService, public router: Router, private location: Location) { }

  ngOnInit(): void {


    this.route.paramMap.subscribe(paramMap => {

      const id = paramMap.get('id');
      if (id != 'new') {

        this.id = Number(id);

        this.getBot();
      }else{
        this.id = id;
      }

    });
  }
  createbotapply()
  {
    this.db.store('Createbotapply/', this.id, (response): void => {

      this.router.navigate(['campaign/flow/' + response.id , {}]);
  });
  }
  getBot(): void{
    this.db.list('getbot/', {id : this.id}, (response): void => {
    this.bot = response;
     });
  }
  onclickClose()
  {
    this.location.back();
  }

  onclickcreateBotSaveandClose()
  {
    this.db.store('CreateBotSaveandClose/', this.id, (response): void => {

    // this.router.navigate(['campaign/flow/'+response.id , {}]);
  });

    this.location.back();

  }
  launchflow(){

if (this.id == 'new'){

      this.db.store('bot/bot-details/', this.bot, (response): void => {

      this.router.navigate(['botflow/intent/' + response.id, {}]);

    });
  }else{
    this.id = Number(this.id);

    this.router.navigate(['botflow/intent/' + this.id, {}]);

  }



  }



}
