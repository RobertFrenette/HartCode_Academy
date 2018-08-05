/*
 * Script for index.html
 * Requires deck.js
 */

// Force Strict Mode
"use strict";
 
/*
 * This function deals cards to the Players
 *
 * @param deck            - The Deck (Array of Cards)
 * @param discardedCards  - Discarded Cards
 * @param players         - The Array of Players
 */
function deal(deck, players, discardedCards) {
    for (var player in players) {
        // If cards previously delt, discard them
        if (players[player].card) {
            discardedCards.push(players[player].card);
        }

        // Check to ensure we have enough cards to deal to Players
        if (deck.length >= players.length) {
            // Get new Card
            var card = deck.shift();
            players[player].card = card;

            // HTML element to append card to
            var ele = null;
            
            if (players[player].getName() === $('#playerOneNameText').html()) {        
                ele = $('#playerOneCardDiv');
            } else if (players[player].getName() === $('#playerTwoNameText').html()) {
                ele = $('#playerTwoCardDiv');
            } else if (players[player].getName() === $('#playerThreeNameText').html()) {
                ele = $('#playerThreeCardDiv');
            }
            showPlayerCard(card, ele);
        } else {
            // Player One
            if ($('#playerOneNameText').html() === 'Player') {        
                $('#playerOneForm').hide();
                showJoker($('#playerOneCardDiv'));
            }
            $('#playerOneLeave').hide();
            // Player Two
            if ($('#playerTwoNameText').html() === 'Player') {        
                $('#playerTwoForm').hide();
                showJoker($('#playerTwoCardDiv'));
            }
            $('#playerTwoLeave').hide();
            // Player Three
            if ($('#playerThreeNameText').html() === 'Player') {        
                $('#playerThreeForm').hide();
                showJoker($('#playerThreeCardDiv'));
            }
            $('#playerThreeLeave').hide();

            clearSuccessMsg();
    
            showErrMsg(`Game Over! Not enough cards left in the deck to deal to ${players.length} players.`)

            $('#dealerBtn').hide();
        }
    }

    $('#cardsRemaining').html(`(${deck.length})`);

    if (deck.length >= players.length) {
        // Determine winner of hand
        var theWinner = determineHandWinner(players);
        if (theWinner) {
            $('#successMsg').html(`And the winner of the hand is... ${theWinner}!`);
            setScore(players, theWinner);
        } else {
            $('#successMsg').html(`No winner... There was a tie.`);
        }
    } else {
        // Determine winner of game
        var theWinner = determineGameWinner(players);
        if (theWinner) {
            $('#successMsg').html(`And the winner of the game is... ${theWinner}!`);
        } else {
            $('#successMsg').html(`No winner... There was a tie.`);
        }
    }
    $('#successMsg').show();

    // Show Discarded Cards
    showDiscardedCards(discardedCards, $('#discardedCardsDiv'));
    $('#cardsDiscarded').html(`(${discardedCards.length})`);
}

/*
 * This function ensures there are at least two Players
 * 
 * @param players - Array of Players
 */
function enableGame(players) {
    clearErrMsg();

    if (players.length > 1) {
        $('#dealerBtn').show();
        $('#newGameBtn').show();
    } else {
        showErrMsg('There must be at least two Players to play the game.');
        $('#dealerBtn').hide();
    }
}

// Clear Error Message
function clearErrMsg() {
    $('#errMsg').html('');
    $('#errMsg').hide();
}

// Show Error Messsae, passed as msg param
function showErrMsg(msg) {
    $('#errMsg').html(msg);
    $('#errMsg').show();
}

// Clear Success Message
function clearSuccessMsg() {
    $('#successMsg').html('');
    $('#successMsg').hide();
}
 
