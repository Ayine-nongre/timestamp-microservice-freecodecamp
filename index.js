// index.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", function (req, res){
  const date = new Date().toUTCString();
  const unix = Date.parse(date);

  res.json({unix: unix, utc: date});
})

app.get("/api/:date?", function (req, res){
  let dateString = req.params.date;
  let pattern = /^[0-9]+$/;
  let dateType = pattern.test(dateString);

  if (dateType){
    const unixTimeStamp = parseInt(dateString);
    const utc = new Date(unixTimeStamp).toUTCString();
  
    res.json({unix: unixTimeStamp, utc: utc})
  }else{
    const unixTimestamp = Date.parse(dateString);
    const utc = new Date(unixTimestamp).toUTCString();

    unixTimestamp ? res.json({ unix: unixTimestamp, utc: utc }) : res.json({ error: "Invalid Date" })
  }
  console.log(dateType);
})


// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
