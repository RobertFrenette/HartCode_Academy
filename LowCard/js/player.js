/*
 * Script for index.html
 * required by scripts.js
 */

// Force Strict Mode
"use strict";

/*
 * function to create Players
 * 
 * @param   playerName  name of Player
 * @return  player      new Player Object
 */
function createPlayer(playerName) {
    console.log(`Creating Player: ${playerName}.`);

    // Player Object Literal
    var player = {
        // Properties
        "name": playerName,
        "score": 0,

        // Behaviors
        "getName": function() {
            return this.name;
        },
        "setScore": function(newScore) {
            this.score = newScore;
        },
        "getScore": function() {
            return this.score;
        }
    };
    // Return the Player
    return player;
}