var express = require('express');
var bodyParser = require('body-parser');

var pjson = require('./package.json');
var serviceID = (pjson.name + '_' + pjson.version);

var app = express();

// Configure the app


function getMetadata(req, res) {

    res.send( { "name" : pjson.name , "version" : pjson.version } );

}

function getIP4s(req, res) {

    var body = req.body;

    if(body == null) {
        res.send({ message : 'Request body was empty; please provide JSON content'});
    }

    var text = body.text;

    if(text == null) {
        res.send({ "message" : "Input did not specify text input.  Please specify input as simple JSON { text : \"value\" } where \"value\" is your content" });
    }

    // https://github.com/dstl/baleen/blob/dfedd6c33436d5d86f41728b7c076f4d1452b3ae/baleen/baleen-annotators/src/main/java/uk/gov/dstl/baleen/annotators/regex/IpV4.java
    
    if(typeof text == "string") {

        var IP4_REGEX = /\b(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\b/g;
        
        ip4 = text.match(IP4_REGEX);
        
        //ip4 = IP4_REGEX.match(text);

        res.send({ "ip4Addresses" : ip4 , "serviceID" : serviceID , "thanksForRegexTo" : "https://github.com/dstl/baleen" });

    } else {

        res.send({ "message" : "Input was not a string :: " , "input" : text });

    }

}

module.exports.getIP4s=getIP4s
module.exports.getMetadata=getMetadata