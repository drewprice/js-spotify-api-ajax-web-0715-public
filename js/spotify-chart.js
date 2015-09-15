var url = "http://charts.spotify.com/api/tracks/most_streamed/us/weekly/latest";

var dataSetProperties = {
  label: 'Spotify Chart of Top 20 Streamed Songs on Spotify with their Steam Count',
  fillColor: 'rgba(220,220,220,0.5)',
  strokeColor: 'rgba(220,220,220,0.8)',
  highlightFill: 'rgba(220,220,220,0.75)',
  highlightStroke: 'rgba(220,220,220,1)'
}

$(function() {
  getSpotifyTracks(success);
});

function extractTop20Tracks(tracks) {
  return tracks.slice(0, 20);
}

function extractNumberOfStreams(tracks) {
  return tracks.map(function(track) {
    return track.num_streams;
  })
}

function extractNames(tracks) {
  return tracks.map(function(track) {
    return track.track_name;
  })
}

function chartData(labels, inputData) {
  return {
    labels: labels,
    datasets: [{
      label: 'Spotify Chart of Top 20 Streamed Songs on Spotify with their Steam Count',
      fillColor: 'rgba(220,220,220,0.5)',
      strokeColor: 'rgba(220,220,220,0.8)',
      highlightFill: 'rgba(220,220,220,0.75)',
      highlightStroke: 'rgba(220,220,220,1)',
      data: inputData
    }]
  };
}

function getSpotifyTracks(callback){
  $.ajax({
    url: url,
    dataType: 'JSONP',
    success: callback
  });
}

function success(data) {
  var topTwenty = extractTop20Tracks(data.tracks);
  var names = extractNames(topTwenty);
  var streams = extractNumberOfStreams(topTwenty);
  var data = chartData(names, streams);
  var ctx = document.getElementById('spotify-chart').getContext('2d')

  new Chart(ctx).Bar(data);
}
