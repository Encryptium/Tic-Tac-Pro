# Tic-Tac-Pro
An online Tic Tac Toe game using WebSockets.

## Play
You can play the game on the official [Tic Tac Pro Web App](https://Tic-Tac-Pro.jonathan2018.repl.co).

## How To Play
### Host a Game
When you open Tic Tac Pro, you will be greeted by two boxes. These two boxes are very important... choose the right one. If you want to host a game that somebody else joins, click the first `Host Game` button. 

Once you've chose the `Host Game` button, a new page will appear. This time with a `Start Game` button. Click on the button to start the game. 

Another page will appear. You've finally reached the game! At the top, you can see who's turn it is. In the center of the page, is a standard 9x9 Tic Tac Toe board which is hooked to a WebSocket to make the entire game _live_. At the bottom, there is a join code. Give the join code to the person who will join your game and play with you. Go to the [Join a Game](#join-a-game) section to see how to play as the second player. Since you are the host, you will be the first to move. Click on the square where you want to move. Choose wisely! You will notice that the turn will change at the top. Your board will now be locked from being able to move until the other player does first.

**Note:** if you decide to host a game, you will the first player in the Tic Tac Toe game (crosses).

### Join a Game
If you've read the previous section, you will know that there is an option on the home page of Tic Tac Pro. Click on the `Join Game` button to join a game. Make sure you've received the join code from the host. Once you have the join code, copy it into the input box on the join page. Then click `Join as Circle`. It is called that because the second player is the circle, and because you are joining, that means you are the second player. The Tic Tac Toe board will now load. Wait for the host to make the first move. After they do, your board will be unlocked, and it is your turn. 

**Tip:** Look at the turn status at the top of the game.

## Troubleshooting
If you ever get these errors below, follow the steps listed. If you don't know what an error looks like, it is this. A red bar that suddenly shows up at the bottom of the page that has white text on it regarding the error.
### Join Code Error
If you are trying to join a game, and at the bottom of the page, an error pops up, follow these steps.
- Make sure you've typed you code correctly.
- If you've just finished the game with that join code, then that game is deleted. You will not be able to join anymore. Create a new game if you want.
### Connection Error & Update Error
If you are on the game page, and a red error suddenly appears at the bottom which says `Lost connection. Refresh page to reset.`, then DO WHAT IT SAYS! Stop looking here and refresh that page. 
Or you might receive an error which says `An error occured while updating the game. Please Refresh.`, in that case, also refresh the page.

If you're still here, that means you are probably interested. Look at the reasons why this may occur below if you are.
- You may have lost connection (Internet). Check your connection, and refresh.
- WebSocket Failed. The WebSocket may have failed for some random reason, and you just need to refresh.
- Server May Be Down. This will happen very rarely. However, if it ever does, your game will be deleted after the connection is restored. Sorry :(.
