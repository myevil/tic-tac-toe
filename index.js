const computer = "x"
const player  = "o"
let o_win = 0
let x_win = 0
let winCondition
let origBoard
let sizeStage
let count = 0
let modegame

$(document).ready(function() {
  document.getElementById('solo').onclick = () => {
    document.getElementById('myDropDown').innerHTML = ''
    modegame = 'solo'
    startGame()
    cleanGame()
  }
  document.getElementById('multiplayer').onclick = () =>{
    document.getElementById('myDropDown').innerHTML = ''
    modegame = 'multiplayer'
    startGame()
    cleanGame()
  }
});

const startGame = (mode) => {
  let chooseLevel = document.getElementById('chooseLevel');

  count = 0

  if(modegame === 'solo') {
    solo.classList.add('btn-warning')
    multiplayer.setAttribute('class', 'btn-primary chooseMode')
  } else {
    multiplayer.classList.add('btn-warning')
    solo.setAttribute('class', 'btn-primary chooseMode')
  }
  chooseLevel.style.display = 'unset'

  chooseLevel.onclick = () => document.getElementById('myDropDown').classList.toggle('show')

  const dropdownLevel = document.getElementById('myDropDown');

  if(modegame === 'solo') {
    maxSize = 3
  } else {
    maxSize = 9
  }

  for(let cell = 3; cell <= maxSize; cell+=2){
    let listLevel = document.createElement('li');
    listLevel.innerText = cell;
    listLevel.onclick = () => {
      sizeStage = listLevel.innerText
      chooseLevel.textContent = `${sizeStage} x ${sizeStage}`;
      document.getElementById('myDropDown').classList.remove('show');
      createBoardGame();
      winCondition = generateWinCondition();
    }
    dropdownLevel.append(listLevel);
  }
}

function generateWinCondition() {
  const horizontalCondition = () => {
    const horizontalWin = []
    let tempCondition = []
    for(i = 0; i <= sizeStage * sizeStage; i++) {
      if(i % sizeStage === 0 && i === 0) {
        tempCondition.push(i)
      } else if(i % sizeStage === 0) {
        horizontalWin.push(tempCondition)
        tempCondition = []
        if(i !== sizeStage * sizeStage){
          tempCondition.push(i)
        }
      } else {
        tempCondition.push(i)
      }
    }
    return horizontalWin
  }

  const diagonalCondition = () => {
    const diagonalWin = []
    let diagonalLeftTempCondition = []
    let diagonalRightTempCondition = []

    for(i = 0; i < sizeStage; i++) {
      diagonalLeftTempCondition.push((sizeStage-1) * (i+1))
      diagonalRightTempCondition.push((parseInt(sizeStage, 10)+1) * i)
      if(i === sizeStage-1 ) {
        diagonalWin.push(diagonalLeftTempCondition)
        diagonalWin.push(diagonalRightTempCondition)
      }
    }
    return diagonalWin
  }

  const verticalCondition = () => {
    const verticalWin = []
    for(i = 0; i < sizeStage; i++){
      let tempCondition = []
      let index = i
      for (j = 0; j < sizeStage; j++) {
        if(j === 0) {
          tempCondition.push(index)
        }else {
          index += parseInt(sizeStage, 10)
          tempCondition.push(index)
        }
      }
      verticalWin.push(tempCondition)
    }
    return verticalWin
  }

  const winCondition = horizontalCondition().concat(verticalCondition()).concat(diagonalCondition())
  return winCondition
}

const createBoardGame = () => {
  const gameBoard = document.getElementById('game');
  gameBoard.innerHTML = '';

  origBoard = Array.from(Array(sizeStage * sizeStage).keys());

  let boardId = 0;

  for(let column = 0; column < sizeStage; column++){
    let collumnBoard = document.createElement('div');
    for (let row = 0; row < sizeStage; row++){
      let rowBoard = document.createElement('li');
      rowBoard.innerHTML = '+';
      rowBoard.setAttribute('class', `cell btn`);
      rowBoard.setAttribute('id', boardId.toString());
      if(modegame === 'solo') {
        rowBoard.addEventListener('click', turnClickSolo, false);
      } else {
        rowBoard.addEventListener('click', turnClickMultiplayer, false);
      }
      collumnBoard.append(rowBoard);
      boardId++;
    }
    gameBoard.append(collumnBoard);
  }
}

