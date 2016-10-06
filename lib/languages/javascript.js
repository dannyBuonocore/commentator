//
// This module parses Javascript strings.
//

module.exports = {

  // Returns the parsed function declaration, null if there is none.
  parseFunc: function(str) {

      console.log('str is', str)

    str = str.trim()

    // function <name> ( [params] )
    // https://regex101.com/r/dc7ZYr
    // [function name, params]
    // TODO check spaces
    var func1Regex = /^\s*(?:(?:var|let|const)\s*(?:[A-Za-z0-9_$]+)\s*=\s*)?function\s*([A-Za-z0-9_$]*)\s*\(\s*(.*)\)\s*/g
    matches = func1Regex.exec(str)

    console.log('matches', matches)

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
