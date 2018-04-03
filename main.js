/*
  Tic Tac Toe Game by Alexis Okamura
*/
var tictactoe = (function() {
  var test;
  var activePlayer = 'player';
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
  var moves = 0;

  $('#x').on('click', function() {
    player.symbol = '<i class="fa-inverse fa fa-times fa-5x"></i>';
    comp.symbol = '<i class="fa-inverse fa fa-circle-o fa-5x"></i>';
    $('.modal-backdrop').hide();
    $('.start-game').hide();
    startGame();
  });

  $('#o').on('click', function() {
    player.symbol = '<i class="fa-inverse fa fa-circle-o fa-5x"></i>';
    comp.symbol = '<i class="fa-inverse fa fa-times fa-5x"></i>';
    $('.modal-backdrop').hide();
    $('.start-game').hide();
    startGame();
  });

  function startGame() {
    playersTurn();
    // $('.square').click(function(e) {
    //   console.log(e.target);
    //   if(activePlayer === 'player') {
    //     moves++;
    //     board[e.target.id] = player;
    //     $(this).addClass('active').html(player === 1 ? x : o);
    //     activePlayer = 'comp';
    //     checkBoard();
    //     $(this).off();
    //     console.log(board);
    //   } else {
    //     moves++;
    //     board[e.target.id] = comp;
    //     $(this).addClass('active').html(comp === 1 ? x : o);
    //     activePlayer = 'player';
    //     checkBoard();
    //     $(this).off();
    //     console.log(board);
    //   }
    // });

    // $('.square').hover(function(e) {
    //   if(!$(this).hasClass('active')) {
    //     if(activePlayer === 'player') {
    //       console.log(e.target.id);
    //       $(this).html(player === 1 ? x : o);
    //       console.log($(this).children()[0].attr('id', e.target.id));
    //     } else {
    //       $(this).html(comp === 1 ? x : o).attr('id', e.target.id);
    //     }
    //   }
    // }, function(e) {
    //   if(!$(this).hasClass('active')) {
    //     $(this).empty();
    //   }
    // });
    // $('.square').on('click mouseover', function(e) {
    //   if(board[e.target.id] === 0) {
    //     console.log(e.type);
    //     if(e.type === 'click') {
    //       board[e.target.id] = player;
    //       $(this).html(player === 1 ? x : o);
    //     } else {
    //       $(this).html(player === 1 ? x : o);
    //     }
    //   }
    // });
    // $('.square').hover(function(e) {
    //   if(board[e.target.id] === 0) {
    //     if(activePlayer === 'player') {
    //       $(this).html(player === 1 ? x : o);
    //     } else {
    //       $(this).html(comp === 1 ? x : o);
    //     }
    //   }
    // }, function(e) {
    //   if(board[e.target.id] === 0) {
    //     $(this).empty();
    //   }
    // });

    // $('.square').click(function(e) {
    //   if(board[e.target.id] === 0) {
    //     if(activePlayer === 'player') {
    //       board[e.target.id] = player.id;
    //       e.target.innerHTML = player.symbol;
    //       moves++;
    //       activePlayer = 'comp';
    //       checkBoard();
    //     } else {
    //       board[e.target.id] = comp.id;
    //       e.target.innerHTML = comp.symbol;
    //       moves++;
    //       activePlayer = 'player';
    //       checkBoard();
    //     }
    //   }
    // });
    // $('.square').click(function(e) {
    //   if(board[e.target.id] === 0) {
    //     if(activePlayer === 'player') {
    //       moves++;
    //       board[e.target.id] = player.id;
    //       $(this).html(player.symbol);
    //       activePlayer = 'comp';
    //     } else {

    //     }
    //   }
    // });
  }

  function playersTurn() {
    $('.square').on('click', function(e) {
      if(board[e.target.id] === 0) {
        moves++;
        board[e.target.id] = player.id;
        $(this).html(player.symbol);
        $(this).off();
        computersTurn();
      }
    });
  }

  function computersTurn() {
    minmax(board, 'comp');
    board[test] = comp.id;
    $(`#${test}`).html(comp.symbol);
    playersTurn();
    // console.log(check(board));
    // console.log(minmax(board, 'comp'));
  }

  function check(state) {
    var moves = state.reduce(function(prev, cur) {
      return Math.abs(prev) + Math.abs(cur);
    });

    var result = parseInt(winningLines.map(function(lines) {
      return lines.map(function(line) { // get value in each square
        return state[line];
      }).reduce(function(prev, cur) { // add up values on each line
        return prev + cur;
      });
    }).filter(function(total) { // find + return winner
      return Math.abs(total) === 3;
    }).join());

    // check result
    if(moves === 9) {
      return 'tie';
    } else if(result === 3) {
      return 'win';
    } else if(result === -3) {
      return 'lose';
    } else {
      return false;
    }
  }

  function gameOver(winner) {
    console.log(winner);
    // if(winner === 'player') {
    //   $('#winner').html('You won!');
    // } else if(winner === 'comp') {
    //   $('#winner').html('You lost!');
    // } else {
    //   $('#winner').html('It was a tie');
    // }
    // $('.modal-backdrop').show();
    // $('.end-game').show();
    // $('#restart-game').on('click', function() {
    //   resetGame();
    //   $('.modal-backdrop').hide();
    // });
  }

  function resetGame() {
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    activePlayer = 'player';
    moves = 0;

    $('.square').each(function() {
      $(this).empty();
    });
  }

  function emptySquares(state) {
    return state.map(function(square, index) {
      // iterate through each square, if square is not taken
      // return the index of that square
      return square === 0 ? index : false;
    }).filter(function(index) {
      // filter through the indexes and only return valid ones
      return index !== false;
    });
  }

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
      test = moves[scores.indexOf(Math.max.apply(Math, scores))];
      return Math.max.apply(Math, scores);
    } else {
      test = moves[scores.indexOf(Math.min.apply(Math, scores))];
      return Math.min.apply(Math, scores);
    }
  }
})();