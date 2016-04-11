IPv4_Extractor
==============

This express.js app provides a simple REST endpoint to extract IPv4 values from text using regular expression (regex) matching.  Bring it to life using:
```shell
 <path to app>$ node server.js --serverPort=3000
```

API Guide
=========

/metadata
---------
The metadata endpoint accepts a GET request and returns a JSON description of the service:
```json
  {
    "name" : "IPv4_Extractor.js" ,
    "version" : "A.A.A"
  }
```

/ip4
-----

The hostname:portNumber/ip4 endpoint accepts JSON where text content is provided in the text field:
```json
  {
    "someKey" : "someValue" ,
    "text" : "Text content that you want to be processed goes here" ,
    "someOtherKey" : "someOtherValue"
  }
```
in a POST request to the hostname:portNumber/ip4 URL.  N.B. only the text field is used by the app.

The app runs regex to extract IPv4 values, and results returned as JSON in the following format:
```json
  {
    "ip4Addresses" : [ "ip1" , ... , "ip_n" ] ,
     "serviceID" : "IPv4_Extractor.js_A.A.A"
  }
```

Project guide
=============

The project uses two node files: api_ip4.js and server.js:

*api_ip4.js contains the logic for extracting IPv4 addresses using regex.
*server.js contains the setup and cofig for the erver and executes the service.
 
The testData folder contains simple test data, and a bash script to use curl to post the data at the ip4 endpoint.
<path to app>/testData$ ./testPost.sh ip2.json

Dockerisation
=============
What better than containerising the app and building a Docker image, and exporting it to a tar?

The Dockerfile pulls from the offical node image, creates a directory for the app, copies the app to that directory and then runs the .
To build the image, I used:
```shell
    <path to app>$ docker build -t node-ipv4_extractor .
```

To run the image, I used:
```shell
    docker run -p 8080:3000 -d ipv4_extractor
```
To interact with the container on Mac OS X, remember that you need to interact with teh VM that docker uses to provide - not Mac localhost (doh!)
```shell
    curl "http://$(docker-machine ip default):8080/metadata"
```

The testData/testContainerPost.sh script has an example.

