/*
  Tic Tac Toe Game by Alexis Okamura
*/
var tictactoe = (function() {
  var compMove; // stores the index of the computer's move
  var player = { id: 1 }, comp = { id: -1 };
  var board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
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

  /* Assigns player + comp's symbol according to what symbol they click */
  $('#x').on('click', function() {
    player.symbol = '<i class="fa-inverse fa fa-times fa-5x symbol"></i>';
    comp.symbol = '<i class="fa-inverse fa fa-circle-o fa-5x symbol"></i>';
    player.color = 'red';
    comp.color = 'blue';
    $('.modal-backdrop').hide();
    $('.start-game').hide();
    startGame();
  });

  /* Assigns player + comp's symbol according to what symbol they click */
  $('#o').on('click', function() {
    player.symbol = '<i class="fa-inverse fa fa-circle-o fa-5x symbol"></i>';
    comp.symbol = '<i class="fa-inverse fa fa-times fa-5x symbol"></i>';
    player.color = 'blue';
    comp.color = 'red';
    $('.modal-backdrop').hide();
    $('.start-game').hide();
    startGame();
  });

  function startGame() {
    resetGame();
    playersTurn();
  }

  /* Checks the current state of the board passed in */
  function check(state) {
    // counts how many moves have been played already
    var moves = state.reduce(function(prev, cur) {
      return Math.abs(prev) + Math.abs(cur);
    });

    // totals up and finds the current highest score
    var result = parseInt(winningLines.map(function(lines) {
      return lines.map(function(line) { // get value in each square
        return state[line];
      }).reduce(function(prev, cur) { // add up values on each line
        return prev + cur;
      });
    }).filter(function(total) { // find + return winning score
      return Math.abs(total) === 3;
    }).join());

    // checks moves + result
    if(result === 3) {
      return 'win';
    } else if(result === -3) {
      return 'lose';
    } else if(moves === 9) {
      return 'tie';
    } else {
      return false;
    }
  }

  /* Displays the outcome of the game */
  function gameOver(winner) {
    if(winner === 'win') {
      $('#winner').html('You won!');
      $('#emoji').html('🎉');
    } else if(winner === 'lose') {
      $('#winner').html('You lost!');
      $('#emoji').html('👎');
    } else {
      $('#winner').html('It was a tie');
      $('#emoji').text('🤷‍');
    }
    $('.modal-backdrop').show();
    $('.end-game').show();
    $('#restart-game').on('click', function() {
      $('.modal-backdrop').hide();
      $('.modal').hide();
      startGame();
    });
  }

  /* Resets the board to its original state */
  function resetGame() {
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    // clears anything in each square
    $('.square').each(function() {
      $(this).empty();
      $(this).removeClass('blue red');
    });
  }

  function playersTurn() {
    $('.square').on('click', function(e) {
      if(board[e.target.id] === 0) {
        board[e.target.id] = player.id;
        $(this).addClass(player.color).html(player.symbol);
        check(board) ? gameOver(check(board)) : setTimeout(computersTurn, 300);
      }
    });
  }

  function computersTurn() {
    minmax(board, 'comp'); // runs minmax to find optimal move
    board[compMove] = comp.id;
    $(`#${compMove}`).addClass(comp.color).html(comp.symbol);
    check(board) ? gameOver(check(board)) : playersTurn();
  }

  /* Returns an array of available/empty squares */
  function emptySquares(state) {
    // return indexes of empty squares
    return state.map(function(square, index) {
      return square === 0 ? index : false;
    }).filter(function(index) {
      // filter through the indexes and only return valid ones
      return index !== false;
    });
  }

  // referenced min-max algorithm from here:
  // https://www.neverstopbuilding.com/blog/2013/12/13/tic-tac-toe-understanding-the-minimax-algorithm13/
  // and big help from: https://codepen.io/thepeted/full/qOJVyK/
  function minmax(state, player) {
    var result = check(state);
    if(result === 'lose') {
      return 10;
    } else if(result === 'win') {
      return -10;
    } else if(result === 'tie') {
      return 0;
    }

    var moves = [], scores = [];
    emptySquares(state).forEach(function(index) {
      state[index] = player === 'comp' ? -1 : 1;
      scores.push(minmax(state, player === 'comp' ? 'player' : 'comp'));
      moves.push(index);
      state[index] = 0;
    });

    // return the best move
    if(player === 'comp') {
      compMove = moves[scores.indexOf(Math.max.apply(Math, scores))];
      return Math.max.apply(Math, scores);
    } else {
      compMove = moves[scores.indexOf(Math.min.apply(Math, scores))];
      return Math.min.apply(Math, scores);
    }
  }
})();