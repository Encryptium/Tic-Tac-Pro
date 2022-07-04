'use strict';

const cells = document.querySelectorAll(".game-cell");
var move;
const turn = document.getElementById("turn");
const turnHeading = document.getElementById("turn-heading");
// const version = document.getElementById("version");

// Initiate socket connection
var socket = io();

// On connect
socket.on('connect', function() {
  socket.emit('join', {room: gameID});
});

// Handle disconnection with server
socket.on('disconnect', function() {
	document.getElementById("watermark").title = "Connection Failed";
	showError("Connection Failed. Please refresh.");
});

socket.on('message', function(data) {
	if (data == "reload") {
		window.location.reload();
	}
	if (data == "UpdateError") {
		showError("Failed to update game. Please refresh.");
	}
});

// Handle new move data
socket.on('game_update', function(data) {
	// version.innerHTML = "Tic Tac Pro v" + data['version'];
	document.getElementById("watermark").title = "Connected!";

	for (var i = 0; i < 9; i++) {
		if (data[i+1] != null) {
			cells[i].classList.add(data[i+1]);
		}
	}

	if (checkStatus()) {
		socket.emit('end_game', gameID);
		turnHeading.innerHTML = "Winner"
		turn.innerHTML = checkStatus().toUpperCase();

		document.getElementById("winner-declaration").style.display = "block";
		document.querySelector("#winner-declaration #header h2").innerHTML = checkStatus().charAt(0).toUpperCase() + checkStatus().slice(1) + " Won!";
		document.querySelector("#winner-declaration p b").innerHTML = checkStatus().charAt(0).toUpperCase() + checkStatus().slice(1);
		
	} else {
		var xcount = 0;
		var ocount = 0;
		for (var i = 0; i < 9; i++) {
			if (data[i+1] == "cross") {
				xcount++;
			}
			else if (data[i+1] == "circle") {
				ocount++;
			}
		}
		if (xcount == ocount) {
			// console.log("Turn of Cross");
			switchTurn("cross");
		} else {
			// console.log("Turn of Circle");
			switchTurn("circle");
		}
	}
});

// Send new move to server
function sendMove(move) {
	// console.log(move);
	socket.emit('send_move', {room: gameID, player: player, pwd: pwd, location: move});
}