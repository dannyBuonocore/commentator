
var fs = require('fs')

var parse = require('./parse')
var lang = require('./lang')

module.exports = {

  fileHeader: function() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {

      let selection = editor.getSelectedText()

      // Read the configuration file
      // TODO make relative path
      var config = fs.readFileSync('/home/danny/github/commentator/lib/config-schema.json', 'utf8')
      var header = JSON.parse(config).file_header

      // Create the file header
      let tag = lang.getCommentTag() + ' '
      let line = tag + header.line_character.repeat(header.line_length - tag.length) + '\n'
      let result = line

      if (header.show_path)
        result += tag + '@file: ' + editor.buffer.file.path + '\n'

      if (header.author.name)
        result += tag + '@author: ' + header.author.name + '\n'
      if (header.author.company)
        result += tag + '@company: ' + header.author.company + '\n'
      if (header.author.website)
        result += tag + '@website: ' + header.author.website + '\n'

      result += line

      // Insert the header comment at the top of the file
      currentPosition = editor.getCursorBufferPosition()
      editor.setCursorBufferPosition([0, 0])
      editor.insertText(result)
      editor.setCursorBufferPosition(currentPosition)

    }
  },

  enterPressed: function() {
    console.log('enterPressed')
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {

      if (parse.getLine(editor).trim() == lang.getCommentTag()) {
        // Check for function declaration
        funcHeader(editor)
      } else editor.insertNewline()
    }
  }

};

function funcHeader(editor) {

  console.log('checking func header')

  // Parse the function directly below the current line
  let func = parse.parseFunc(editor)

  // Exit if there is no function below
  if (func == null || typeof func == 'undefined')
    return

  // Read the configuration file
  // TODO make relative path
  var config = fs.readFileSync('/home/danny/github/commentator/lib/config-schema.json', 'utf8')
  var header = JSON.parse(config).file_header

  // remove the comment tag
  console.log(editor.getCursorBufferPosition().column)
  while (editor.getCursorBufferPosition().column > 0)
    editor.backspace()

  // Create the function header
  let tag = lang.getCommentTag() + ' '
  let line = tag + header.line_character.repeat(header.line_length - tag.length) + '\n'
  let result = line

  result += tag + func.funcName + '\n'

  console.log('params', func.params);
  func.params.forEach(function(e) {
    result += tag + '@param ' + e + ':' + '\n'
  })

  result += line

  editor.insertText(result)

  editor.backspace()

}
