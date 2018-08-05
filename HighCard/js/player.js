/*
 * Script for index.html
 * Used by scripts.js
 */

// Force Strict Mode
"use strict";
 
/*
 * This function creates a Player Object Lit
 * Note: See Card() in card.js for an example of a Constructor function -vs- an Object Lit
 *
 * @param name - Name of Player
 *
 * @return player - Plauer Object Lit
 */
function createPlayer(name) {
    // Player Object Literal
    var player = {
        // Properties / vars
        "name"  : name,
        "score" : 0,
        "card"  : null,
 
        // Behaviors / Functions
        "getName": () => {
            return name;
        },
        "getScore": () => {
            return this.score;
        },
        "setScore": (newScore) => {
            score = newScore;
        },
        "getCard": () => {
            return this.card;
        },
        "setCard": (newCard) => {
            card = newCard;
        }
    };
  
    // Return the new Player
    return player;
}

/*
 * This function allows a Player to join the Game
 * as long as an existing Player doesn't have the same name
 * 
 * @param players - Array of Players
 * @param playerName - Name of Player joining
 * 
 * @return success - true if the Player has joined
 */
function joinGame(players, playerName) {
    var success = true;

    // Don't want a Player name of 'Player'
    if (playerName === 'Player') {
        success = false;
    } else {
        // If we don't have any Players yet, name is good
        if (players.length > 0) {
            // Filter for duplicate name
            var duplicateNames = players.filter((player) => {
                return player.getName() === playerName;
            });

            // Check for duplciate name
            if (duplicateNames.length > 0) {
                success = false;
            }
        }
    }

    return success;
}

/*
 * This function delete a Player from the game
 * (Delete the player from the players Array)
 * 
 * @param players - Array of Players
 * @param playerName - Name of Player to delete
 * 
 * @return filteredPlayers - Array of Players after delete
 */
function deletePlayer(players, playerName) {
    var filteredPlayers = players.filter((player) => player.getName() !== playerName);
    return filteredPlayers;
}

/*
 * This function determines the winner of the hand
 * 
 * @param players - Array of Players
 * 
 * @return theWinner - Name of the Winner
 */
function determineHandWinner(players) {
    var theWinner = '';
    var theIndex = -1;
    var tie = false;

    // Loop throgh Players
    for (var player in players) {
        // Get current Player's Card (2, 3, 4, ..., J, Q, K, A)
       var cardFace = players[player].card.getFace();
       // Loop through all Card Values
       for (var i = 0; i < allCardValues.length; i++) {
           // Check if current value is higher than last high value
           if (cardFace === allCardValues[i]) {
               // If higher, save data for new highest card / Player
               if (i > theIndex) {
                    theIndex = i;
                    theWinner = players[player].getName();
                    tie = false;
               } else if (i == theIndex) {
                    // There is a tie
                    tie = true;
               }
           }
       }
    }

    // Handle a tie = no winner
    if (tie) {
        theWinner = null;
    } else {
        var winningPlayer = players.filter((player) => {
            return player.getName() === theWinner;
        });

        winningPlayer[0].score = winningPlayer[0].score + 1;
    }

    return theWinner;
}

/*
 * This function determines the winner of the game
 * 
 * @param players - Array of Players
 * 
 * @return theWinner - Name of the Winner
 */
function determineGameWinner(players) {
    var theWinner = '';
    var score = -1;
    var tie = false;

    // Loop throgh Players
    for (var player in players) {
        // Get current Player's score
       var playerScore = players[player].score;

       if (playerScore > score) {
            score = playerScore;
            theWinner = players[player].getName();
            tie = false;
        } else if (playerScore == score) {
            // There is a tie
            tie = true;
        }
    }

    // Handle a tie = no winner
    if (tie) {
        theWinner = null;
    }

    return theWinner;
}
