/*
 * Script for index.html
 * Requires:
 *  - player.js
 *  - deck.js
 */

// Force Strict Mode
"use strict";

/*
 * function to init game
 * 
 * @param players Array of Players
 */
function initGame(players) {
    // Show Players
    $('#players').show();
  
    // Show Dealer if we have 3 Players
    if (players.length === 3) {
        console.log('Game is initialized. Ready to deal!');
        $('#resetButton').show();
        $('#dealer').show();
    } else {
        console.log(`Need ${3 - players.length} more players(s) to start game.`);
    }
}

/*
 * function checks for exsiting Player Name
 * 
 * @param players Array of Players
 * @param playerName Name of Player to check
 * 
 * @return true if Player Name is alredy taken
 */
function playerExists(players, playerName) {
    var exists = false;

    if (players.length > 0) {
        var filteredPlayers = players.filter((player) => player.getName() === playerName);
        if (filteredPlayers.length > 0) {
            alert(`Player Name ${playerName} already taken.`);
            exists = true;
        }
    }

    return exists;
}

/* 
 * function to find winner of game
 * 
 * @param players Players
 */
function findGameWinner(players) {
    var winnerName = '';
    var winningScore = 0;

    // Find the winner
    // TBD: Need to account for a tie!
    for (var i = 0; i < players.length; i++) {
        if (players[i].getScore() > winningScore) {
            winningScore = players[i].getScore();
            winnerName = players[i].getName();
        }
    }
    alert(`Game Over! The winner is ${winnerName}!`);
}

/*
 * function to find winner of hand
 * @param players Players
 * @param hand Array of Cards in Play
 */
function findHandWinner(players, cards) {
    var winnerName = '';
    var winningIndex = -1;
    var winningValue = 51;

    // Find the winner
    // TBD: Need to account for a tie!
    for (var i = 0; i < cards.length; i++) {
        // find lowest card
        if (cards[i].getValue() < winningValue) {
            winningIndex = i;
            winningValue = cards[i].getValue();
        }
    }

    winnerName = players[winningIndex].getName();
    players[winningIndex].setScore(players[winningIndex].getScore() + 1);
    alert(`The winner of the Hand is ${winnerName}!`);

    if (winnerName === $('#playerOneDisplayName').html()) {        
        $('#playerOneDisplayScore').html(`(${players[winningIndex].getScore()})`);
    } else if (winnerName === $('#playerTwoDisplayName').html()) {
        $('#playerTwoDisplayScore').html(`(${players[winningIndex].getScore()})`);
    } else if (winnerName === $('#playerThreeDisplayName').html()) {
        $('#playerThreeDisplayScore').html(`(${players[winningIndex].getScore()})`);
    }
}

/*
 * This function deals cards to the Players
 *
 * @param deck            - The Deck (Array of Cards)
 * @param discardedCards  - Discarded Cards
 * @param players         - The Array of Players
 */
function deal(deck, players, discardedCards) {
    var cardsInPlay = [];

    for (var player in players) {
        // Get new Card
        var card = deck.shift();
        cardsInPlay.push(card);

        discardedCards.push(card);

        if (players[player].getName() === $('#playerOneDisplayName').html()) {        
            $('#playerOneCard').html(`${card.getFace()} ${card.getSuite()}`);
        } else if (players[player].getName() === $('#playerTwoDisplayName').html()) {
            $('#playerTwoCard').html(`${card.getFace()} ${card.getSuite()}`);
        } else if (players[player].getName() === $('#playerThreeDisplayName').html()) {
            $('#playerThreeCard').html(`${card.getFace()} ${card.getSuite()}`);
        }
    }

    $('#cardsInDeck').html(`${deck.length}`);
    $('#cardsDiscarded').html(`${discardedCards.length}`);

    findHandWinner(players, cardsInPlay);
}

