// Read and set environment variables
require("dotenv").config();

// Import the node-spotify-api NPM package.
var Spotify = require("node-spotify-api");

// Import the API keys
var keys = require("./keys");

// Import the request npm package.
var request = require("request");

// Import the FS package for read/write.
var fs = require("fs");

// Initialize the spotify API client using our client id and secret
var spotify = new Spotify(keys.spotify);

// Switch command
var pick = function(caseData, functionData) {
    switch (caseData) {
        case "spotify-this-song":
            spotifyThisSong(functionData);
            break;
        case "movie-this":
            movieThis(functionData);
            break;
        case "concert-this":
            concertThis(functionDate);
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            console.log("LIRI doesn't know that");
    }
  };

// Writes to the log.txt file
var getArtistNames = function(artist) {
  return artist.name;
};

// Spotify search
var spotifyThisSong = function(songName) {
  if (songName === undefined) {
    songName = "What's my age again";
  }
  spotify.search(
    {
      type: "track",
      query: songName
    },
    function(err, data) {
      if (err) {
        console.log("Error occurred: " + err);
        return;
      }
      var songs = data.tracks.items;
      for (var i = 0; i < songs.length; i++) {
        console.log(i);
        console.log("artist(s): " + songs[i].artists.map(getArtistNames));
        console.log("song name: " + songs[i].name);
        console.log("preview song: " + songs[i].preview_url);
        console.log("album: " + songs[i].album.name);
        console.log("-----------------------------------");
      }
    }
  );
};

// Novie search
var movieThis = function(movieName) {
  if (movieName === undefined) {
    movieName = "Mr Nobody";
  }
  var urlHit =
    "http://www.omdbapi.com/?t=" +
    movieName +
    "&y=&plot=full&tomatoes=true&apikey=trilogy";
  request(urlHit, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var jsonData = JSON.parse(body);
      console.log("Title: " + jsonData.Title);
      console.log("Year: " + jsonData.Year);
      console.log("IMDB Rating: " + jsonData.imdbRating);
      console.log("Country: " + jsonData.Country);
      console.log("Language: " + jsonData.Language);
      console.log("Plot: " + jsonData.Plot);
      console.log("Actors: " + jsonData.Actors);
      console.log("Rotton Tomatoes Rating: " + jsonData.Ratings[1].Value);
    }
  });
};


// Random text
var doWhatItSays = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);
    var dataArr = data.split(",");
    if (dataArr.length === 2) {
      pick(dataArr[0], dataArr[1]);
    } else if (dataArr.length === 1) {
      pick(dataArr[0]);
    }
  });
};

// Function which takes in command line arguments and executes correct function accordigly
var runThis = function(argOne, argTwo) {
  pick(argOne, argTwo);
};
// MAIN PROCESS
// =====================================
runThis(process.argv[2], process.argv[3]);