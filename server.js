// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// timestamp challenge
app.route("/api/timestamp/:userinput?")
  .get(function(req, res) {
    // initialisation des variables pour les 2 membres de réponse
    var unix = null;
    var utc = null;
    // évaluation de l'entrée utilisateur (1) si elle existe
    if (req.params.userinput !== undefined) {
      // typage de l'entrée (number ou string)
      var verifType = parseInt(req.params.userinput*1);
      if (isNaN(verifType)) {
        // c'est une chaine string
        unix = new Date(req.params.userinput);
      } else {
        // c'est un nombre
        unix = new Date(verifType);
      }
      console.log(unix);
    } else {
      // (2) l'entrée n'existe pas
      unix = new Date(Date.now());
    }

    // envoi du résultat au format json
    if (unix == "Invalid Date") {
      res.json({error: "Invalid Date"});
    } else {
      res.json({"unix": unix.getTime(), "utc": unix.toUTCString()});
    }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});