function turnClickSolo(cell) {
  if (typeof origBoard[cell.target.id] == 'number') {
		turn(cell.target.id, player)
		if (!checkWin(origBoard, player) && !checkTie()) turn(bestSpot(), computer);
	}
}

function turnClickMultiplayer(cell) {
  count++
  if (typeof origBoard[cell.target.id] == 'number') {
    if (!checkWin(origBoard, player) && !checkTie()){
      if(count % 2 === 0) {
        turn(cell.target.id, player)
      } else {
        turn(cell.target.id, computer);
      }
    }
	} else {
    checkTie()
  }
}

function turn(squareId, player) {
  origBoard[squareId] = player;

  document.getElementById(squareId).innerText = player;
  if(player === 'o') {
    document.getElementById(squareId).classList.add('btn-info');
  } else {
    document.getElementById(squareId).classList.add('btn-primary');
  }

	let gameWon = checkWin(origBoard, player)
	if (gameWon) gameOver(gameWon)
}

function checkWin(board, player) {
	let plays = board.reduce((board, turn, index) =>
		(turn === player) ? board.concat(index) : board, []);
	let gameWon = null;
	for (let [index, win] of winCondition.entries()) {
		if (win.every(conditions => plays.indexOf(conditions) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
  }
	return gameWon;
}

function gameOver(gameWon) {
  const cells = document.querySelectorAll('.cell');
	for (var i = 0; i < cells.length; i++) {
    if(modegame === 'solo'){
      cells[i].removeEventListener('click', turnClickSolo, false);
    } else {
      cells[i].removeEventListener('click', turnClickMultiplayer, false);
    }
	}
	declareWinner(gameWon.player);
}

function declareWinner(winner) {
  document.querySelector(".endgame").style.display = "block";

  if(winner === 'o') {
    document.querySelector(".endgame .text").innerText = 'O has won the game. Start a new game';
    o_win += 1
    $('#o_win').text(x_win)
  }else if(winner === 'x'){
    document.querySelector(".endgame .text").innerText = 'X has won the game. Start a new game';
    x_win += 1
    $('#x_win').text(x_win)
  } else {
    document.querySelector(".endgame .text").innerText = winner;
  }
}

function emptySquares() {
	return origBoard.filter(s => typeof s == 'number');
}

function bestSpot() {
	return minimax(origBoard, computer).index;
}

function checkTie() {
  const cells = document.querySelectorAll('.cell');

	if (emptySquares().length == 0) {
		for (var i = 0; i < cells.length; i++) {
      if(modegame === 'solo') {
        cells[i].removeEventListener('click', turnClickSolo, false);
      } else {
        cells[i].removeEventListener('click', turnClickMultiplayer, false);
      }
		}
		declareWinner('Its a tie. It will restart.')
		return true;
	}
	return false;
}

function minimax(newBoard, playerTurn) {
  var availSpots = emptySquares();

	if (checkWin(newBoard, player)) {
		return {score: -10};
	} else if (checkWin(newBoard, computer)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
  }

	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = playerTurn;

		if (playerTurn == computer) {
			var result = minimax(newBoard, player);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, computer);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
  }

	var bestMove;
	if(playerTurn === computer) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
  }

	return moves[bestMove];
}

const reset = () => {
  $("#reset").click(function () {
    cleanGame();
  });
}

const cleanGame = () => {
  $("#game li").text("+");
  origBoard = Array.from(Array(sizeStage * sizeStage).keys());
  document.querySelector(".endgame").style.display = "none";
  createBoardGame();
}

reset();
