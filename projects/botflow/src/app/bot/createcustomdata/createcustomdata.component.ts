import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from '../../../../../../src/app/services/db.service';
@Component({
  selector: 'app-createcustomdata',
  templateUrl: './createcustomdata.component.html',
  styleUrls: ['./createcustomdata.component.scss']
})


export class CreatecustomdataComponent implements OnInit {
  id: number;
  customdata: any;
  grid = true;
  custom = { key: 'value 1', value: 'value 2', keyThree: 'value 3' };


  constructor(private route: ActivatedRoute, public db: DbService, public router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {

      const id = paramMap.get('id');
      if (id) {

        this.id = Number(id);
      }
    });
    this.getCustomdata();
  }

  getCustomdata(): void {
    this.db.postpy('bot/customdata/', { bot_id: this.id }, ((response): void => {

      this.customdata = response;
      this.customdata = Object.keys(response)
        .map(key => ({ key, value: response[key] }));

      // console.log(this.customdata);
    }));
  }


  savecustomdata() {

    this.custom;
    this.customdata;
    const result = {};
    try {
      this.customdata.forEach((element, index) => {
        if (element.value == null) {
          // throw 'null' + element.key;
        } else {
          result[element.key] = element.value;
        }
      });

      const data = {
        customdata: JSON.stringify(result),
        bot_id: this.id,
        user_id: this.db.profile.id,
        app_id: this.db.profile.app_id,
      };

      this.db.postpy('bot/saveFlowandCustomdata/', data, (response): void => {
        alert('done');
      });

    } catch (err) {
      alert(err);
    }

  }

}

