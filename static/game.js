'use strict';

const joinLink = document.querySelector("#code");
const joinContainer = document.querySelector("#code-container");
// join-code
const linkTemplate = `${gameID}`;
//  `Join Code: <span id="code">${gameID}</span>`
const board = document.getElementById("board");

const winningCombos = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [3, 6, 9], [2, 5, 8], [3, 5, 7], [1, 5, 9]];

if (player == "cross") {
	joinLink.innerHTML = linkTemplate;
} else {
	joinLink.innerHTML = "You are playing a game hosted by someone else.";
	joinContainer.remove();
}

function checkStatus() {
	for (var i = 0; i < 8; i++) {
		if ((document.getElementById([winningCombos[i][0]]).className == `game-cell cross`) 
		&& (document.getElementById([winningCombos[i][1]]).className == `game-cell cross`)
		&& (document.getElementById([winningCombos[i][2]]).className == `game-cell cross`)) {
			console.log("hi");
			return "cross";
		} 
		if ((document.getElementById([winningCombos[i][0]]).className == `game-cell circle`) 
		&& (document.getElementById([winningCombos[i][1]]).className == `game-cell circle`)
		&& (document.getElementById([winningCombos[i][2]]).className == `game-cell circle`)) {
			return "circle";
		}
	}

	for (var i = 0; i < 9; i++) {
		if (cells[i].className == 'game-cell') {
			break;
		}

		if (i == 8) {
			return "nobody";
		}
	}
		
	return false;
}

function switchTurn(team) {
	if (team == player) {
		board.disabled = false;
		board.style.pointerEvents = 'auto';
		document.getElementById("turn").innerHTML = "YOU";
	} else {
		board.disabled = true;
		board.style.pointerEvents = 'auto';
		document.getElementById("turn").innerHTML = "OPPONENT";
	}
}

cells.forEach(cell => {
  cell.addEventListener('click', event => {
    sendMove(cell.id);
  });
});