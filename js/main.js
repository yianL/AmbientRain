/**
 * Andrew Lai 2013.
 * http://andrewyalai.com
 */
var gapiKey = "AIzaSyCOnFwKxyyZBvD_2uF1H1zmIMM8zC-PkR8";
var youtubeAPI = "https://www.googleapis.com/youtube/v3/";

var player; 
var rainPlayer;
var raining = false;
var rainVolume = 50;

function onYouTubePlayerAPIReady() {
  loadSoundCloud();

  player = new YT.Player('ytplayer', {
    events: {
      "onStateChange": stopCycle
    }
  });
}

function stopCycle(event) {
  console.log(event.data);
}

function loadSoundCloud() {
  var widgetIframe = document.getElementById('sc-widget');
  rainPlayer = SC.Widget(widgetIframe);
  
  // Initialize the rain player
  rainPlayer.bind(SC.Widget.Events.READY, function() {
    rainPlayer.bind(SC.Widget.Events.FINISH, function() {
      rainPlayer.play();
    });

    raining = true;
    rainPlayer.setVolume(rainVolume);
  });

  console.log('rain player added..');
}

function loadYoutube(code) {
  //var code = 'nPQj2s7R5S4';
  if(player)
    player.loadVideoById(code);
}

/**
 * YouTube Search fucnitons
 */

function searchYoutube(){
  $('#resultSnippets').html("");  //clear previous results first

  var param = {
    "part": "snippet",
    "q": $('#youtubeID').val(),
    "key": gapiKey,
    "type": "video",
    "videoEmbeddable": "true",
    "videoSyndicated": "true",
    "maxResults": 10
  };
  
  $.getJSON( youtubeAPI + "search", param, function(data) {
    var items = data['items'];

    $.each( items, function( index, value ) {
      var thumbnail = value["snippet"]["thumbnails"]["default"]["url"];
      var title = value["snippet"]["title"];
      var id = value["id"]["videoId"];
      
      addResult(thumbnail, title, id);
    });

  }); 
}

function addResult(thumbnail, title, id) {
  var res = '<img src="' + thumbnail + '">'
    + '<a href="#" onclick="' + 'loadYoutube(\'' + id + '\');">' + title + '</a><br>';
  $('#resultSnippets').append(res);
}

/**
 * Rain Controller functions
 */

function startRain(){
  rainPlayer.play();
  $('i#theDrop').fadeIn();
  raining = true;
  $('button#rainPlayBtn').html('<i class="icon-pause"></i>');
}

function pauseRain(){
  rainPlayer.pause();
  $('i#theDrop').fadeOut();
  raining = false;
  $('button#rainPlayBtn').html('<i class="icon-play"></i>');
}

function toggleRain(){
  raining ? pauseRain() : startRain();
}

function changeVolume(delta) {
  rainVolume += delta;

  if(rainVolume > 100)
    rainVolume = 100;
  else if(rainVolume < 0)
    rainVolume = 0;

  rainPlayer.setVolume(rainVolume);
}