// Execute only when document is ready (DOM loaded)
$(document).ready(() => {
    // Call getDeck() in deck.js to get Deck of Cards
    var deck = getDeck();

    // Array for Discarded cards
    var discardedCards = [];
 
    // Array to hold Players
    var players = [];

    $('#cardsRemaining').html(`(${deck.length})`);
    $('#cardsDiscarded').html(`(${discardedCards.length})`);

    // Bind Event Handlers
    $('#playerOneForm').submit((e) => {
        // Prevent Default Form Submit Behavior
        e.preventDefault();

        clearErrMsg();

        // Ensure unique Player name
        if (joinGame(players, $('#playerOneName').val())) {
            players.push(createPlayer($('#playerOneName').val()));
            $('#playerOneForm').hide();
            $('#playerOneNameText').html($('#playerOneName').val());
            // Show Joker 
            showJoker($('#playerOneCardDiv'));
            $('#playerOneCardDiv').show();
            $('#playerOneScore')
                .html(`(${players[players.length - 1].score})`)
                .show();
            $('#playerOneLeave').show();
            enableGame(players);
        } else {
            // Show error msg
            showErrMsg('Please pick a different name.');
        }
    });
    $('#playerTwoForm').submit((e) => {
        // Prevent Default Form Submit Behavior
        e.preventDefault();

        clearErrMsg();

        // Ensure unique Player name
        if (joinGame(players, $('#playerTwoName').val())) {
            players.push(createPlayer($('#playerTwoName').val()));
            $('#playerTwoForm').hide();
            $('#playerTwoNameText').html($('#playerTwoName').val());        
            // Show Joker 
            showJoker($('#playerTwoCardDiv'));
            $('#playerTwoCardDiv').show();
            $('#playerTwoScore')
                .html(`(${players[players.length - 1].score})`)
                .show();
            $('#playerTwoLeave').show();
            enableGame(players);
        } else {
            // Show error msg
            showErrMsg('Please pick a different name.');
        }
    });
    $('#playerThreeForm').submit((e) => {
        // Prevent Default Form Submit Behavior
        e.preventDefault();

        clearErrMsg();

        // Ensure unique Player name
        if (joinGame(players, $('#playerThreeName').val())) {
            players.push(createPlayer($('#playerThreeName').val()));
            $('#playerThreeForm').hide();
            $('#playerThreeNameText').html($('#playerThreeName').val());
            // Show Joker 
            showJoker($('#playerThreeCardDiv'));        
            $('#playerThreeCardDiv').show();
            $('#playerThreeScore')
                .html(`(${players[players.length - 1].score})`)
                .show();
            $('#playerThreeLeave').show();
            enableGame(players);
        } else {
            // Show error msg
            showErrMsg('Please pick a different name.');
        }
    });

    // Deal Cards
    $('#dealerBtn').click(() => {
        deal(deck, players, discardedCards);
    });

    // Process Leave Game
    $('#playerOneLeave').click(() => {
        // Discard current card
        var filteredPlayers = players.filter((player) => player.getName() === $('#playerOneNameText').html());
        discardedCards.push(filteredPlayers[0].card);

        showDiscardedCards(discardedCards, $('#discardedCardsDiv'));
        $('#cardsDiscarded').html(`(${discardedCards.length})`);

        // Delete Player
        players = deletePlayer(players,$('#playerOneNameText').html());

        // Clear Elements
        clearPlayer(1);

        enableGame(players);
    });
    $('#playerTwoLeave').click(() => {
        // Discard current card
        var filteredPlayers = players.filter((player) => player.getName() === $('#playerTwoNameText').html());
        discardedCards.push(filteredPlayers[0].card);

        showDiscardedCards(discardedCards, $('#discardedCardsDiv'));
        $('#cardsDiscarded').html(`(${discardedCards.length})`);

        // Delete Player
        players = deletePlayer(players,$('#playerTwoNameText').html());

        clearPlayer(2);

        showDiscardedCards(discardedCards, $('#discardedCardsDiv'));
        $('#cardsDiscarded').html(`(${discardedCards.length})`);

        enableGame(players);
    });
    $('#playerThreeLeave').click(() => {
        // Discard current card
        var filteredPlayers = players.filter((player) => player.getName() === $('#playerThreeNameText').html());
        discardedCards.push(filteredPlayers[0].card);

        showDiscardedCards(discardedCards, $('#discardedCardsDiv'));
        $('#cardsDiscarded').html(`(${discardedCards.length})`);

        // Delete Player
        players = deletePlayer(players,$('#playerThreeNameText').html());

        clearPlayer(3);

        showDiscardedCards(discardedCards, $('#discardedCardsDiv'));
        $('#cardsDiscarded').html(`(${discardedCards.length})`);

        enableGame(players);
    });

    $('#newGameBtn').click(() => {
        // Reset Arrays
        deck = getDeck();
        discardedCards = [];
        players = [];

        // Reset the Elements
        for (var i = 1; i <= 3; i++) {
            clearPlayer(i);
        }

        $('#dealerBtn').hide();
        $('#newGameBtn').hide();

        clearErrMsg();

        clearSuccessMsg();

        $('#discardedCardsDiv').html('');

        $('#cardsRemaining').html(`(${deck.length})`);
        $('#cardsDiscarded').html(`(${discardedCards.length})`);
    });
 });
 