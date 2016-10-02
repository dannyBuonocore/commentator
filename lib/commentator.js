'use babel';

import { CompositeDisposable } from 'atom'
import request from 'request'
import fs from 'fs'

export default {

  subscriptions: null,

  activate() {
    this.subscriptions = new CompositeDisposable()

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'commentator:header': () => this.header()
    }))
  },

  deactivate() {
    this.subscriptions.dispose()
  },

  header() {

    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {

      let selection = editor.getSelectedText()

      // Read the configuration file
      // TODO make relative path
      var config = fs.readFileSync('/home/danny/github/commentator/lib/config-schema.json', 'utf8')
      var header = JSON.parse(config).file_header

      console.log(header)

      // Create the file header
      let tag = '// '
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

      console.log(result)

    }

  },

  download(url) {
    return new Promise((resolve, reject) => {
      request(url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          resolve('got html')
        } else {
          reject({
            reason: 'Unable to download page'
          })
        }
      })
    })
  }

};

// **************************************************************************
// Auxilary functions
// **************************************************************************
// function getConfig() {
//   return fs.readFileSync('/home/danny/github/commentator/info.txt', 'utf8')
// }
