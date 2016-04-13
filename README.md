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

Build the image
---------------
The Dockerfile pulls from the offical node image, creates a directory for the app, copies the app to that directory and then runs the .
To build the image, I used:
```shell
    <path to app>$ docker build -t ipv4_extractor .
```
Run container
-------------
To run the image in a container, I used:
```shell
    docker run -p 8080:3000 -d ipv4_extractor
```
This maps the container app port of 3000 to the port 8080 on the host.

Watch out for a Mac OS gotcha - to interact with the container on Mac OS X, remember that you need to interact with the VM docker uses to work - not Mac localhost (doh!)
```shell
    curl "http://$(docker-machine ip default):8080/metadata"
```

The testData/testContainerPost.sh script has an example.

Export the container
--------------------
use docker ps to get the containerID, then
```
docker export --output="ipv4_extractor.tar" containerID
```
which creates a tar of the container in the current directory.

IBM BlueMix
===========
Here is what was done to deploy the image to IBM BlueMix:
Setup IBM Containers
--------------------
Follow the instructions here:
    
    https://console.eu-gb.bluemix.net/docs/containers/container_cli_cfic.html

To get set up with the tools & credentials required for your BlueMix account.

```shell
    $ cf login
```

```shell
  $ cf ic login
```

Prep image for deployment
-------------------------
BlueMix tells us to prep the 
````shell
    $ docker tag b9af5f7b52ec registry.eu-gb.bluemix.net/ip4_extractor/ipv4_extractor:latest
````

Push to BlueMix registry
------------------------
Now, we should be able to push the image to the registry:
```shell
    $ docker tag ipv4_extractor registry.eu-gb.bluemix.net/ip4_extractor/ipv4_extractor:latest
```

Run as container on BlueMix
---------------------------
From command line:
```shell
    $ cf ic run --name ipv4_extractor registry.eu-gb.bluemix.net/ip4_extractor/ipv4_extractor:latest
```
I used the BlueMix container dashboard to deploy the container and bind to a public IP address on port 3000.

The container is running (as per 13/04/16) and lives @:
   134.168.43.128:3000/ip4
   134.168.43.128:3000/metadata

Try the ./testData/testBlueMixPost.sh script to see the container in action!


