const cells = document.querySelectorAll(".game-cell");
var move;

var socket = io();
socket.on('connect', function() {
  socket.emit('join', {room: gameID});
});

// Handle disconnection with server
socket.on('disconnect', function() {
  // window.alert("Lost connection with server.\nRefresh page to reset your connection.");
	showError("Lost connection. Refresh page to reset.");
	// location.reload();
});

socket.on('message', function(data) {
	console.log("Incoming Message: " + data);
});

// socket.on('new_move', function(data) {
// 	move = data['location'];
// 	console.log("Move: " + move);
// 	cells[move-1].classList.add("taken");
// });

socket.on('game_update', function(data) {
	// console.log(data);
	for (var i = 0; i < 9; i++) {
		if (data[i+1] != null) {
			// console.log(data[i+1]);
			cells[i].classList.add(data[i+1]);
		}
	}

	if (checkStatus()) {
		socket.emit('end_game', gameID);
		window.alert(checkStatus().toUpperCase() + " WON!");
		// window.location.href = "/";
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


function sendMove(move) {
	// console.log(move);
	socket.emit('send_move', {room: gameID, player: player, pwd: pwd, location: move});
}