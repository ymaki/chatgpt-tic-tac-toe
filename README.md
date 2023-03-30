# ChatGPT Tic Tac Toe

This is a Tic Tac Toe game that can be played in the browser. The game includes a feature to play against an AI that uses the minimax algorithm. The code was written by ChatGPT using the GPT-3.5 language model.

## Demo Site

The game can be played at the following URL: https://tic-tac-toe.lab.amuyikam.work/

## How to Play

- The game is played on a 3x3 grid.
- One player is X and the other player is O.
- Players take turns placing their mark (X or O) on an empty square.
- The first player to get 3 marks in a row (horizontally, vertically, or diagonally) wins.
- If all squares are filled and no player has won, the game is a draw.

## How to Play Against the AI

- The game starts with the human player as X and the AI as O.
- Click on an empty square to place your mark.
- If you win or the game ends in a draw, a message will appear and the game will reset.
- After you place your mark, it will be the AI's turn to place its mark.
- The AI will always play to win, or to draw if winning is not possible.

## Technical Details

The game is implemented using HTML, CSS, and JavaScript. The game board is created using CSS Grid, and the minimax algorithm is used to implement the AI. The minimax algorithm is a recursive algorithm that generates all possible game states and determines the best move for the AI based on those states.

## Model

The code was written using the GPT-3.5 language model, which is a variant of the GPT-3 model developed by OpenAI. GPT-3.5 is a language model that uses a transformer-based architecture to generate natural language text.

## Acknowledgements

The minimax algorithm implementation was adapted from this tutorial by Eric Jang.