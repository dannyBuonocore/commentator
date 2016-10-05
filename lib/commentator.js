'use babel';

import { CompositeDisposable } from 'atom'
import request from 'request'
import fs from 'fs'

var worker = require('./worker')

export default {

  subscriptions: null,

  activate() {
    this.subscriptions = new CompositeDisposable()

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'commentator:fileHeader': () => worker.fileHeader()
    }))

    this.subscriptions.add(atom.commands.add('atom-text-editor', {
      'commentator:slashPressed': () => worker.onSlashPressed()
    }))

  },

  deactivate() {
    this.subscriptions.dispose()
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
