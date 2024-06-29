import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from '../../../../../../src/app/services/db.service';
@Component({
  selector: 'app-createaction',
  templateUrl: './createaction.component.html',
  styleUrls: ['./createaction.component.scss'],
  encapsulation: ViewEncapsulation.None

})


export class CreateactionComponent implements OnInit {
  allactions: any = [];
  id: number;
  grid = true;
  constructor(private route: ActivatedRoute, public db: DbService, public router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {

      const id = paramMap.get('id');
      if (id) {

        this.id = Number(id);
      }
    });
    this.getAction();
  }
  getAction(): void{
    this.db.list('actionflow/', {bot_id: this.id}, ((response): void => {

      this.allactions = response;
    }));
  }

  onclickaction()
  {
    this.allactions[0].responses;

    // this.action
    const actions = {
      action: this.allactions
    };
    // this.router.navigate(['botflow/slot/'+ this.id, {}]);

    // if(this.id == this.id){

    this.db.store('ActionStore/', actions, (response): void => {

      this.router.navigate(['botflow/slot/' + this.id, {}]);

    });

  }
}
