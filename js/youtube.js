/**
 * The 'createYTPlayer' function embeds an <iframe> player.
 * @param {string} playerDiv Mandatory The DOM ID for the div where the
 *     <iframe> will be embedded.
 * @param {string} playerHeight Mandatory The height of the embedded player.
 * @param {string} playerWidth Mandatory The width of the embedded player.
 * @param {string} playerVideoId Mandatory The video ID to embed.
 * @param {Object} playerVars Mandatory Player parameters or {}.
 */
function createYTPlayer(playerDiv, playerHeight, playerWidth, playerVideoId) {
  var newplayer = new YT.Player(playerDiv, {
    height: playerHeight,
    width: playerWidth,
    videoId: playerVideoId,
    playerVars: {
      'enablejsapi': 1,
      'autohide': 1,
      'origin': 'https://google-developers.appspot.com'
    },
    events: {
      // 'onError': onPlayerError,
      // 'onPlaybackQualityChange': onytplayerQualityChange,
      // 'onPlaybackRateChange': onytplayerPlaybackRateChange,
      'onReady': onYouTubeHTML5PlayerReady,
      // 'onStateChange': onytplayerStateChange
    }
  });
}

/**
  EVENT HANDLERS
 */

/**
 * The 'onYouTubePlayerReady' function executes when the onReady event
 * fires, indicating that the player is loaded, initialized and ready
 * to receive API calls.
 * @param {Object} event Mandatory A value that identifies the player.
 */
function onYouTubeHTML5PlayerReady(event) {
  if (event) {
    player = event.target;
    console.log('youtube player added..');
  }
}

/**
 * The 'onytplayerStateChange' function executes when the onStateChange
 * event fires. It captures the new player state and updates the
 * "Player state" displayed in the "Playback statistics".
 * @param {string|Object} newState Mandatory The new player state.
 */
function onytplayerStateChange(newState) {
  console.log(newState);
  // if (typeof newState == 'object' && newState['data']) {
  //   newState = newState['data'];
  // }
}

/**
 * The 'onPlayerError' function executes when the onError event fires.
 * It captures the error and adds it to an array that is displayed in
 * the "Errors" section of the demo.
 * @param {string} errorCode Mandatory A code that explains the error.
 */
function onPlayerError(errorCode) {
  if (typeof errorCode == 'object' && errorCode['data']) {
    errorCode = errorCode['data'];
  }
  errors.push('Error: ' + errorCode);
}

/**
 * The 'onytplayerQualityChange' function executes when the
 * onPlaybackQualityChange event fires. It captures the new playback quality
 * and updates the "Quality level" displayed in the "Playback Statistics".
 * @param {string|Object} newQuality Mandatory The new playback quality.
 */
function onytplayerQualityChange(newQuality) {
  if (typeof newQuality == 'object' && newQuality['data']) {
    newQuality = newQuality['data'];
  }
  events.push('onPlaybackQualityChange event: ' +
      'Playback quality changed to "' + newQuality + '"');
}

/**
 * The 'onytplayerPlaybackRateChange' function executes when the
 * onPlaybackRateChange event fires. It captures the new playback rate
 * and updates the "Plabyack rate" displayed in the "Playback Statistics".
 * @param {string|Object} newRate Mandatory The new playback rate.
 */
function onytplayerPlaybackRateChange(newRate) {
  if (typeof newRate == 'object' && newRate['data']) {
    newRate = newRate['data'];
  }
  events.push('onPlaybackRateChange event: ' +
      'Playback rate changed to "' + newRate + '"');
}