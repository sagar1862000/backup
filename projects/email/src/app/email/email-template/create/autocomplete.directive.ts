import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

@Directive({
  selector: '[appAutocomplete]'
})
export class AutocompleteDirective implements OnInit {
  @Input() options: string[] = [];

  constructor(private el: ElementRef, private matAutocompleteTrigger: MatAutocompleteTrigger) { }

  ngOnInit() {
    this.matAutocompleteTrigger.panelClosingActions.subscribe(() => {
      const value = this.el.nativeElement.value;
      if (this.options.includes(value)) {
        this.el.nativeElement.value = `{${value}}`;
      }
    });
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    if (value.includes('{')) {
      this.matAutocompleteTrigger.openPanel();
    }
  }
}
