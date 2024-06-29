import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DbService } from '../../../../../../../src/app/services/db.service';
import { EmailTemplateComponent } from '../email-template.component';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EmailServiceService } from '../../../email-service.service';
import { error } from 'jquery';
import { numbers } from '@material/dialog';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { ElementRef, HostListener } from '@angular/core';
import Mention from '@ckeditor/ckeditor5-mention/src/mention';
import { CKEditorComponent } from 'ng2-ckeditor';
import './plugin';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import SuggestionPlugin from './suggestion-plugin';
// import { CKEditor4 } from 'ckeditor4-angular/ckeditor';

declare const CKEDITOR: any;

// import { EmailEditorComponent } from 'angular-email-editor';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  public Editor: any = ClassicEditor;
  constructor(
    private cdr: ChangeDetectorRef,
    public db: DbService,
    public et: EmailTemplateComponent,
    public route: ActivatedRoute,
    public router: Router,
    public emailDb: EmailServiceService
  ) {}
  @ViewChild('ckeditor', { static: false }) ckeditor: CKEditorComponent;
  // @ViewChild(MatAutocompleteTrigger)
  @ViewChild('editor') editorElement!: ElementRef;

  autocompleteTrigger: MatAutocompleteTrigger;
  message = {
    template_name: '',
    template_type: '',
    message: '',
    template_area: '',
    sended_by: '',
    application_id: '1',
    user_id: '18',
    subject: '',
    design: '',
  };
  isEditTemplate: boolean = false;
  Template_Category: any;
  selectedValueStatus: any;
  id: any;
  suggestions: string[] = [];
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    debugger;
    if (this.id !== null) {
      this.isEditTemplate = true;
      this.LoadTemplates(this.id);
    }

    this.loadScript('https://cdn.ckeditor.com/4.22.1/standard-all/ckeditor.js')
      .then(() => {
        // Load your custom plugin script
        this.loadScript('./plugin.js')
          .then(() => {
            CKEDITOR.replace('myEditor', this.editorConfig);
          })
          .catch((error) => {
            console.error('Failed to load custom plugin script', error);
          });
      })
      .catch((error) => {
        console.error('Failed to load CKEditor script', error);
      });
  }

  public editorValue: any = '<p>Hello, world!</p>';
  public editorConfig: any = {
    extraPlugins: 'insertbuttonplugin,customlist',
    plugins:
      'autocomplete,textmatch,toolbar,wysiwygarea,basicstyles,link,undo,placeholder',
    allowedContent: true, // Allow all content
    extraAllowedContent: 'button[*]{*}(*) a[*]{*}(*) i[*]{*}(*)', // Specifically allow button elements with all attributes, styles, and classes
    toolbar: [
      {
        name: 'document',
        items: ['Undo', 'Redo'],
      },
      {
        name: 'basicstyles',
        items: ['Bold', 'Italic'],
      },
      {
        name: 'links',
        items: ['Link', 'Unlink'],
      },
      { name: 'insert', items: ['InsertButton'] },
      { name: 'insert', items: ['CustomListButton'] }, // Add custom button to toolbar
    ],
    on: {
      instanceReady: function (evt: any) {
        let itemTemplate =
          '<li data-id="{id}">' +
          '<div><strong class="item-title">{title}</strong></div>' +
          '<div><i>{description}</i></div>' +
          '</li>',
          outputTemplate = '[[{title}]]<span>&nbsp;</span>';
  
        let placeHolderObj = [
          {
            id: 1,
            name: 'address',
            title: 'Address',
            description: 'Customer Support correspondence address.',
          },
          {
            id: 2,
            name: 'assignee',
            title: 'Assignee Name',
            description: 'Ticket assignee name.',
          },
          {
            id: 3,
            name: 'deadline',
            title: 'Deadline Time',
            description: 'Utmost time to which technician should handle the issue.',
          },
          {
            id: 4,
            name: 'department',
            title: 'Department Name',
            description: 'Department name responsible for servicing this ticket.',
          },
        ];
  
        function textTestCallback(range: any) {
          console.log('range', range);
          if (!range.collapsed) {
            return null;
          }
          return CKEDITOR.plugins.textMatch.match(range, matchCallback);
        }
  
        function matchCallback(text: any, offset: any) {
          const pattern = /\[{2}([A-z]|\])*$/;
          const match = text.slice(0, offset).match(pattern);
          if (!match) {
            return null;
          }
          return { start: match.index, end: offset };
        }
  
        function dataCallback(matchInfo: any, callback: any) {
          const data = placeHolderObj.filter(function (item) {
            const itemName = '[[' + item.name + ']]';
            return itemName.indexOf(matchInfo.query.toLowerCase()) == 0;
          });
          callback(data);
        }
  
        let autocomplete = new CKEDITOR.plugins.autocomplete(evt.editor, {
          textTestCallback: textTestCallback,
          dataCallback: dataCallback,
          itemTemplate: itemTemplate,
          outputTemplate: outputTemplate,
        });
  
        // Override default getHtmlToInsert to enable rich content output.
        autocomplete.getHtmlToInsert = function (item: any) {
          return this.outputTemplate.output(item);
        };
      },
    },
  };

  //   public editorConfig: any = {
  //     extraPlugins: 'insertbuttonplugin,customlist',
  //     plugins:
  //       'autocomplete,textmatch,toolbar,wysiwygarea,basicstyles,link,undo,placeholder',
  //     allowedContent: true, // Allow all content
  //     extraAllowedContent: 'button[*]{*}(*) a[*]{*}(*) i[*]{*}(*)', // Specifically allow button elements with all attributes, styles, and classes
  //     toolbar: [
  //       {
  //         name: 'document',
  //         items: ['Undo', 'Redo'],
  //       },
  //       {
  //         name: 'basicstyles',
  //         items: ['Bold', 'Italic'],
  //       },
  //       {
  //         name: 'links',
  //         items: ['Link', 'Unlink'],
  //       },
  //       { name: 'insert', items: ['InsertButton'] },
  //       { name: 'insert', items: ['CustomListButton'] }, // Add custom button to toolbar
  //     ],
  //     on: {
  //       instanceReady: function (evt: any) {
  //         let itemTemplate =
  //             '<li data-id="{id}">' +
  //             '<div><strong class="item-title">{title}</strong></div>' +
  //             '<div><i>{description}</i></div>' +
  //             '</li>',
  //           outputTemplate = '{title}<span>&nbsp;</span>'; // Adjusted output template

  //         let placeHolderObj = [
  //           {
  //             id: 1,
  //             name: 'address',
  //             title: 'Address',
  //             description: 'Customer Support correspondence address.',
  //           },
  //           {
  //             id: 2,
  //             name: 'assignee',
  //             title: 'Assignee Name',
  //             description: 'Ticket assignee name.',
  //           },
  //           {
  //             id: 3,
  //             name: 'deadline',
  //             title: 'Deadline Time',
  //             description:
  //               'Utmost time to which technician should handle the issue.',
  //           },
  //           {
  //             id: 4,
  //             name: 'department',
  //             title: 'Department Name',
  //             description:
  //               'Department name responsible for servicing this ticket.',
  //           },
  //         ];

  // function textTestCallback(range) {
  //             console.log('range', range);
  //             if (!range.collapsed) {
  //               return null;
  //             }
  //             return CKEDITOR.plugins.textMatch.match(range, matchCallback);
  //           }

  //           function matchCallback(text, offset) {
  //             const pattern = /\[{2}([A-z]|\])*$/;
  //             const match = text.slice(0, offset).match(pattern);
  //             if (!match) {
  //               return null;
  //             }
  //             return { start: match.index, end: offset };
  //           }

  //           function dataCallback(matchInfo, callback) {
  //             const data = placeHolderObj.filter(function (item) {
  //               const itemName = '[[' + item.name + ']]';
  //               return itemName.indexOf(matchInfo.query.toLowerCase()) == 0;
  //             });
  //             callback(data);
  //           }

  //           let autocomplete = new CKEDITOR.plugins.autocomplete(evt.editor, {
  //             textTestCallback: textTestCallback,
  //             dataCallback: dataCallback,
  //             itemTemplate: itemTemplate,
  //             outputTemplate: outputTemplate,
  //           });

  //           // Override default getHtmlToInsert to enable rich content output.
  //           autocomplete.getHtmlToInsert = function (item) {
  //             return this.outputTemplate.output(item);
  //           };
  //       },
  //     },
  //   };

  loadScript(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.head.appendChild(script);
    });
  }

  // public editorConfig: any = {
  //   plugins:
  //     'autocomplete,textmatch,toolbar,wysiwygarea,basicstyles,link,undo,placeholder',
  //   toolbar: [
  //     {
  //       name: 'document',
  //       items: ['Undo', 'Redo'],
  //     },
  //     {
  //       name: 'basicstyles',
  //       items: ['Bold', 'Italic'],
  //     },
  //     {
  //       name: 'links',
  //       items: ['Link', 'Unlink'],
  //     },
  //   ],
  //   on: {
  //     instanceReady: function (evt:any) {
  //       let itemTemplate =
  //           '<li data-id="{id}">' +
  //           '<div><strong class="item-title">{title}</strong></div>' +
  //           '<div><i>{description}</i></div>' +
  //           '</li>',
  //         outputTemplate = '[[{title}]]<span>&nbsp;</span>';

  //         let placeHolderObj = [
  //           {
  //             id: 1,
  //             name: 'address',
  //             title: 'Address',
  //             description: 'Customer Support correspondence address.',
  //           },
  //           {
  //             id: 2,
  //             name: 'assignee',
  //             title: 'Assignee Name',
  //             description: 'Ticket assignee name.',
  //           },
  //           {
  //             id: 3,
  //             name: 'deadline',
  //             title: 'Deadline Time',
  //             description: 'Utmost time to which technician should handle the issue.',
  //           },
  //           {
  //             id: 4,
  //             name: 'department',
  //             title: 'Department Name',
  //             description: 'Department name responsible for servicing this ticket.',
  //           },
  //         ];

  //         function textTestCallback  (range:any) {
  //           console.log('range', range);
  //           if (!range.collapsed) {
  //             return null;
  //           }
  //           return CKEDITOR.plugins.textMatch.match(range, matchCallback);
  //         };

  //         function matchCallback  (text:any, offset:any)  {
  //           const pattern = /\[{2}([A-z]|\])*$/;
  //           const match = text.slice(0, offset).match(pattern);
  //           if (!match) {
  //             return null;
  //           }
  //           return { start: match.index, end: offset };
  //         };

  //         function dataCallback  (matchInfo:any, callback:any)  {
  //           const data = placeHolderObj.filter(function (item) {
  //             const itemName = '[[' + item.name + ']]';
  //             return itemName.indexOf(matchInfo.query.toLowerCase()) == 0;
  //           });
  //           callback(data);
  //         };

  //       let autocomplete = new CKEDITOR.plugins.autocomplete(evt.editor, {
  //         textTestCallback: textTestCallback,
  //         dataCallback: dataCallback,
  //         itemTemplate: itemTemplate,
  //         outputTemplate: outputTemplate,
  //       });

  //       // Override default getHtmlToInsert to enable rich content output.
  //       autocomplete.getHtmlToInsert = function (item:AnimationPlaybackEventInit) {
  //         return this.outputTemplate.output(item);
  //       };
  //     },
  //   },
  // };

  // public editorConfig = {
  //   variables: ['name', 'age', 'location'], // Add your variables here
  // };
  public message1 = {
    message1: 'Hello, {name}! You are {age} years old.',
  };

  public variables = {
    name: null,
    name1: null,
    name3: null,
    age: null,
    age1: null,
    age2: null,
    location: null,
    location1: null,
    location2: null,
  };

  onEditorChange(event: any) {
    console.log('mymsg : ', this.message.message);
    if (this.ckeditor) {
      const editorData = this.ckeditor.instance.getData();
      if (editorData.includes('{')) {
        this.onEditorInput(editorData);
      }
      if (editorData.includes('}')) {
        console.log(
          'Closing bracket found in editor data',
          editorData,
          '  ',
          this.ckeditor.instance
        );
        // this.handleClosingBracketWithAutosuggestion(editorData, this.ckeditor.instance);
      }
    }
  }
  // textBeforeCursor:any;
  onEditorInput(editorData: any) {
    console.log('oneditorInput : ', editorData);

    // Create a temporary div element to parse HTML content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = editorData;

    // Extract text content from the HTML
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    console.log('Extracted text content: ', textContent);

    // Refine to extract text after the last '{'
    const lastOpeningBracketIndex = textContent.lastIndexOf('{') + 1;
    let textAfterLastOpeningBracket = '';
    if (lastOpeningBracketIndex !== -1) {
      textAfterLastOpeningBracket = textContent.substring(
        lastOpeningBracketIndex
      );
    } else {
      // Handle case where there's no '{' found
      textAfterLastOpeningBracket = textContent;
    }

    console.log(
      'Text after last opening bracket: ',
      textAfterLastOpeningBracket
    );

    if (textAfterLastOpeningBracket) {
      debugger;
      const partialVariableName = textAfterLastOpeningBracket.trim();
      const variableKeys = Object.keys(this.variables);
      this.suggestions = variableKeys.filter((variable) =>
        variable.startsWith(partialVariableName)
      );
      this.updateAutocompleteSuggestions();
      this.cdr.detectChanges();
      console.log('suggestions : ', this.suggestions);
    } else {
      this.suggestions = [];
      this.updateAutocompleteSuggestions();
      this.cdr.detectChanges();
      console.log('suggestions : ', this.suggestions);
    }
  }

  updateAutocompleteSuggestions() {
    // Update autocomplete suggestions here (assuming you have a method or property to handle this)
    // For example, if you are using Angular Material autocomplete:
    this.autocompleteTrigger.openPanel();
  }

  onAutocompleteSelection(selectedOption: string) {
    console.log('selected : ', selectedOption);
    if (this.ckeditor) {
      const editorInstance = this.ckeditor.instance;
      const editorData = editorInstance.getData();

      // Find the last occurrence of '{' in the editor content
      const lastOpeningBracketIndex = editorData.lastIndexOf('{');

      // Ensure there is an opening '{' before the cursor
      if (lastOpeningBracketIndex !== -1) {
        // Extract text before the last '{' (including '{' itself)
        const textBeforeLastOpeningBracket = editorData.substring(
          0,
          lastOpeningBracketIndex + 1
        );

        // Replace everything after the last '{' with the selected option
        const replacedText =
          textBeforeLastOpeningBracket + selectedOption + '}';

        // Set the updated content back to the editor
        editorInstance.setData(replacedText);
      }

      // Clear suggestions after selection
      this.suggestions = [];
    }
  }

  LoadTemplates(id: any): void {
    debugger;
    this.emailDb.list(`email-templates/${id}`, null, (response): void => {
      debugger;
      // this.message = response;
      this.message.application_id = response.application;
      this.message.user_id = response.added_by;
      this.message.template_name = response.template_name;
      this.message.message = response.message;
      this.message.template_area = response.template_area;
      this.message.subject = response.subject;
      this.message.design = response.design;
      this.message.sended_by = response.sended_by;
      console.log('my data : ', this.message);
    });
  }

  checkWhatsInput(): void {
    this.message.template_name;
    const words = this.message.template_name.split(' ');
    // for txt in words
    let test = [];
    for (let i = 0; i < words.length; i++) {
      const keywordRegex = /\{\s+/;
      // const data = keywordRegex.test(words[i])
      // test.push(data);

      if (words[i].includes('{') && !words[i].includes('}')) {
        console.log('Data :' + words[i]);
      } else {
        console.log('simple:' + words[i]);
      }
    }
    // debugger;

    if (
      this.message.template_name.includes('{') &&
      this.message.template_name.includes('}')
    ) {
      // The inputString contains curly braces, do nothing
      console.log('Data contains curly braces.');
    } else {
      // The inputString does not contain curly braces, call your function
      // this.yourFunction();
      console.log(this.message.template_name);
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

  onCloseChild() {
    this.router.navigate(['email/email-template/']);
  }

  onSaveMessageTemplate() {
    this.emailDb.store(
      'email-templates/',
      this.message,
      (response): void => {
        console.log('response : ', response);
      },
      (error): void => {
        console.log('error :', error);
      }
    );
  }

  onUpdateMessageTemplate() {
    this.emailDb.update(
      `email-templates/`,
      this.id,
      this.message,
      (response: any): void => {
        this.message.application_id = response.application;
        this.message.user_id = response.added_by;
        this.message.template_name = response.template_name;
        this.message.message = response.message;
        this.message.template_area = response.template_area;
        this.message.subject = response.subject;
        this.message.design = response.design;
        this.message.sended_by = response.sended_by;
        console.log('my data : ', this.message);
      }
    );
  }
  // onRowClicked(data: any, entry: any, evt: any){
  //   console.log('mydata : ', data);
  // }
}
