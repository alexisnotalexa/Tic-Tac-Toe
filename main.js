/*
  Tic Tac Toe Game by Alexis Okamura
*/
var tictactoe = (function() {
  var player, comp, winner = '', board, activePlayer, result;
  var x = '<i class="fa-inverse fa fa-times fa-5x"></i>';
  var o = '<i class="fa-inverse fa fa-circle-o fa-5x"></i>';
  var winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  $('#x').on('click', function() {
    player = 1;
    comp = -1;
    $('.modal-backdrop').hide();
    startGame();
  });

  $('#o').on('click', function() {
    player = -1;
    comp = 1;
    $('.modal-backdrop').hide();
    startGame();
  });

  function startGame() {
    resetGame();
    takeTurns();
  }

  function takeTurns() {
    console.log($('.square:empty'));
    $('.square:empty').click(function(e) {
      if(activePlayer === 'player') {
        if(board[e.target.id] === 0) {
          board[e.target.id] = player;
          e.target.innerHTML = player === 1 ? x : o;
          moves++;
          activePlayer = 'comp';
          gameOver();
        }

      } else {
        if(board[e.target.id] === 0) {
          board[e.target.id] = comp;
          e.target.innerHTML = comp === 1 ? x : o;
          moves++;
          activePlayer = 'player';
          gameOver();
        }
      }
    });
  }

  function gameOver() {
    if(moves > 4) {
      // iterate through each winning line
      result = parseInt(winningLines.map(function(lines) {
        return lines.map(function(line) { // get value in each square
          return board[line];
        }).reduce(function(prev, cur) { // add up values in each line
          return prev + cur;
        });
      }).filter(function(total) { // find & return winner
        return Math.abs(total) === 3;
      }).join());

      if(moves === board.length) { // tie
        winner = 'tie';
        resetGame();
        // startGame();
      } else if(result === 3) { // determine winner by if player is x or o
        winner = player === 1 ? 'player' : 'comp';
        resetGame();
      } else if(result === -3) {
        winner = player === -1 ? 'player' : 'comp';
        resetGame();
      }
    }
  }

  function resetGame() {
    console.log('resetGame');
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    activePlayer = 'player';
    moves = 0;
    winner = '';
    result = 0;

    $('.square').each(function(id) {
      $(this).empty();
    });
  }
})();