# MaroonAmbitiousDesigner
from flask import Flask, render_template, request, redirect, session
from flask_socketio import SocketIO, emit, join_room, send
import os
import random

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ['SECRET_KEY']
socket = SocketIO(app)

VERSION = "1.1.0"
games = []

def generate_id_function():
	generated_id = str(random.randint(1000000, 9999999))

	for game in games:
		if generated_id == game['id']:
			generate_id_function()
		else:
			continue
	return generated_id

def update_game(game_id):
	for game in games:
		if game_id == game['id']:
			safe_info = game.copy()
			safe_info['version'] = VERSION
			emit('game_update', safe_info, to=game_id)
			return
	send('UpdateError', to=game_id)

@socket.on("join")
def handle_player_connection(data):
	room = data['room']
	join_room(room)
	update_game(room)
	print("Joined Game: " + room);
	send("Player Has Joined Game", to=room)

@socket.on("send_move")
def handle_move(data):
	game_id = data['room']
	move = data['location']
	player = data['player']
	pwd = data['pwd']


	for game in games:
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

@socket.on("end_game")
def end_game(game_id):
	for game in games:
		if game['id'] == game_id:
			games.remove(game)
			print("Game Deleted: " + game_id)
			session.clear()
			return

@app.route("/")
def index():
	return render_template("index.html")

@app.route("/join", methods=['GET'])
def join():
	error = request.args.get('error')
	
	if error == "invalid":
		return render_template("join.html", error="Invalid Game Code!")
	else:
		return render_template("join.html")
	

@app.route("/game", methods=['GET'])
def game():
	# Don't create game_id var here because it will cause page to crash since there is no .replace attr on None type
	if request.args.get("gameid") == None:
		return redirect("/join")
	else:
		# Client side pin
		game_id = request.args.get("gameid").replace(" ", "")
		
		for game in games:
			if game_id == game['id']:
				if ((game_id + "IsHost") in session) and (session[game_id + "IsHost"] == "true"):
					return render_template("game.html", team="cross", gameID=game_id)
				else:
					return render_template("game.html", team="circle", gameID=game_id)
			else:
				continue
		return redirect("/join?error=invalid")

@app.route("/init-game")
def init_game():
	# Game unavailable if ran out of game codes
	if len(games) == 9000000:
		return "Tic Tac Pro is currently unavailable."
		
	generated_id = generate_id_function()

	# Default Game Data
	session[generated_id+"IsHost"] = "true"
	games.append({"id": generated_id, "1": None, "2": None, "3": None, "4": None, "5": None, "6": None, "7": None, "8": None, "9": None, "turn": "cross"})
	print("Created Game: " + generated_id)
	return redirect(f"/game?gameid={generated_id}")

@app.route("/privacy")
def privacy_policy():
	return render_template("privacy_policy.html")

if __name__ == '__main__':
  socket.run(app, host="0.0.0.0", port=8080, debug=True)