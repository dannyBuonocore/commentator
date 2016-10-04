//
// This module parses and extracts information from the editor text.
//

var lang = require('./lang')

module.exports = {

  // Returns true if the cursor is on the line above a function declaration.
  aboveFunc: function() {

    // get the editor contents and current buffer position
    let editor = atom.workspace.getActiveTextEditor()
    let allText = editor.getText()
    let coords = editor.getCursorBufferPosition()

    // get the next line
    let line = editor.lineTextForBufferRow(coords.row + 1)

    // determine if next line is a function
    return lang.isFunc(line)

  }

};
