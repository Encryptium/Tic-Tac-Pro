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
		// console.log(cells[winningCombos[i][0]]);
		// console.log(cells[winningCombos[i][1]]);
		// console.log(cells[winningCombos[i][2]]);

		// console.log(`${cells[winningCombos[i][0]-1].className} ${cells[winningCombos[i][2]-1].className} ${cells[winningCombos[i][0]-1].className}`);

		if ((document.getElementById([winningCombos[i][0]]).className == `game-cell cross`) 
		&& (document.getElementById([winningCombos[i][1]]).className == `game-cell cross`)
		&& (document.getElementById([winningCombos[i][2]]).className == `game-cell cross`)) {
			return "cross";
		} 
		else if ((document.getElementById([winningCombos[i][0]]).className == `game-cell circle`) 
		&& (document.getElementById([winningCombos[i][1]]).className == `game-cell circle`)
		&& (document.getElementById([winningCombos[i][2]]).className == `game-cell circle`)) {
			return "circle";
		}
	}

	for (var i = 0; i < 9; i++) {
		// var j = i+1;
		if (cells[i].className == 'game-cell') {
			// console.log("9");
			// continue;
			break;
		}
		// } else {
		// 	break;
		// }

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
		board.style.pointerEvents = 'none';
		document.getElementById("turn").innerHTML = "OPPONENT";
	}
}

cells.forEach(cell => {
  cell.addEventListener('click', event => {
    sendMove(cell.id);
  });
});