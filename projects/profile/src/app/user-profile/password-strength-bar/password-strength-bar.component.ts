import { Component, OnChanges, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-password-strength-bar',
  templateUrl: './password-strength-bar.component.html',
  styleUrls: ['./password-strength-bar.component.scss']
})
export class PasswordStrengthBarComponent implements OnChanges {
  // static variationCount: number;
  static variations: any;


  @Input() passwordToCheck: any;
  @Input() barLabel: any;
  bar0: any;
  bar1: any;
  bar2: any;
  bar3: any;
  bar4: any;
  // variationCount:any;
  private colors = ['#FF0000', '#FF3300', '#ff9900', '#00FF00', '#006400'];

  private static measureStrength(pass: string) {
    let score = 0;
    // award every unique letter until 5 repetitions
    const letters: any = {};
    for (let i = 0; i < pass.length; i++) {
      letters[pass[i]] = (letters[pass[i]] || 0) + 1;
      score += 5.0 / letters[pass[i]];
    }
    // bonus points for mixing it up
    const variations = {
      digits: /\d/.test(pass),
      lower: /[a-z]/.test(pass),
      upper: /[A-Z]/.test(pass),
      nonWords: /\W/.test(pass),
    };

    let variationCount: any;
    for (const check in variations) {
      variationCount += (this.variations[check]) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;
    return Math.trunc(score);
  }

  private getColor(score: number) {
    let idx = 0;
    if (score > 90) {
      idx = 4;
    } else if (score > 70) {
      idx = 3;
    } else if (score >= 40) {
      idx = 2;
    } else if (score >= 20) {
      idx = 1;
    }
    return {
      idx: idx + 1,
      col: this.colors[idx]
    };
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    const password = changes['passwordToCheck'].currentValue;
    this.setBarColors(5, '#DDD');
    if (password) {
      const c = this.getColor(PasswordStrengthBarComponent.measureStrength(password));
      this.setBarColors(c.idx, c.col);
    }
  }
  private setBarColors(count: any, col: any) {
    for (let _n = 0; _n < count; _n++) {
      // this['bar' + _n] = col;
    }
  }


}