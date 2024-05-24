import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class BubblechartService {
  constructor() { }
  private sharedData: Subject<any> = new Subject<any>();
  sharedData$: Observable<any> = this.sharedData.asObservable();


  dataset: any
  nodes: any
  setData(updatedData) {

    this.sharedData.next(updatedData);
    this.dataset = updatedData;

  }

  renderChart() {
    let diameter = 100;
    let height = 300;
    let width = 300;
    let width2 = 200;
    let color = d3.scaleOrdinal(d3.schemeCategory10);
    
    let bubble = d3.pack().size([width, height]).padding(1.5);
    $("#bubblechart").empty();
    let svg = d3
      .select('#bubblechart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'bubble');


    let nodes = d3.hierarchy(this.dataset).sum(function (d: any) {

      return d.Count;
    });

    let node = svg
      .selectAll('.node')
      .data(bubble(nodes).descendants())
      .enter()
      .filter(function (d) {

        return !d.children;
      })

      .append('g')
      .attr('class', 'node')
      .attr('transform', function (d) {
        return 'translate(' + d.x + ',' + d.y + ')';
      })
      .style('fill', function (d, i: any) {
        return color(i);
      });


    node.append('title').text(function (d: any) {

      return d.data.Name + ': ' + d.data.Count;
    });

    node
      .append('circle')
      .attr('x', function (d) {
        return d.x;
      })
      .attr('y', function (d) {
        return d.y;
      })
      .attr('r', function (d) {
        return d.r;
      })
      .style('fill', function (d, i: any) {
        return color(i);
      });

    node
      .append('text')
      .attr('dy', '.2em')
      .style('text-anchor', 'middle')
      .text(function (d: any) {

        return d.data.Name.substring(0, d.r / 3);
      })
      .attr('font-family', 'sans-serif')
      .attr('font-size', function (d) {

        return d.r / 5;
      })
      .attr('fill', 'white');

    node
      .append('text')
      .attr('dy', '1.3em')
      .style('text-anchor', 'middle')
      .text(function (d: any) {

        return d.data.Count;
      })

      .attr('font-family', 'Gill Sans')
      .attr('font-size', function (d) {
        return d.r / 4;
      })
      .attr('fill', 'white');

    // d3.select(self.frameElement)
    //   .style("height", height + "px")
    //   .style("width", width2 + "px");;
  }
}
