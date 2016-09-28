var express = require("express") 
var app = express()
var scrabbleCheat = require("./scrabbleCheat")

app.set("view engine", "ejs")

app.get("/", function(req, res) {
	if(req.query.tiles !== undefined){
	scrabbleCheat(req.query.tiles, function(wordSuggestions){
		console.log("I'm in the callback")
		console.log(wordSuggestions)
		res.render("index", {name: 'Scrabble Cheater!!!!!!',
					 authors: ['Jack', 'Jake', 'Josh', 'Smai', 'Stephanie'],
					 wordSuggestions: wordSuggestions
					})
	});
	console.log('I just called scrabbleCheat')
	} else {
		res.render("index", {name: 'Scrabble Cheater!!!!!!',
					 authors: ['Jack', 'Jake', 'Josh', 'Smai', 'Stephanie'],
					 wordSuggestions: []
					})
	}
})
app.use(express.static("public"))

app.listen(3000)