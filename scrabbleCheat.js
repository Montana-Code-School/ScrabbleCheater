var exec = require('child_process').exec

function scrabbleCheat (tiles) {
  var correctTiles = function (tiles) {
    return function (word) {
      var charCount = tiles.split('').reduce(function (cc, char) {
        cc[char] = cc[char] ? cc[char] + 1 : 1
        return cc
      }, {_: 0})
      word.split('').reduce(function (cc, char) {
        (cc[char] === undefined || cc[char] === 0) ? cc._-- : cc[char]--
        return cc
      }, charCount)
      return charCount._ >= 0
    }
  }

  var letters = tiles
    .split('')
    .filter(function (char) {return char !== '_'})
    .join('')
  letters = letters.length === 0 ? '' : '[' + letters + ']*' // In case someone types in all wilds

  var regExp = tiles.split('')
    .filter(function (char) {return char === '_'})
    .reduce(function (regexp) {
      return regexp + '[a-z]' + letters
    }, letters)

  exec("grep '^" + regExp + "$' ./dict/words", function (err, stdout, stderror) {
    console.log(stdout.split('\n')
      .filter(function (word) {return word.length > 1})
      .filter(correctTiles(tiles))
      .sort(function (a, b) {return a.length - b.length})
      .join('\n'))
  })
}

scrabbleCheat(process.argv[2])
