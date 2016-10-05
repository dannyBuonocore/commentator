//
// This module parses and extracts information from the editor text.
//

var lang = require('./lang')

module.exports = {

  // Returns the parsed function below the current line, null if there is none.
  parseFunc: function() {

    // get the editor contents and current buffer position
    let editor = atom.workspace.getActiveTextEditor()
    let allText = editor.getText()
    let coords = editor.getCursorBufferPosition()

    // get the next line
    let line = editor.lineTextForBufferRow(coords.row + 1)

    if (typeof line == 'undefined' || line.length == 0)
      return null

    // parse the functon
    return lang.parseFunc(line)

  }

};
