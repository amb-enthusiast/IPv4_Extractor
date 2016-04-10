IPv4_Extractor
==============

This express.js app provides a simple REST endpoint to extract IPv4 values from text using regular expression (regex) matching.

Bring it to life using <path to app>/node server.js serverPort=3000

API Guide
=========

/metadata
---------
The metadata endpoint accepts a GET request and returns a JSON description of the service: { name : IPv4_Extractor.js , version : A.A.A }

/ip4
-----

The ip4 endpoint accepts JSON where text content is provided in the text field: { text : "Text to be processed goes here" } in a POST request.  Regex is run to extract IPv4 values, and results returned as JSON in the following format: { "ip4Addresses" : [ ip1, ... , ip_n] , "serviceID" : "IPv4_Extractor_A.A.A" }


Project guide
=============

The project uses two node files: api_ip4.js and server.js:

*api_ip4.js contains the logic for extracting IPv4 addresses using regex.
*server.js contains the setup and cofig for the erver and executes the service.
 
The testData folder contains simple test data, and a bash script to use curl to post the data at the ip4 endpoint.
