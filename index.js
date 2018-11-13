
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
      listLevel.setAttribute('id', 'level');
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
        rowBoard.setAttribute('class', 'btn span1');
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
      if (checkOWinner(size))
      {
        alert('O has won the game. Start a new game')
        cleanGame()
        count = 0;
      }
      else if (checkXWinner(size))
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
          if (checkOWinner(size))
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
        if (checkXWinner(size))
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

  const check = (indexData, condition) => {
    for(let i = 0; i < indexData.length; i++){
      if(!$(`#${indexData[i]}`).hasClass(condition)){
        return false
      }
    }
    return true
  }

  const checkVertical = (condition, size) => {
    let boardSize = parseInt(size, 10);
    for(let i = 0; i < boardSize * boardSize; i +=  boardSize){
      let indexData = [];
      for(let j = i; j < boardSize + i; j++){
        indexData.push(j);
      }
      if(check(indexData, condition)){
        return true;
      }
    }
    return false;
  }

  const checkHorizontal = (condition, size) => {
    let boardSize = parseInt(size, 10);
    for(let i = 0; i < boardSize; i ++){
      let indexData = [];
      for(let j = i; j < boardSize * boardSize; j += boardSize){
        indexData.push(j);
      }
      if(check(indexData, condition)){
        return true;
      }
    }
    return false;
  }

  const checkDiagonalKiri = (condition, size) => {
    let boardSize = parseInt(size, 10);
    let indexData = [];
    for(let j = 0; j < boardSize * boardSize; j += boardSize + 1 ){
      indexData.push(j);
    }
    if(check(indexData, condition)){
      return true;
    }
    return false
  }

  const checkDiagonalKanan = (condition, size) => {
    let boardSize = parseInt(size, 10);
    let indexData = [];
    for(let j = boardSize-1; j < boardSize * boardSize - 1; j += boardSize - 1){
      indexData.push(j);
    }
    if(check(indexData, condition)){
      return true;
    }
    return false
  }

  const checkOWinner = (size) => {
    if(checkHorizontal('o', size)){
      return true
    }
    if(checkVertical('o', size)){
      return true
    }
    if(checkDiagonalKanan('o', size)){
      return true
    }
    if(checkDiagonalKiri('o', size)){
      return true
    }
    return false
  }

  const checkXWinner = (size) => {
    if(checkHorizontal('x', size)){
      return true
    }
    if(checkVertical('x', size)){
      return true;
    }
    if(checkDiagonalKanan('x', size)){
      return true
    }
    if(checkDiagonalKiri('x', size)){
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
