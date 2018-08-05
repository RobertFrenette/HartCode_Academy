// Force Strict Mode
"use strict";

// Execute only when document is ready (DOM loaded)
$(document).ready(() => {
  // Array to hold image names
  const IMAGES = ['mongo', 'express', 'angular', 'node'];

  // Var to hold time Interval
  var timer = null;

  // Call funct to build Game Board
  buildBoard(IMAGES);

  // Bind Event Hadlers
  $('#playBtn').click(() => {
    $('#intro').hide();
    $('#gameBoardContainer').show();
  });
  $('#startBtn').click(() => {
    $('#startBtn').hide();
    timer = startGame(IMAGES);
    $('#difficultyDiv').hide();
  });
  $('#cancelBtn').click(() => {
    clearInterval(timer);
    exitBtn.click();
  });
  $('#resetBtn').click(() => {
    $('#gameBoard').html('');
    $('#difficultyDiv').show();
    $('#resetBtn').hide();
    $('#exitBtn').hide();
    $('#startBtn').show();
    $('#cancelBtn').show();
    $('#score').html('0');
    $('#time').html('60');
    buildBoard(IMAGES);
  });
  $('#exitBtn').click(() => {
    $('#gameBoardContainer').hide();
    $('#resetBtn').click();
    $('#intro').show();
  });
});