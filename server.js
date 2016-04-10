var argv = require('optimist').argv;
var express = require('express');
var bodyParser = require('body-parser');
var api = require('./api_ip4');


var serverPort = 3000;
if(argv.serverPort) serverPort = argv.serverPort;

start(serverPort)


function start(port) {

  var app = express();

  app.use(bodyParser.json()); // for parsing application/json

  app.post("/ip4", api.getIP4s);

  app.get("/metadata" , api.getMetadata)
    
  app.listen(port);

  console.log("Listening on port " + port);

}
