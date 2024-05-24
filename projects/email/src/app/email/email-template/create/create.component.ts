
import { Component, OnInit, ViewChild } from '@angular/core';
import { DbService } from '../../../../../../../src/app/services/db.service';
import { EmailTemplateComponent } from '../email-template.component';
import { ActivatedRoute } from '@angular/router';
// import { EmailEditorComponent } from 'angular-email-editor';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  // @ViewChild(EmailEditorComponent)
  // private emailEditor: EmailEditorComponent;
  constructor(public db: DbService, public et: EmailTemplateComponent, public route: ActivatedRoute) { }
  // message: any;
  message = { template_name: '', template_type: '', message: '', template_area: '', sended_by: '', id: '', subject: '', design: '' };
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


  // called when the editor is created
  editorLoaded(evt) {
    console.log('editorLoaded');
    // load the design json here
    // this.emailEditor.editor.loadDesign({});
  }

  // called when the editor has finished loading
  editorReady(evt) {
    console.log('editorReady');
  }

  // saveDesign() {
  //   debugger;
  //   this.emailEditor.editor.saveDesign((data) => {
  //     // console.log('saveDesign', data);
  //     return data;
  //   }
  //   );
  // }


  LoadTemplates(id): void {
    debugger;
    this.db.list('email/email-templates/', { id: id }, ((response): void => {
      debugger;
      if (response.length === 1) {
        debugger;
        this.message = response[0];
        // this.emailEditor.editor.loadDesign(this.message.message);
        // this.emailEditor.loadDesign(this.message.message)

      } else {
        this.isEditTemplate = false;
        this.message = { template_name: '', template_type: '', message: '', template_area: '', sended_by: '', id: '', subject: '', design: '' };
      }
    }));
  }




  // onSaveMessageTemplate(): void {
  //   debugger;
  //   this.emailEditor.editor.exportHtml((data) => {
  //     debugger;
  //     this.message.message = data.html;
  //     this.emailEditor.editor.saveDesign((data) => {
  //       this.message.design = data
  //       debugger;
  //       this.db.store('email/email-templates/', this.message, ((response): void => {
  //         this.et.LoadTemplates();
  //       }));
  //     });
  //   }
  //   );


  // }

  // onUpdateMessageTemplate(): void {
  //   this.emailEditor.editor.exportHtml((data) => {
  //     this.message.message = data.html;
  //     this.emailEditor.editor.saveDesign((data) => {
  //       this.message.design = data
  //       this.db.update('email/email-templates/', this.message.id, this.message, ((response): void => {
  //         this.et.LoadTemplates();
  //       }));
  //     });
  //   })
  // }

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
