import { add } from "@ckeditor/ckeditor5-utils/src/translation-service";

CKEDITOR.plugins.add("insertbuttonplugin", {
  init: function (editor) {
    // Define the dialog
    CKEDITOR.dialog.add("insertButtonDialog", function (editor) {
      debugger;
      return {
        title: "Insert Button with URL",
        minWidth: 400,
        minHeight: 150,
        contents: [
          {
            id: "info",
            label: "Button Info",
            elements: [
              {
                type: "text",
                id: "buttonName",
                label: "Button Name",
                validate: CKEDITOR.dialog.validate.notEmpty(
                  "Button Name field cannot be empty."
                ),
                setup: function (widget) {
                  this.setValue(widget.data.buttonName || "");
                },
                commit: function (widget) {
                  widget.setData("buttonName", this.getValue());
                },
              },
              {
                type: "text",
                id: "url",
                label: "URL",
                validate: CKEDITOR.dialog.validate.notEmpty(
                  "URL field cannot be empty."
                ),
                setup: function (widget) {
                  this.setValue(widget.data.url || "");
                },
                commit: function (widget) {
                  widget.setData("url", this.getValue());
                },
              },
            ],
          },
        ],
        onOk: function () {
          var dialog = this;
          var url = dialog.getValueOf("info", "url");
          var buttonName = dialog.getValueOf("info", "buttonName");

          const buttonHtml = `
              <a href="${url}" target="_blank">
                <button style="color:black" type="button" contenteditable="false" data-cke-editable="false">${buttonName}</button>
              </a>`;
          editor.insertHtml(buttonHtml);
        },
      };
    });

    // Add the command that opens the dialog
    editor.addCommand(
      "openInsertButtonDialog",
      new CKEDITOR.dialogCommand("insertButtonDialog")
    );
    // Add the button to the toolbar
    editor.ui.addButton("InsertButton", {
      label: "Button",
      command: "openInsertButtonDialog",
      toolbar: "insert",
    });
  },
});

CKEDITOR.plugins.add('customlist', {
    icons: 'customlist',
    init: function(editor) {
      editor.addCommand('convertToCustomList', {
        exec: function(editor) {
          // Get the selected text range
          var selection = editor.getSelection();
          var selectedText = selection.getSelectedText();
  
          // Split selected text into lines
          var lines = selectedText.split(/\r?\n/);
  
          // If there's no selection, return
          if (!selectedText) {
            return;
          }
  
          // Determine if the selected lines should be bulleted or numbered
        //   var isNumberedList = confirm('Do you want to create a numbered list?');
          var listHtml = '';
  
          // Generate the HTML for the list
        //   if (isNumberedList) {
        //     listHtml = '<ol>';
        //   } else {
        //     listHtml = '<ul>';
        //   }
  
          lines.forEach(function(line) {
            if (line.trim() !== '') {
              listHtml += '<li>' + line.trim() + '</li>';
            }
          });
  
        //   if (isNumberedList) {
        //     listHtml += '</ol>';
        //   } else {
        //     listHtml += '</ul>';
        //   }
  
          // Insert the list HTML into the editor
          editor.insertHtml(listHtml);
        }
      });
  
      editor.ui.addButton('CustomListButton', {
        label: 'Convert Selected Lines to List',
        command: 'convertToCustomList',
        toolbar: 'insert'
      });
    }
  });
  
  