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
      let config = fs.readFileSync('/home/danny/github/commentator/lib/config-schema.json', 'utf8')

      console.log(config)

      // Insert the header comment at the top of the file
      currentPosition = editor.getCursorBufferPosition()
      editor.setCursorBufferPosition([0, 0])
      editor.setCursorBufferPosition(currentPosition)

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
