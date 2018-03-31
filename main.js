/*
  Tic Tac Toe Game by Alexis Okamura
*/
var tictactoe = (function() {
  var player, comp, board, activePlayer, result;
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
    $('.start-game').hide();
    startGame();
  });

  $('#o').on('click', function() {
    player = -1;
    comp = 1;
    $('.modal-backdrop').hide();
    $('.start-game').hide();
    startGame();
  });

  function startGame() {
    resetGame();
    takeTurns();
  }

  function takeTurns() {
    $('.square:empty').click(function(e) {
      if(activePlayer === 'player') {
        if(board[e.target.id] === 0) {
          board[e.target.id] = player;
          e.target.innerHTML = player === 1 ? x : o;
          moves++;
          activePlayer = 'comp';
          checkBoard();
        }
      } else {
        if(board[e.target.id] === 0) {
          board[e.target.id] = comp;
          e.target.innerHTML = comp === 1 ? x : o;
          moves++;
          activePlayer = 'player';
          checkBoard();
        }
      }
    });
  }

  function checkBoard() {
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
        gameOver('tie');
      } else if(result === 3) { // determine winner by if player is x or o
        gameOver(player === 1 ? 'player' : 'comp');
      } else if(result === -3) {
        gameOver(player === -1 ? 'player' : 'comp');
      }
    }
  }

  function gameOver(winner) {
    if(winner === 'player') {
      $('#winner').html('You won!');
    } else if(winner === 'comp') {
      $('#winner').html('You lost!');
    } else {
      $('#winner').html('It was a tie');
    }
    $('.modal-backdrop').show();
    $('.end-game').show();
    $('#restart-game').on('click', function() {
      resetGame();
      $('.modal-backdrop').hide();
    });
  }

  function resetGame() {
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    activePlayer = 'player';
    moves = 0;
    result = 0;

    $('.square').each(function(id) {
      $(this).empty();
    });
  }
})();