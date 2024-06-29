import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { isArray } from 'lodash';
import html2canvas from 'html2canvas';
declare var pdfMake: any;

@Component({
  selector: 'app-circular-progress',
  templateUrl: './circular-progress.component.html',
  styleUrls: ['./circular-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class CircularProgressComponent implements OnInit {

  @Input() chartTitle: string;
  docDefinition: any;
  set Circulartitle(Circulartitle: any) {
    this.chartTitle = Circulartitle;
  }
  // @Input() chartColors: string[];
  chartData: any;
  chartColors: any;
  allChartData: any;
  @Input()
  set CircularColors(CircularColors: any) {
    this.chartColors = CircularColors;

  }
  @Input()
  set CircularData(CircularData: any) {
    this.chartData = CircularData;
  }

  // @Input() allChartData: column[];

  @Input()
  set allCircularData(allCircularData: any) {
    this.allChartData = allCircularData;
    this.ngOnInit();
  }

  circleArray: circle[] = [
    {
      vector: 'M18 3 a 15 15 0 0 1 0 30 a 15 15 0 0 1 0 -30',
      circumferance: 93,
    },
    {
      vector: 'M18 5 a 13 13 0 0 1 0 26 a 13 13 0 0 1 0 -26',
      circumferance: 80.4,
    },
    {
      vector: 'M18 7 a 11 11 0 0 1 0 22 a 11 11 0 0 1 0 -22',
      circumferance: 68,
    },
  ];

  dashArray: Array<number[]>;
  totalValue: number;
  ngOnInit() {
    setTimeout(() => {
      // Charts are now rendered
      const chartdata = document.getElementById('chartdata');
      html2canvas(chartdata, {
        height: 500,
        width: 1000,
        scale: 3,
        backgroundColor: null,
        logging: false,
        onclone: (document) => {
          document.getElementById('chartdata').style.visibility = 'visible';
        }
      }).then((canvas) => {
        // Get chart data so we can append to the pdf
        const chartData = canvas.toDataURL();
        // Prepare pdf structure
        const docDefinition = { content: [],
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
        const title = {text: 'Here is the export of charts to the PDF', style: 'subheader'};
        const description = {text: 'Some description', style: 'subsubheader'};
        docDefinition.content.push(title);
        docDefinition.content.push(description);
        // Push image of the chart
        docDefinition.content.push({image: chartData, width: 500});

        this.docDefinition = docDefinition;

        // pdfMake.createPdf(docDefinition).download('chartToPdf' + '.pdf');
      });
    }, 1100);
    this.totalValue = this.getTotalValue();
    this.dashArray = this.getStrokeDashArray();

  }

  getStrokeDashArray(): Array<number[]> {
    const result: Array<number[]> = [];
    for (let i = 0; i < this.chartData.length; i++) {
      // let percent = Math.round((this.chartData[i].Value / this.allChartData[i].Value) * 100);
      const percent = Math.floor(
        (this.chartData[i].Value / this.allChartData[i].Value) * 100
      );
      this.chartData[i].percentage = percent;
      const percentageValue = (percent * this.circleArray[i].circumferance) / 100;
      const resultArray = [percentageValue, this.circleArray[i].circumferance];

      result.push(resultArray);
    }

    console.log(result); return result;
  }

  getTotalValue(): number {
    let result = 0;
    for (let i = 0; i < this.chartData.length; i++) {
      result = result + this.chartData[i].Value;
    }

    return result;

  }

  downloadChart() {
    // Download PDF

    if (this.docDefinition) {

        pdfMake.createPdf(this.docDefinition).download('chartToPdf' + '.pdf');

    } else {
      console.log('Chart is not yet rendered!');

    }

  }
}

export class column {
  Name: string;
  Value: number;
  percentage?: number;
}

export class circle {
  vector: string;
  circumferance: number;
}
