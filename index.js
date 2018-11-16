
const showDropDown = () => {
  document.getElementById('myDropDown').classList.toggle('show');
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    const dropdowns = document.getElementsByClassName("dropdown-content");

    for (let i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

$(document).ready(function() {
  const x = "x"
  const o = "o"
  let count = 0;
  let o_win = 0;
  let x_win = 0;
  let maxSize = 9;
  let dropdownLevel = document.getElementById('myDropDown');
  let gameBoard = document.getElementById('game');

  const startGame = () => {
    for(let cell = 3; cell <= maxSize; cell+=2){
      let listLevel = document.createElement('li');
      listLevel.innerText = cell;
      listLevel.setAttribute('class', 'level');
      dropdownLevel.append(listLevel);
    }
  }

  startGame();

  $('#myDropDown li').click(function (){
    count = 0;
    sizeStage = $(this).html();
    chooseLevelFunc(sizeStage);
    createBoardGame(sizeStage);
  });

  const chooseLevelFunc = (stage) => {
    let chooseLevel = document.getElementById('chooseLevel');
    chooseLevel.textContent = `${stage} x ${stage}`;
  }

  const createBoardGame = (size) => {
    gameBoard.innerHTML = '';
    let count = 0;
    for(let column = 0; column < size; column++){
      let collumnBoard = document.createElement('div');
      for (let row = 0; row < size; row++){
        let rowBoard = document.createElement('li');
        rowBoard.innerHTML = '+';
        rowBoard.setAttribute('class', `btn span1 h${row} v${column}`);
        rowBoard.setAttribute('id', count.toString());
        collumnBoard.append(rowBoard);
        count++;
      }
      gameBoard.append(collumnBoard);
    }
    squares = $('#tic-tac-toe #game li');
    addEventClickToSquare(squares, size);
  }

  const addEventClickToSquare = (element, size) => {
    element.click(function() {
      let checkHori = $(this)[0].classList[2];
      let checkVerti = $(this)[0].classList[3];
      if (checkWinner(size, 'o', checkHori, checkVerti))
      {
        alert('O has won the game. Start a new game')
        cleanGame()
        count = 0;
      }
      else if (checkWinner(size, 'x', checkHori, checkVerti))
      {
        alert('X wins has won the game. Start a new game')
        cleanGame()
        count = 0;
      }
      else if (isTie(size))
      {
        alert('Its a tie. It will restart.')
        cleanGame()
        count = 0
      }
      else if ($(this).hasClass('disable'))
      {
        alert('Already selected')
      }
      else if (count%2 == 0)
      {
        clickChangeText(o, this, 'btn-primary')
          if (checkWinner(size, 'o', checkHori, checkVerti))
          {
            alert('O wins')
            count = 0
            o_win++
            $('#o_win').text(o_win)
          }
      }
        else
      {
        clickChangeText(x, this, 'btn-info');
        if (checkWinner(size, 'x', checkHori, checkVerti))
        {
          alert('X wins')
          count = 0
          x_win++
          $('#x_win').text(x_win)
        }
      }
    })
  }

  const clickChangeText = (whoseTurn, element, btnStyle) => {
    count++;
    $(element).text(whoseTurn);
    $(element).addClass(`disable ${whoseTurn} ${btnStyle}`);
  }

  const checkConditionStatus = (manyOfTrue, size) => {
    if(manyOfTrue.length === size){
      return true;
    }
    return false;
  }

  const check = (horiClass, size, condition) => {
    let manyOfTrue = [];
    for(let i = 0; i < size; i++){
      if($(`.${horiClass}`)[i].classList[5] === condition){
        manyOfTrue.push(true);
      }
    }
    return checkConditionStatus(manyOfTrue, size);
  }

  const checkVertical = (condition, vertiClass) => {
    const manyVerticalClass = $(`.${vertiClass}`).length;
    if(check(vertiClass, manyVerticalClass, condition)){
      return true;
    }
    return false;
  }

  const checkHorizontal = (condition, horiClass) => {
    const manyHorizontalClass = $(`.${horiClass}`).length;
    if(check(horiClass, manyHorizontalClass, condition)){
      return true;
    }
    return false;
  }

  const checkDiagonalKiri = (condition, size) => {
    let boardSize = parseInt(size, 10);
    let manyOfTrue = [];
    for(let i = 0; i < boardSize; i++){
      for(let j = 0; j < boardSize; j++){
        if(i === j){
          if($(`.h${i}.v${j}`)[0].classList[5] === condition){
            manyOfTrue.push(true);
          }
        }
      }
    }
    return checkConditionStatus(manyOfTrue, boardSize)
  }

  const checkDiagonalKanan = (condition, size) => {
    let boardSize = parseInt(size, 10);
    let manyOfTrue = [];
    for(let i = 0; i < boardSize; i++){
      for(let j = boardSize-1; j >= 0; j--){
        if(i+j === boardSize-1){
          if($(`.h${i}.v${j}`)[0].classList[5] === condition){
            manyOfTrue.push(true);
          }
        }
      }
    }
    return checkConditionStatus(manyOfTrue, boardSize);
  }

  const checkWinner = (size, whoseTurn, checkHori, checkVerti) => {
    if(checkHorizontal(whoseTurn, checkHori)){
      return true
    }
    if(checkVertical(whoseTurn, checkVerti)){
      return true
    }
    if(checkDiagonalKanan(whoseTurn, size)){
      return true
    }
    if(checkDiagonalKiri(whoseTurn, size)){
      return true
    }
    return false
  }

  const isTie = (size) => {
    if(count === size*size){
      return true;
    }
    else false;
  }

  const reset = () => {
    $("#reset").click(function () {
      cleanGame();
      count = 0
    });
  }

  const cleanGame = () => {
    $("#game li").text("+");
    $("#game li").removeClass('disable')
    $("#game li").removeClass('o')
    $("#game li").removeClass('x')
    $("#game li").removeClass('btn-primary')
    $("#game li").removeClass('btn-info')
  }
  reset();
});
