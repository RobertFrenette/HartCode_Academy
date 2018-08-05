/*
 * Script for index.html
 * Used by deck.js
 */

// Force Strict Mode
"use strict";

// var to hold all possible card values for scoring
var allCardValues = [];

/*
 * This is the Card Constructor funct
 * 
 * @param face  - Card's Face (2, 3, 4, ..., J, Q, K, A)
 * @param suite - Card's Suite (Diamonds, Spades, Hearts, Clubs)
 * @param suiteDisplayChar - Char to display for suites (ex: Diamonds = &#9830;)
 * @param value - Card's Value (2, 3, 4, ..., 10)
 */
function Card(face, suite, suiteDisplayChar, value) {
    this.face = face;
    this.suite = suite;
    this.suiteDisplayChar = suiteDisplayChar;
    this.value = value;

    this.getFace = () => {
        return this.face;
    }
    this.getSuite = () => {
        return this.suite;
    }
    this.getSuiteDisplayChar = () => {
        return this.suiteDisplayChar;
    }
    this.getValue = () => {
        return this.value;
    }
}

/*
 * This function is called by deck.js to create an Array of Card Objects
 * and return it to form a Deck of Cards.
 *
 * @return cards  - Array of Card Objects
 */
function getCards() {
    // Array to hold Suites (Diamonds, Spades, Hearts, Clubs)
    var suites = ['diamonds', 'spades', 'hearts', 'clubs'];
    // Array to hold sutie display character
    var suiteDisplayChars = ['&#9830;', '&#9824;', '&#9829;', '&#9827;'];
    // Array to hold non-numeric card faces (Jack, Queen, King, Ace)
    var faceCards = ['&#9821;', '&#9819;', '&#9818;', 'A'];

    // Array to hold Cards
    var cards = [];

    // Loop for each Suite
    var currentSuiteIndex = 0;
    for (var suite in suites) {
        // Loop for numeric cards
        for (var i = 2; i <= 10; i++) {
            cards.push(new Card(i, suites[suite], suiteDisplayChars[currentSuiteIndex], i));
            if (suite == 0) {
                allCardValues.push(i);
            }
        }
        // Loop for non-numeric cards
        for (var face in faceCards) {
            cards.push(new Card(faceCards[face], suites[suite], suiteDisplayChars[currentSuiteIndex], 10));
            if (suite == 0) {
                allCardValues.push(faceCards[face]);
            }
        }
        currentSuiteIndex++;
    }
    
    return cards;
}
