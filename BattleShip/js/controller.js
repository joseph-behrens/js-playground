'use strict';

let {model} = require('./model');
let {view} = require('./view');

function hanldeFireButton() {
    let guessInput = document.getElementById('guessInput');
    let guess = guessInput.value;
    controller.processGuess(guess);
    guessInput.value = "";
}

function handleKeyPress(event) {
    if (event.keyCode == 13 || event.which == 13) {
        let guessInput = document.getElementById('guessInput');
        let guess = guessInput.value;
        controller.processGuess(guess);
        guessInput.value = "";
    }
}

function parseGuess(guess) {
    const alphabet = ["A", "B", "C", "D", "E", "F", "G"];

    if (guess === null || guess.length !== 2) {
        alert("That's off the board, please make another guess." + guess);
    } else {
        let firstChar = guess.charAt(0).toUpperCase();
        let row = alphabet.indexOf(firstChar);
        let column = guess.charAt(1);

        if (isNaN(row) || isNaN(column)) {
            alert("That's off the board, please make another guess." + guess);
        } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
            alert("That's off the board, please make another guess." + guess);
        } else {
            return row + column;
        }
    }
    return null;
}

let controller = {
    guesses: 0,
    processGuess: function(guess) {
        var location = parseGuess(guess);
        if (location) {
            this.guesses++;
            let hit = model.fire(location);
            if (hit && model.shipsSunk === model.numShips) {
                view.displayMessage("You sank all my battleships in " + this.guesses + " guesses!");
                view.hideForm();
            }
        }
    },
    init: function() {
        document.getElementById('fireButton').onclick = hanldeFireButton;
        document.getElementById('guessInput').onkeypress = handleKeyPress(event);
        model.generateShipLocations();
    }
}

module.exports = {
    controller: controller
}