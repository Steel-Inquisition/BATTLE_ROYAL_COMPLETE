// Global Constants
const NUM_ROWS = 5;
const NUM_COLS = 5;

// Global Variable
let names = [];
let players = [];
let turn = {round: 0, storage: 0, position: [], murders: [], turnsAlive: [], killedBy: [], everything: [], initialGen: true, start: 0, end: (NUM_ROWS*NUM_COLS), scenario: [], cause_of_death: ""};
let log = [];
let save = [];

// Event listener
document.getElementById('game').addEventListener("click", startGame);

// Fetch Content from nickname.txt
fetch("text/names.txt").then(convertData).then(processData);

function convertData(rawData) {
    return rawData.text();
}

function processData(stringData) {
    names = stringData.split(/\r?\n/);
}