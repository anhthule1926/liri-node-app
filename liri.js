//read and set any environment 
require("dotenv").config();

// Import the request npm package.
var request = require("request");

// Import the API keys
var keys = require("./keys");

// Import the FS package for read/write.
var fs = require("fs");

// Import the node-spotify-api NPM package.
var  Spotify = require ("node-spotify-api");

// Initialize the spotify API client with keys
var spotify = new Spotify(keys.spotify);


//switches for various commands
var command = process.argv[2];
function switchStatement() {
    switch (command) {
        case "movie-this":
            getMovie();
            break;
        case "concert-this":
            concertThis();
            break;
        case "spotify-this-song":
            getSong();
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
    }
}