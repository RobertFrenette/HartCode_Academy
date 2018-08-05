// Get random Image name from Array
function getRandomImage(IMAGES) {
  return IMAGES[Math.floor(Math.random() * IMAGES.length)];
}

// Add 1 to the score
function incrementScore() {
  var score = parseInt($('#score').html());
  $('#score').html(++score);
}

// Show faded images at end of game
function lockBoard() {
  $('#hole_img_4').attr('src', 'img/mongo_default.png');
  $('#hole_img_5').attr('src', 'img/express_default.png');
  $('#hole_img_6').attr('src', 'img/angular_default.png');
  $('#hole_img_7').attr('src', 'img/node_default.png');
}

// Start Game Play
function startGame(IMAGES) {
  const DIFFICULTY = [1000, 800, 700];
  const REFRESH_MOD = 25;

  // Get difficulty
  var radioButtons = $("#formDifficulty input:radio[name='optDifficulty']");
  var selectedIndex = radioButtons.index(radioButtons.filter(':checked'));
  var timeoutVal = DIFFICULTY[selectedIndex];
  
  var timer = setInterval(() => {
      var time = parseInt($('#time').html());
      // Check to see if game is still in play
      if (time === 0) {
        // Stop the timer
        clearInterval(timer);

        $('#startBtn').hide();
        $('#cancelBtn').hide();
        $('#resetBtn').show();
        $('#exitBtn').show();

        lockBoard();
      } else {
        // Adjust time
        $('#time').html(--time);

        // Display Random Image
        var randHole = `hole_img_${Math.floor(Math.random() * 12)}`;
        var randImage = `img/${getRandomImage(IMAGES)}.png`;
        $(`#${randHole}`).attr('src', `${randImage}`);

        // Clear Image
        setTimeout(() => { 
          $(`#${randHole}`).attr('src', 'img/default.png');
        }, timeoutVal - REFRESH_MOD);
      }
    },
    timeoutVal
  );

  return timer;
}