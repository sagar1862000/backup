import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from '../../../../../../src/app/services/db.service';
@Component({
  selector: 'app-createslot',
  templateUrl: './createslot.component.html',
  styleUrls: ['./createslot.component.scss']
})


export class CreateslotComponent implements OnInit {
  grid = true;
  allslot: any;
  id: number;

  constructor(private route: ActivatedRoute, public db: DbService, public router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {

      const id = paramMap.get('id');
      if (id) {

        this.id = Number(id);
      }
    });
    this.getSlot();
  }
  getSlot(): void{
    this.db.list('slotflow/', {bot_id: this.id}, ((response): void => {

      this.allslot = response;
    }));
  }



  addnew(slotitms): void {

      this.allslot.push({
        id: '',
        managersid: '',
        event_name: '',
        event_limit: '',
      });

  }
  onclickSlot()
  {
    const slot = {
      slot: this.allslot
    };


    this.db.store('SlotStore/', slot, (response): void => {

      this.router.navigate(['botflow/flow/' + this.id, {}]);

    });

  }



}

