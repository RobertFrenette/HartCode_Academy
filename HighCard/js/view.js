/*
 * Script for index.html
 * Used by scripts.js
 */

// Force Strict Mode
"use strict";

/*
 * This function display the card on the page, for the proper Player
 * 
 * @param card - The card to display
 * @param ele  - The Element to display it in
 */
function showPlayerCard(card, ele) {
  ele.html('')
      .append(
          $('<div>')
              .attr('class', 'playing-card-body')
              .append(
                  $('<h5>')
                      .attr('class', `card-title ${card.getSuite()}`)
                      .append(
                          $('<span>')
                              .attr('class', `face`)
                              .append(card.getFace())
                      )
                      .append(
                          $('<span>')
                              .attr('class', `suite`)
                              .append(card.getSuiteDisplayChar())
                      )
                      .append(
                          $('<span>')
                              .attr('class', `points`)
                              .append(card.getValue())
                      )
                      .show()
              )
      );
}

/*
* This dfunction displays dicarded cards
* 
* @param discardedCards - Array of discarded cards
* @param discardedCardsDiv - Element to display cards in
*/
function showDiscardedCards(discardedCards, discardedCardsDiv) {
  discardedCardsDiv.html('');

  for (var card in discardedCards) {
      discardedCardsDiv
          .append(
              $('<span>')
                  .attr('class', `small-card ${discardedCards[card].getSuite()}`)
                  .append(
                      $('<span>')
                          .append(`${discardedCards[card].getFace()}${discardedCards[card].getSuiteDisplayChar()}`)
                  )
                  .show()
          );
  }
}

/*
* This function display the Joker card on the page, for the proper Player
* 
* @param ele  - The Element to display it in
*/
function showJoker(ele) {
  ele
      .html('')
      .append(
          $('<img>')
          .attr('src', 'img/card_joker.png')
          .attr('class', 'joker')
      );
}

/*
 * This function clears the Player passed by playerIndx
 * 
 * @param playerIndex - Index of Player to clear
 */

function clearPlayer(playerIndx) {
  switch (playerIndx) {
      case 1:
          $('#playerOneNameText').html('Player');
          $('#playerOneName').val('');
          $('#playerOneScore').html('');
          $('#playerOneCardDiv').html('');
          $('#playerOneForm').show();
          $('#playerOneLeave').hide();
          break;
      case 2:
          $('#playerTwoNameText').html('Player');
          $('#playerTwoName').val('');
          $('#playerTwoScore').html('');
          $('#playerTwoCardDiv').html('');
          $('#playerTwoForm').show();
          $('#playerTwoLeave').hide();
          break;
      case 3:
          $('#playerThreeNameText').html('Player');
          $('#playerThreeName').val('');
          $('#playerThreeScore').html('');
          $('#playerThreeCardDiv').html('');
          $('#playerThreeForm').show();
          $('#playerThreeLeave').hide();
          break;
  }
}

/*
 * This function updates the Score for the Player who won the hand
 * 
 * @param players - Array of players
 * @param theWinner - Name of the winner
 */
function setScore(players, theWinner) {
    var winningPlayer = players.filter((player) => {
        return player.getName() === theWinner;
    });

    var score = winningPlayer[0].score;

    if ($('#playerOneNameText').html() === theWinner) {  
        $('#playerOneScore').html(`(${score})`);
    } else if ($('#playerTwoNameText').html() === theWinner) {   
        $('#playerTwoScore').html(`(${score})`);
    } else if ($('#playerThreeNameText').html() === theWinner) {   
        $('#playerThreeScore').html(`(${score})`);
    }
}