var exec = require('child_process').exec

function scrabbleCheat (tiles, callback) {
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
    var wordSuggestions = stdout.split('\n')
      .filter(function (word) {return word.length > 1})
      .filter(correctTiles(tiles))
      .sort(function (a, b) {return b.length - a.length})
    callback(wordSuggestions)
  })
}


/*
Purpose: Take each value of the array, assign a score to each letter, and then reduce the array of values and add it the results output.
*/


var pointValues = {
  "a":1,
  "b":3,
  "c":3,
  "d":2,
  "e":1,
  "f":4,
  "g":2,
  "h":4,
  "i":1,
  "j":8,
  "k":5,
  "l":1,
  "m":3,
  "n":1,
  "o":1,
  "p":3,
  "q":10,
  "r":1,
  "s":1,
  "t":1,
  "u":1,
  "v":4,
  "w":4,
  "x":8,
  "y":4,
  "z":10
}

var testArray = "dog".split("");

var convertWordToScore = function(word){ 
  var score = word.split("").reduce (function (points, currentCharacter) { 
    return points + pointValues[currentCharacter]
  }, 0)
  return score;
  }

var convertWordsToScores = function(arr) {
  return arr.map(convertWordToScore)
}


module.exports = scrabbleCheat