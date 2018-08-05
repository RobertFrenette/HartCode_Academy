/*
 * Script for index.html
 * Used by scripts.js
 * Requires card.js
 */

// Force Strict Mode
"use strict";

/*
 * This function shuffles an existing Deck of Cards
 * See: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array#
 *
 * @param deck  - deck of cards to shuffle
 *
 * @return deck - deck of shuffled cards
 */
function shuffleDeck(deck) {
    for (var i = deck.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

/*
 * This function is called by scripts.js to create a Deck of Cards and return it.
 *
 * @return deck - Array of Cards
 */
function getDeck() {
    // Arry to hold Deck of Card Object Literals
    // Note: Should be Card Objects after Constructor functs are covered in class!
    // getCards() is in card.js
    var deck = getCards();

    // Shuffle cards before returning
    return shuffleDeck(deck);
}
