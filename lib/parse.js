//
// This module parses and extracts information from the editor text.
//

var lang = require('./lang')

module.exports = {

  // Returns the parsed function below the current line, null if there is none.
  parseFunc: function(editor) {

    // get the next line
    let line = this.getLine(editor, 1)

    if (typeof line == 'undefined' || line.length == 0)
      return null

    // parse the functon
    return lang.parseFunc(line)

  },

  getLine: function(editor, offset = 0) {
    return editor.lineTextForBufferRow(
      editor.getCursorBufferPosition().row + offset)
  }

};
