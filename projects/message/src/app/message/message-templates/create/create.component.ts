import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { DbService } from '../../../../../../../src/app/services/db.service';
import { MessageTemplatesComponent } from '../message-templates.component';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements AfterViewInit {
  Editor = ClassicEditorBuild;
  @ViewChild('messageTextarea', { static: true }) messageTextarea: ElementRef;
  @ViewChild(MatAutocompleteTrigger)
  autocompleteTrigger: MatAutocompleteTrigger;
  constructor(
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    public db: DbService,
    public mt: MessageTemplatesComponent,
    public route: ActivatedRoute,
    public router: Router
  ) {}
  // message: any;
  message = {
    template_name: '',
    template_type: '',
    message: '',
    template_area: '',
    sended_by: '',
    id: '',
    dlt_te_id: null,
  };
  isEditTemplate: boolean = false;
  Template_Category: any;
  selectedValueStatus: any;
  showSuggestions = false;
  suggestions: string[] = [];
  filteredSuggestions: string[] = [];
  selectedIndex = -1;
  suggestionTop = 0;
  suggestionLeft = 0;
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

  ngAfterViewInit() {}
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
    this.db.list('sms/sms-templates/', { id: id }, (response): void => {
      if (response.length === 1) {
        this.message = response[0];
      } else {
        this.isEditTemplate = false;
        this.message = {
          template_name: '',
          template_type: '',
          message: '',
          template_area: '',
          sended_by: '',
          id: '',
          dlt_te_id: null,
        };
      }
    });
  }
  onSaveMessageTemplate(): void {
    this.db.store('sms/sms-templates/', this.message, (response): void => {
      this.mt.LoadTemplates();
    });
  }

  onUpdateMessageTemplate(): void {
    this.db.update(
      'sms/sms-templates/',
      this.message.id,
      this.message,
      (response): void => {
        this.mt.LoadTemplates();
      }
    );
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
  }

  onCloseChild() {
    this.router.navigate(['message/message-template/']);
  }

  onInput(event: Event): void {
    const input = event.target as HTMLTextAreaElement;
    // debugger;
    const cursorPosition = input.selectionStart;
    const textBeforeCursor = input.value.substring(0, cursorPosition);

    if (textBeforeCursor.includes('{')) {
      // debugger;
      this.onEditorInput(textBeforeCursor);
      this.showSuggestions = true;
      this.updateSuggestionPosition(cursorPosition);
    } else {
      this.showSuggestions = false;
    }
  }

  onEditorInput(editorData: any): void {
    const lastOpeningBracketIndex = editorData.lastIndexOf('{') + 1;
    let textAfterLastOpeningBracket = '';
    if (lastOpeningBracketIndex !== -1) {
      textAfterLastOpeningBracket = editorData.substring(
        lastOpeningBracketIndex
      );
    } else {
      textAfterLastOpeningBracket = editorData;
    }

    if (textAfterLastOpeningBracket) {
      const partialVariableName = textAfterLastOpeningBracket.trim();
      const variableKeys = Object.keys(this.variables);
      this.suggestions = variableKeys.filter((variable) =>
        variable.startsWith(partialVariableName)
      );
    } else {
      this.suggestions = [];
    }

    this.cdr.detectChanges();
  }

  updateSuggestionPosition(cursorPosition: number): void {
    const textarea = this.messageTextarea.nativeElement as HTMLTextAreaElement;
    const textBeforeCursor = textarea.value.substring(0, cursorPosition);

    // Create a temporary div to simulate the text up to the cursor position
    const tempDiv = this.renderer.createElement('div');
    this.renderer.setStyle(tempDiv, 'position', 'relative');
    this.renderer.setStyle(tempDiv, 'white-space', 'pre-wrap');
    this.renderer.setStyle(tempDiv, 'visibility', 'hidden');
    this.renderer.setStyle(tempDiv, 'width', `${textarea.offsetWidth}px`);
    this.renderer.setStyle(tempDiv, 'font', getComputedStyle(textarea).font);

    // Set the text content to simulate the text in the textarea up to the cursor position
    tempDiv.innerHTML = textBeforeCursor
      .replace(/\n/g, '<br/>')
      .replace(/ /g, '&nbsp;');
    this.renderer.appendChild(document.body, tempDiv);

    // Calculate the position of the cursor
    // debugger;
    const tempDivRect = tempDiv.getBoundingClientRect();
    const textareaRect = textarea.getBoundingClientRect();

    // this.suggestionTop = tempDivRect.bottom - textarea.scrollTop + textareaRect.top;
    // this.suggestionLeft = tempDivRect.left - textarea.scrollLeft + textareaRect.left;
    this.suggestionTop = 0;
    this.suggestionLeft = cursorPosition;
    debugger;
    // Remove the temporary div from the document body
    this.renderer.removeChild(document.body, tempDiv);
  }


  onKeyDown(event: KeyboardEvent): void {
    if (this.showSuggestions) {
      if (event.key === 'ArrowDown') {
        this.selectedIndex = (this.selectedIndex + 1) % this.suggestions.length;
        event.preventDefault();
      } else if (event.key === 'ArrowUp') {
        this.selectedIndex =
          (this.selectedIndex - 1 + this.suggestions.length) %
          this.suggestions.length;
        event.preventDefault();
      } else if (event.key === 'Enter') {
        this.onAutocompleteSelection(this.suggestions[this.selectedIndex]);
        event.preventDefault();
      }
    }
  }

  onAutocompleteSelection(selectedOption: string): void {
    if (this.message.message) {
      const editorData = this.message.message;
      const lastOpeningBracketIndex = editorData.lastIndexOf('{');

      if (lastOpeningBracketIndex !== -1) {
        const textBeforeLastOpeningBracket = editorData.substring(
          0,
          lastOpeningBracketIndex + 1
        );
        const replacedText =
          textBeforeLastOpeningBracket + selectedOption + '}';
        this.message.message = replacedText;
      }

      this.suggestions = [];
      this.showSuggestions = false;
    }
  }

  onContainerClick(event: MouseEvent): void {
    this.updateSuggestionPosition(
      (this.messageTextarea.nativeElement as HTMLTextAreaElement).selectionStart
    );
  }

  // onInput(event: Event): void {
  //   const input = event.target as HTMLTextAreaElement;
  //   const cursorPosition = input.selectionStart;
  //   const textBeforeCursor = input.value.substring(0, cursorPosition);
  //   // console.log('text : ' , textBeforeCursor);
  //   if (textBeforeCursor.includes('{')) {
  //     console.log('text : ' , textBeforeCursor);
  //     this.onEditorInput(textBeforeCursor);
  //   } else {
  //   }
  // }
  // onEditorInput(editorData: any){
  //   // debugger;
  //   const lastOpeningBracketIndex = editorData.lastIndexOf('{')+1;
  //   let textAfterLastOpeningBracket = '';
  //   if (lastOpeningBracketIndex !== -1) {
  //     textAfterLastOpeningBracket = editorData.substring(lastOpeningBracketIndex);
  //   } else {
  //     // Handle case where there's no '{' found
  //     textAfterLastOpeningBracket = editorData;
  //   }

  //   if (textAfterLastOpeningBracket) {
  //     // debugger;
  //     const partialVariableName = textAfterLastOpeningBracket.trim();
  //     const variableKeys = Object.keys(this.variables);
  //     this.suggestions = variableKeys.filter(variable => variable.startsWith(partialVariableName));
  //     this.updateAutocompleteSuggestions();
  //     this.cdr.detectChanges();
  //     console.log('suggestions : ', this.suggestions);
  //   }  else {
  //     this.suggestions=[];
  //     this.updateAutocompleteSuggestions();
  //     this.cdr.detectChanges();
  //     console.log('suggestions : ', this.suggestions);
  //   }
  // }
  // updateAutocompleteSuggestions() {
  //   this.autocompleteTrigger.openPanel();
  // }
  // onAutocompleteSelection(selectedOption: string) {
  //   console.log('selected : ' , selectedOption);
  //   if (this.message.message) {
  //     // const editorInstance = this.ckeditor.instance;
  //   const editorData = this.message.message;

  //   // Find the last occurrence of '{' in the editor content
  //   const lastOpeningBracketIndex = editorData.lastIndexOf('{');

  //   // Ensure there is an opening '{' before the cursor
  //   if (lastOpeningBracketIndex !== -1) {
  //     debugger;
  //     // Extract text before the last '{' (including '{' itself)
  //     const textBeforeLastOpeningBracket = editorData.substring(0, lastOpeningBracketIndex + 1);

  //     // Replace everything after the last '{' with the selected option
  //     const replacedText = textBeforeLastOpeningBracket + selectedOption+'}';
  //     console.log('replaced text : ' , replacedText);
  //     this.message.message=replacedText;
  //   }

  //   // Clear suggestions after selection
  //   this.suggestions = [];
  //   }
  // }
}
