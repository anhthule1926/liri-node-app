console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.movies = {
  apikey: process.env.OMDB_APIKEY,
};

exports.bands = {
  apikey: process.env.BANDS_APIKEY,
};