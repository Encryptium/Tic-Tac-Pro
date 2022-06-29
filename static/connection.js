'use strict';

const cells = document.querySelectorAll(".game-cell");
var move;
const turn = document.getElementById("turn");
const turnHeading = document.getElementById("turn-heading");
const rematch = document.getElementById("rematch-btn");
const version = document.getElementById("version");

// Remove rematch option if player is 2nd
if (player == "circle") {
	rematch.remove();
}

// Initiate socket connection
var socket = io();

// On connect
socket.on('connect', function() {
  socket.emit('join', {room: gameID});
	// Check if game is rematch
	if (type == "rematch") {
		// console.log();
		window.alert("Rematch Declared!");
	}
});

// Handle disconnection with server
socket.on('disconnect', function() {
  // window.alert("Lost connection with server.\nRefresh page to reset your connection.");
	showError("Connection Failed. Please refresh.");
	// location.reload();
});

socket.on('message', function(data) {
	// console.log("Incoming Message: " + data);
	if (data == "reload") {
		// console.log("reload");
		if (player == "circle") {
			// window.alert("Rematch Declared!");
			window.location.href = `/game?gameid=${gameID}&type=rematch`;
		} else {
			window.location.reload();
		}
	}
	if (data == "UpdateError") {
		showError("Failed to update game. Please refresh.");
	}
});

// socket.on('new_move', function(data) {
// 	move = data['location'];
// 	console.log("Move: " + move);
// 	cells[move-1].classList.add("taken");
// });

// Handle new move data
socket.on('game_update', function(data) {
	// console.log(data);
	version.innerHTML = "Tic Tac Pro v" + data['version'];

	for (var i = 0; i < 9; i++) {
		if (data[i+1] != null) {
			// +1
			// console.log(data[i+1]);
			cells[i].classList.add(data[i+1]);//+1
		}
	}

	if (checkStatus()) {
		socket.emit('end_game', gameID);
		// window.alert(checkStatus().toUpperCase() + " WON!");
		// window.location.href = "/";
		turnHeading.innerHTML = "Winner"
		turn.innerHTML = checkStatus().toUpperCase();

		if (player == "cross") {
			rematch.style.display = 'inline';
		}

		window.alert(checkStatus().toUpperCase() + " WON!");
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

	//  else {
	// 	if () {
			
	// 	}
	// }
});

// socket.on('win', function(data) {
// 	console.log(data);
// });	

// Send new move to server
function sendMove(move) {
	// console.log(move);
	socket.emit('send_move', {room: gameID, player: player, pwd: pwd, location: move});
}

rematch.addEventListener('click', () => {
	socket.emit('rematch', {game_id: gameID, player: player, cross: pwd});
});