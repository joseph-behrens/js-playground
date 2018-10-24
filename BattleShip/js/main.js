'use strict';

let {model} = require('./model');
let {view} = require('./view');
let {controller} = require('./controller');

window.onload = function () {
    view.buildTable(model.boardSize);
    controller.init();
};