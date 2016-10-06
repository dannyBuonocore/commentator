//
// This module parses Python strings.
//

module.exports = {

  // Returns the parsed function declaration, null if there is none.
  parseFunc: function(str) {

    str = str.trim()

    // def <name> ( [params] )
    // https://regex101.com/r/06BWum
    // [function name, params]
    // TODO check spaces
    var func1Regex = /^\s*(?:def)\s*([A-Za-z_]+[A-Za-z0-9_]*)\s*\(\s*(.*)\)\s*/g
    matches = func1Regex.exec(str)

    // Exit if not a function
    if (matches == null)
      return null

    // Get the parameters from the matches
    params = matches[2].split(',')
    params.forEach(function(e, i, a) {
      if (e == '') a.splice(i, 1)
      else a[i] = e.trim()
    })

    return {
      "funcName": matches[1],
      "params": params
    }

  }

};
