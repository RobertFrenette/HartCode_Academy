/*
 * Script for index.html
 * required by deck.js
 */

// Force Strict Mode
"use strict";

/*
 * function to create Cards
 * 
 * @param   face  - 2, 3, ... 10, J, Q, K, A
 * @param   suite - Diamonds, Spades, Hearts, Clubs
 * @param   value - index of Card in Array before being shuffled (0, 1, 2, ..., 12)
 * 
 * @return card A new Card Object
 */
function createCard(face, suite, value) {
  var card = {
      // Props
      "face": face,
      "suite": suite,
      "value": value,
      
      // Behaviors
      "getFace": function() {
        return this.face;
      },
      "getSuite": function() {
        return this.suite;
      },
      "getValue": function() {
        return this.value;
      }
    };

  // Return the new Card
  return card;
}

/*
 * This function is called by deck.js to create an Array of Card Objects
 * and return it to form a Deck of Cards.
 *
 * @return cards  - Array of Card Objects
 */
function getCards() {
  // Array to hold Suites
  var suites = ['Diamonds', 'Spades', 'Hearts', 'Clubs'];
  // Array to hold non-numeric card faces 
  var faceCards = ['J', 'Q', 'K', 'A'];

  // Array to hold Cards
  var cards = [];

  // Loop for each Suite
  var currentCardIndex = 0;
  for (var suite in suites) {
    // Loop for numeric cards
    for (var i = 2; i <= 10; i++) {
        cards.push(createCard(i, suites[suite], currentCardIndex));
        currentCardIndex++;
    }
    // Loop for non-numeric cards
    for (var face in faceCards) {
        cards.push(createCard(faceCards[face], suites[suite], currentCardIndex));
        currentCardIndex++;
    }
    currentCardIndex = 0;
}

  // Return Array of Card Objects
  return cards;
}