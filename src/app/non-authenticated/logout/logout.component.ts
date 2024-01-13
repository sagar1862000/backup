import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';
declare var $: any;
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})


export class LogoutComponent implements OnInit {
  // route: any;
  href: string;
  Url: string;
  constructor(private router: Router, public db: DbService, private route: ActivatedRoute) { }

  ngOnInit() {
    const a = this.db.getPreviousUrl();
    // this.db.list('getrecruiterdata/', null, (response): void => {
    // });



    // this.db.list('logout/', null, (response): void => {
      localStorage.removeItem('token');
      this.router.navigate(['login']);
    // });
    // this.router.navigate(['login'], { queryParams: { returnurl: a } });

  }

}
