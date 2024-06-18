import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public currentdate: Date = new Date();
  public Botshreyasi: string = "https://botshreyasi.com";
  public support: string = "https://botshreyasi.com";

  constructor() { }

  ngOnInit() {
  }

}
