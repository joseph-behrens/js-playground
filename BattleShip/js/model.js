'use strict';

let {view} = require('./view');

let model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,
    // TODO: Randomize ship location
    ships: [
        {
            locations: ['10', '20', '30'],
            hits: ['', '', '']
        },
        {
            locations: ['32', '33', '34'],
            hits: ['', '', '']
        },
        {
            locations: ['63', '64', '65'],
            hits: ['', '', '']
        }  
    ],
    fire: function (guess) {
        for (let i = 0; i < this.numShips; i++) {
            let ship = this.ships[i];
            let index = ship.locations.indexOf(guess);
            if (index >= 0) {
                ship.hits[index] = 'hit';
                view.displayHitMiss(guess, 'hit');
                view.displayMessage('HIT!');
                if (this.isSunk(ship)) {
                    view.displayMessage('You sank my Battleship!!');
                    this.shipsSunk++
                }
                return true;
            }
        }
        view.displayHitMiss(guess, 'miss');
        view.displayMessage('You missed.');
        return false;
    },
    isSunk: function (ship) {
        for (let i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== 'hit') {
                return false;
            }
        }
        return true;
    }
};

module.exports = {
    model: model
}