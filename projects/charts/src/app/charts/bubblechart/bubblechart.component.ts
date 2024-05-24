import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { isArray } from 'jquery';
import { DbService } from 'src/app/services/db.service';
import { BubblechartService } from './bubblechart.service';
import { TreemapserviceService } from './treemapservice.service';

@Component({
  selector: 'app-bubblechart',
  templateUrl: './bubblechart.component.html',
  styleUrls: ['./bubblechart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class BubblechartComponent implements OnInit {
  _data: any;
  public dynHeight = 300;
  direction = 100;
  bubbledata: any = {}
  @Input()
  set data(data: any) {

    if (isArray(data)) {
      
      this._data = data;
      const key = 'children';
      // copybubble[key] = this.Bubbledata;
      this.bubbledata[key] = this._data;
      
      this.d3PackedBubbleChartService.setData(this.bubbledata);
      
      this.SetDataBubble();
    }
  }
  constructor(private d3PackedBubbleChartService: BubblechartService, private d3TreemapService: TreemapserviceService, public db: DbService) { }
  messagelog: any;
  SetDataBubble(): void {
    
    this.d3PackedBubbleChartService.renderChart();

    setInterval(() => {
      this.dynHeight += this.direction;
      if (this.dynHeight >= 800) {
        this.direction = -100;
      } else if (this.dynHeight <= 300) {
        this.direction = 100;
      }
    }, 1000);
  }
  ngOnInit() { }
}
