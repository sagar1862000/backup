import { T } from '@angular/cdk/keycodes';
import { AfterViewInit, Component, Input, OnInit, ChangeDetectionStrategy, ElementRef, ViewChild } from '@angular/core';
import { isArray } from 'lodash';
import { DbService } from 'src/app/db.service';
import * as d3 from 'd3';
import d3Tip from 'd3-tip'; // works
import html2canvas from 'html2canvas';
declare var pdfMake: any;
// var PDF.vfs = PDF_Fonts.pdfMake.vfs;



@Component({
  selector: 'app-bargraph',
  templateUrl: './bargraph.component.html',
  styleUrls: ['./bargraph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BargraphComponent implements OnInit, AfterViewInit {
  _data: any;
  docDefinition: any;
  @Input() chartColors: string[];

  @Input()
  set clickvalue(clickvalue: any) {

    // if (isArray(Datashow)) {

    // this._Datashow = data;
    this.printPage()


    // this.rating(this.data)
    // }
  }
  // @Input("barData") public data;
  @ViewChild('viewcontainer') container: ElementRef;

  Rating: any = {};
  _Datashow: any;
  @Input()
  set Datashow(data: any) {
    
    // if (isArray(Datashow)) {

    this._Datashow = data;


    // this.rating(this.data)
    // }
  }
  @Input()
  set barData(data: any) {
    
    if (isArray(data)) {
      this._data = data;
      this.Bragraph();
    }
  }
  @Input('title') public title;
  public chartId;
  private highestValue: string;
  private svg;
  private margin = 100;
  private width = 700 - this.margin * 2;
  private height = 600 - this.margin * 2;
  constructor(private d3: DbService) {
    this.chartId = this.d3.generateId(5);
  }
  rating(data) {
    const result = data.map(person => ({ value: person.Average_Rating, name: person.id }));
    // console.log(result);
    const count = function (ary, classifier) {
      classifier = classifier || String;
      return ary.reduce(function (counter, item) {
        const p = classifier(item);
        counter[p] = counter.hasOwnProperty(p) ? counter[p] + 1 : 1;
        return counter;
      }, {});
    };
    const Rating = count(result, function (item) {
      return item.value;
    });

    this.Rating = Object.keys(Rating)
      .map(key => ({ Rating: Number(key), value: Rating[key] }));

    // console.log(this.Rating);

    this.Bragraph();
    // console.log(this.Rating);

  }
  ngOnInit(): void {

  }
  SetData(): void {

    setTimeout(() => {
      // Charts are now rendered
      const chart = document.getElementById('chart');
      html2canvas(chart, {
        height: 500,
        width: 1000,
        scale: 3,
        backgroundColor: null,
        logging: false,
        onclone: (document) => {
          document.getElementById('chart').style.visibility = 'visible';
        }
      }).then((canvas) => {
        // Get chart data so we can append to the pdf
        const chartData = canvas.toDataURL();
        // Prepare pdf structure

        const docDefinition = {
          content: [],
          styles: {
            tableHeader: {
              bold: true,
              fontSize: 13,
              color: 'black'
            },
            subheader: {
              fontSize: 16,
              bold: true,
              margin: [0, 10, 0, 5],
              alignment: 'left'
            },
            subsubheader: {
              fontSize: 12,
              italics: true,
              margin: [0, 10, 0, 25],
              alignment: 'left'
            },
            table: {
              margin: [0, 5, 0, 15]
            }
          },
          defaultStyle: {
            // alignment: 'justify'
          },
          pageOrientation: 'landscape',
        };

        // Add some content to the pdf
        const title = { text: 'Here is the export of charts to the PDF', style: 'subheader' };
        const description = { text: 'Some description', style: 'subsubheader' };
        docDefinition.content.push(title);

        docDefinition.content.push(description);

        // Push image of the chart
        docDefinition.content.push({ image: chartData, width: 500 });
        this.docDefinition = docDefinition;

        // pdfMake.createPdf(docDefinition).download('chartToPdf' + '.pdf');
      });
    }, 1100);
    // determining highest value

    // determining highest value

  }
  Bragraph() {


    let highestCurrentValue = 0;
    const tableLength = this._data.length;

    this._data.forEach((data, i) => {

      const barValue = Number(data.value);
      if (barValue > highestCurrentValue) {

        highestCurrentValue = barValue;

      }

      if (tableLength == i + 1) {
        this.highestValue = highestCurrentValue.toString();

      }
    });
    this.SetData();
    this.CreateBars();
  }
  ngAfterViewInit(): void {
    //   this.CreateBars();
  }
  CreateBars(): void {
    this.createSvg();
    this.drawBars(this._data);

  }

  private createSvg(): void {
    $('#chart').empty();
    this.svg = this.d3.d3.select('div#chart').append('svg').attr('viewBox', `0 0 ${this.width + this.margin * 2} ${this.height + this.margin * 2}`).append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');

  }

  private drawBars(data: any[]): void {

    const x = this.d3.d3
      .scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.name))
      .padding(0.2);
    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(this.d3.d3.axisBottom(x))
      // .selectAll('text')
      // .attr('transform', 'translate(-10, 0)rotate(-45)')
      // .style('text-anchor', 'end')
      .style('font-size', '0px');

    // Creaate Y-axis band scale
    const y = this.d3.d3
      .scaleLinear()
      .domain([0, Number(this.highestValue)])
      .range([this.height, 0]);
    // + 50

    // Draw the Y-axis on the DOM
    this.svg
      .append('g')
      .call(this.d3.d3.axisLeft(y))
      .selectAll('text')
      .style('font-size', '30px');

    // Create and fill the bars
    this.svg
      .selectAll('bars')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.name))
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d =>
        y(d.value) <= this.height ? this.height - y(d.value) : this.height
      )
      .attr('fill', d => d.color);

    this.svg
      .selectAll('text.bar')
      .data(data)
      .enter()
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('fill', '#70747a')
      .attr('x', d => x(d.name) + 20)
      .attr('y', d => y(d.value))
      .style('font-size', '30px')
      .text(d => Math.round(d.value * 100) / 100);
    const tip = d3Tip()

    tip
      .attr("class", "d3-tip")
      .html(d => {
        return (
          `<strong>Frequency:</strong> <span style="color:red">` + d.frequency + "</span>"
        )
      })

  }






  printPage() {
    window.print();
  }






  async showPdf() {
    const docDefinition = {
      content: [
        {
          text: 'PDF Generated with Image from external URL',
          fontSize: 20,
        },
        {
          image: await this.getBase64Image(),
        },
      ],
    };
    // pdfmake.createPdf(docDefinition).open();
  }
  getBase64Image() {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const svgElement: SVGGraphicsElement =
        document.querySelector('.apexcharts-svg');
      const imageBlobURL =
        'data:image/svg+xml;charset=utf-8,' +
        encodeURIComponent(svgElement.outerHTML);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
      };
      img.onerror = (error) => {
        reject(error);
      };
      img.src = imageBlobURL;
    });
  }
  downloadChart() {
    // Download PDF

    if (this.docDefinition) {

      pdfMake.createPdf(this.docDefinition).download('chartToPdf' + '.pdf');

    } else {

      // console.log('Chart is not yet rendered!');

    }

  }
}