// Execute only when document is ready (DOM loaded)
$(document).ready(() => {
    console.log('Document Ready...');

    // Array to hold Player Objects
    var players = [];
    // Array to hold Card Objects
    var deck = getDeck(); // getDeck() function in deck.js
    console.log(deck);
    $('#cardsInDeck').html(`${deck.length}`);
    // Array for Discarded Cards
    var discardedCards = [];

    // Bind Click Event Hanlder to playerOneForm Submit
    $('#playerOneForm').submit((e) => {
        // Prevent Default Form Submit Behavior
        e.preventDefault();

        console.log('playerOneForm Submitted.');

        // check to ensure User Name Entered
        if ($('#playerOneName').val() === '') {
            alert('Enter a name for PlayerOne');
        } else {
            // Check for existing Player Name
            if (! playerExists(players, $('#playerOneName').val())) {
                // Create Player and add to Game
                var player = createPlayer($('#playerOneName').val());
                players.push(player);

                // Display Player
                $('#playerOneDisplayName').text(player.getName());
                $('#playerOneDisplayScore').text(`(${player.getScore()})`);

                initGame(players);
                $('#playerOneHeader').show();
                
                $('#playerOneFormSubmitBtn').hide();
            }
        }
    });
    // Bind Click Event Hanlder to playerTwoForm Submit
    $('#playerTwoForm').submit((e) => {
        // Prevent Default Form Submit Behavior
        e.preventDefault();

        console.log('playerTwoForm Submitted.');

        // check to ensure User Name Entered
        if ($('#playerTwoName').val() === '') {
            alert('Enter a name for PlayerTwo');
        } else {
            // Check for existing Player Name
            if (! playerExists(players, $('#playerTwoName').val())) {
                // Create Player and add to Game
                var player = createPlayer($('#playerTwoName').val());
                players.push(player);

                // Display Player
                $('#playerTwoDisplayName').text(player.getName());
                $('#playerTwoDisplayScore').text(`(${player.getScore()})`);

                initGame(players);
                $('#playerTwoHeader').show();
                
                $('#playerTwoFormSubmitBtn').hide();
            }
        }
    });
    // Bind Click Event Hanlder to playerThreeForm Submit
    $('#playerThreeForm').submit((e) => {
        // Prevent Default Form Submit Behavior
        e.preventDefault();

        console.log('playerThreeForm Submitted.');

        // check to ensure User Name Entered
        if ($('#playerThreeName').val() === '') {
            alert('Enter a name for PlayerThree');
        } else {
            // Check for existing Player Name
            if (! playerExists(players, $('#playerThreeName').val())) {
                // Create Player and add to Game
                var player = createPlayer($('#playerThreeName').val());
                players.push(player);

                // Display Player
                $('#playerThreeDisplayName').text(player.getName());
                $('#playerThreeDisplayScore').text(`(${player.getScore()})`);

                initGame(players);
                $('#playerThreeHeader').show();
                
                $('#playerThreeFormSubmitBtn').hide();
            }
        }
    });


    // Bind Click Event handler to Deal Button
    $('#dealButton').click(() => {
        console.log('Dealing...');

        // Check to ensure we have enough cards to deal to Players
        if (deck.length >= players.length) {
            // Deal a new hand
            deal(deck, players, discardedCards);
        } else {
            findGameWinner(players);
        }
    });


    // Bind Click Event Handler to "New Game" button
    $('#resetButton').click(() => {
        console.log('Resetting Game...');

        players = [];
        deck = getDeck();

        $('#cardsInDeck').html(`${deck.length}`);
        $('#cardsDiscarded').html('0')

        $('#playerOneName').val('');
        $('#playerTwoName').val('');
        $('#playerThreeName').val('');

        $('#playerOneDisplayName').html('');
        $('#playerOneDisplayScore').html('');
        $('#playerTwoDisplayName').html('');
        $('#playerTwoDisplayScore').html('');
        $('#playerThreeDisplayName').html('');
        $('#playerThreeDisplayScore').html('');

        $('#playerOneCard').html('_');
        $('#playerTwoCard').html('_');
        $('#playerThreeCard').html('_');

        $('#playerOneHeader').hide();
        $('#playerTwoHeader').hide();
        $('#playerThreeHeader').hide();
        $('#players').hide();

        $('#resetButton').hide();
        $('#dealer').hide();

        $('#playerOneFormSubmitBtn').show();
        $('#playerTwoFormSubmitBtn').show();
        $('#playerThreeFormSubmitBtn').show();
    });
});
 