var express = require('express');
var path = require('path');
var app = express();
//var bodyParser = require('body-parser');
var episodes = require(path.join(__dirname, 'episodes.js'));

app.use(express.static(path.join(__dirname,'public')));


app.listen(3000, function() {
	console.log("j'ecoute sur 3000");
});

app.set('case sensitive routing', false);


//app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.sendFile('/public/index.html');
	res.end();
});

app.get('/episodes', function(req, res) {
	res.json(episodes);
	res.end();
});