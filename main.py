# MaroonAmbitiousDesigner
from flask import Flask, render_template, request, redirect
from flask_socketio import SocketIO, emit, join_room, send
import os
import uuid
import random

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ['SECRET_KEY']
socket = SocketIO(app)

VERSION = "0.2.0"
games = []

def generate_id_function():
	# generated_id = str(uuid.uuid1())
	generated_id = str(random.randint(1000000, 9999999))

	for game in games:
		if generated_id == game['id']:
			# generated_id = str(uuid.uuid1())
			generate_id_function()
		else:
			continue
	return generated_id

def update_game(game_id):
	# game_id = room.split('?gameid=')[1].split("&")[0]
	for game in games:
		if game_id == game['id']:
			safe_info = game.copy()
			safe_info.pop("cross")
			safe_info['version'] = VERSION
			emit('game_update', safe_info, to=game_id)
			return
	# send('An error occured while updating the game.', to=game_id)
	send('UpdateError', to=game_id)
	# return "An error occured while updating the game."

# def check_status(game_id):
# 	for game in games:
# 		if game_id == game['id']:
# 			for combo in winningCombos:
# 				if game[combo[0]] == game[combo[1]] == game[combo[2]]:
# 					return game[combo[0]]
# 				else:
# 					continue
# 			return None
# 		else:
# 			continue
# 	return None

@socket.on("join")
def handle_player_connection(data):
	# emit('broadcast_connection', {"data": "new_connection"}, broadcast=True)
	# room = data['room'].split('?gameid=')[1].split("&")[0]
	room = data['room']
	join_room(room)
	update_game(room)
	print("Joined Game: " + room);
	send("Player Has Joined Game", to=room)

@socket.on("send_move")
def handle_move(data):
	# room = data['room']
	game_id = data['room']
	# print(game_id)
	move = data['location']
	player = data['player']
	pwd = data['pwd']


	# print(game_id, move, player, pwd)
	for game in games:
		# print(game_id, game['id'])
		if game_id == game['id']:
			if game[move] == None:
				if pwd == "" or pwd == game[player]:
					if player == game['turn']:
						game[move] = player
						if player == "cross":
							game['turn'] = "circle"
						else:
							game['turn'] = "cross"
						send("Move Verfied", to=game_id)
						break
				else:
					send("You are not authorized to perform that move.", to=game_id)
					break
			else:
				send("That spot is already taken!", to=game_id)
				break
	update_game(game_id)
	# emit('new_move', data, to=room)

@socket.on("end_game")
def end_game(game_id):
	# print("delt")
	for game in games:
		if game['id'] == game_id:
			games.remove(game)
			print("Game Deleted: " + game_id)
			return

@socket.on('rematch')
def rematch(data):
	for game in games:
		if game['id'] == data['game_id']:
			emit('error', "Could not rematch")
			return
	
	if data['cross'] == "":
		return

	firstplayer = "circle"

	# Generate random player on rematch
	players = ["circle", "cross"]
	firstplayer = players[random.randint(0, 1)]
		
	games.append({"id": data['game_id'], "cross": data['cross'], "1": None, "2": None, "3": None, "4": None, "5": None, "6": None, "7": None, "8": None, "9": None, "turn": firstplayer})
	send("reload", to=data['game_id'])

@app.route("/")
def index():
	return render_template("index.html")

@app.route("/join", methods=['GET'])
def join():
	error = request.args.get('error')
	
	if error == "invalid":
		return render_template("join.html", error="Invalid Game Code!")
	else: # error == None or error == ""
		return render_template("join.html")
	

@app.route("/game", methods=['GET'])
def game():
	# Don't create game_id var here because it will cause page to crash since there is no .replace attr on None type
	if request.args.get("gameid") == None:
		# return "Invalid Game"
		return redirect("/join")
	else:
		game_id = request.args.get("gameid").replace(" ", "")
		cross = request.args.get("cross")
		# circle = request.args.get("circle")
		for game in games:
			if game_id == game['id']:
				if cross != None and cross == game['cross']:
					return render_template("game.html", pwd=cross, team="cross", gameID=game_id)
				elif cross != None and cross != game['cross']:
					return "Invalid Requirements"		
				else:
					return render_template("game.html", team="circle", gameID=game_id)
			else:
				continue
		return redirect("/join?error=invalid")

@app.route("/init-game")
def init_game():
	# info = request.form.get('info')
	# if info == "newgame":
		# Generated IDs
	if len(games) == 9000000:
		return "Tic Tac Pro is currently unavailable."
	generated_id = generate_id_function()
	cross_password = str(uuid.uuid1())
	# circle_password = str(uuid.uuid1())
	# print(cross_password, circle_password)

	# Default Game Data
	games.append({"id": generated_id, "cross": cross_password, "1": None, "2": None, "3": None, "4": None, "5": None, "6": None, "7": None, "8": None, "9": None, "turn": "cross"})
	print("Created Game: " + generated_id)
	return redirect(f"/game?gameid={generated_id}&cross={cross_password}")

	# return "Error creating game"

@app.route("/host")
def host_game():
	return render_template("new.html")

if __name__ == '__main__':
  socket.run(app, host="0.0.0.0", port=8080)