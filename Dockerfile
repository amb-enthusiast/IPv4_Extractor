# Build from the official , using the latest version as per 10/04/2016
FROM node:0.10.44

# Set up a working folder for the app
RUN mkdir -p /collab/services/node/extractor/ipv4
WORKDIR /collab/services/node/extractor/ipv4

# copy pacakge.json file from the local filesystem to the image app folder
# then run npm to install dependencies
COPY package.json /collab/services/node/extractor/ipv4
RUN npm install

# Copy the entire app from local filesystem to image
COPY . /collab/services/node/extractor/ipv4


# EXPOSE causes the container to expose the port
EXPOSE 3000

CMD ["node" , "server.js" ]
