//
// This module parses individual strings for a given set of languages.
//

var utils = require('./utils')

var js = require('./languages/javascript')
var py = require('./languages/python')

module.exports = {

  parseFunc: function(str) {
    e = getParser()
    if (typeof e == 'undefined')
      console.log('ERROR: parser not found')
    return e.parseFunc(str)
  },

  getCommentTag: function() {
    switch (utils.getFileType()) {
      case 'js':
        return '//'
        break
      case 'py':
        return '#'
        break
    }
    return '//'
  }

};

// Returns the appropriate parser for the file type.
function getParser() {
  switch (utils.getFileType()) {
    case 'js':
      return js
      break
    case 'py':
      return py
      break
  }
  return null
}
