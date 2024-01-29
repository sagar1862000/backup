import { Component, OnInit } from '@angular/core';
import { DbService } from '../../../../../../../src/app/services/db.service';
import { MessageTemplatesComponent } from '../message-templates.component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {

  constructor(public db: DbService, public mt: MessageTemplatesComponent, public route: ActivatedRoute) { }
  // message: any;
  message = { template_name: '', template_type: '', message: '', template_area: '', sended_by: '', id: '', dlt_te_id: null };
  isEditTemplate: boolean = false
  Template_Category: any;
  selectedValueStatus: any;
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    debugger;
    if (id !== null) {
      this.isEditTemplate = true;
      this.LoadTemplates(id);
    }
  }

  LoadTemplates(id): void {
    debugger;
    this.db.list('sms/sms-templates/', { id: id }, ((response): void => {
      if (response.length === 1) {
        this.message = response[0];
      } else {
        this.isEditTemplate = false;
        this.message = { template_name: '', template_type: '', message: '', template_area: '', sended_by: '', id: '', dlt_te_id: null };
      }
    }));
  }
  onSaveMessageTemplate(): void {
    this.db.store('sms/sms-templates/', this.message, ((response): void => {
      this.mt.LoadTemplates();
    }));
  }

  onUpdateMessageTemplate(): void {
    this.db.update('sms/sms-templates/', this.message.id, this.message, ((response): void => {
      this.mt.LoadTemplates();
    }));
  }

  checkWhatsInput(): void {
    this.message.template_name;
    const words = this.message.template_name.split(' ')
    // for txt in words
    let test = []
    for (let i = 0; i < words.length; i++) {
      const keywordRegex = /\{\s+/;
      // const data = keywordRegex.test(words[i])
      // test.push(data);

      if (words[i].includes('{') && !words[i].includes('}')) {
        console.log('Data :' + words[i]);
      } else {
        console.log("simple:" + words[i])
      }
    }
    // debugger;


    if (this.message.template_name.includes('{') && this.message.template_name.includes('}')) {
      // The inputString contains curly braces, do nothing
      console.log('Data contains curly braces.');
    } else {
      // The inputString does not contain curly braces, call your function
      // this.yourFunction();
      console.log(this.message.template_name)
    }

    // const regex = /\{([^}]+)\}/g;
    // const matches = this.message.template_name.match(regex);
    // let extractedKeywords = []
    // if (matches) {
    //   // Extracted keywords will be available in matches array
    //   extractedKeywords = matches.map(match => match.slice(1, -1));
    // } else {
    //   extractedKeywords = [];
    // }
    // debugger;
    // extractedKeywords;
  }

}
