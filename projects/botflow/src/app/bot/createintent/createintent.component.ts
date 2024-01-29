import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from '../../../../../../src/app/services/db.service';

@Component({
  selector: 'app-createintent',
  templateUrl: './createintent.component.html',
  styleUrls: ['./createintent.component.scss']
})
  
export class CreateintentComponent implements OnInit {
  grid = true;
  allintent: any;
  id: number;

  IntentName: any;
  DisplayName: any;
  IntentResponse: any;
  UseIn: any;
  intent: any;
  constructor(private route: ActivatedRoute, public db: DbService, public router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {

      const id = paramMap.get('id');
      if (id) {

        this.id = Number(id);
      }
    });
    this.getIntentFlow();
  }
  getIntentFlow(): void{
    this.db.list('intentflow/', {bot_id: this.id}, ((response): void => {

      this.allintent = response;
  }));
}
onclickIntent()
{
  const Intent = {
    Intent: this.allintent
  };

  this.db.store('IntentStore/', Intent, (response): void => {

    this.router.navigate(['botflow/action/' + this.id, {}]);

  });

}
}

  