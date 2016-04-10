#!/bin/bash

if [[ $# -eq 0 ]]; then
	echo "No arguments supplied, filename specifing POST content required"
	echo "Usage: $0 portNumber filename"
	exit 1
fi

echo "POSTing contents of $1 to localhost:$1"

curl -X POST -d @$2 -H 'content-type:application/json' http://$(docker-machine ip default):$1/ip4

#curl -X POST -d @$2 -H 'content-type:application/json' http://localhost:$1/ip4
