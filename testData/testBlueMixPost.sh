#!/bin/bash

if [[ $# -eq 0 ]]; then
	echo "No arguments supplied, filename specifing POST content required"
	echo "Usage: $0 portNumber filename"
	exit 1
fi

echo "POSTing contents of $1 to 134.168.43.128:$1"
curl -X POST -d  @$2 -H 'content-type:application/json' http://134.168.43.128:$1/ip4
