const player = (name, marker) => {
  const score = 0;
  return {name, marker, score};
}

const gameBoard = (() => {
  const array = [];
  const markers = ['x', 'o', '*', '+'];
  const container = document.querySelector('.container');
  const scoreContainer = document.querySelector('.score-container');
  const playerOne = (() => {
    const playerOneContainer = document.createElement('div');
    playerOneContainer.setAttribute('class', 'player1-container');
    container.appendChild(playerOneContainer);
    const name = document.createElement('input');
    const marker = document.createElement('div');
    marker.setAttribute('class', 'marker');
    name.value = 'Player 1';
    marker.value = 'x';
    for (let i = 0; i < 4; i++) {
      const markerCell = document.createElement('div');
      marker.appendChild(markerCell);
      markerCell.textContent = markers[i];
      markerCell.textContent === marker.value ? markerCell.style.color = 'rgb(0, 0, 0)' : markerCell.style.color = 'rgb(0, 0, 0, 0.3)';
      markerCell.setAttribute('class', 'marker-cell');
      markerCell.addEventListener('click', (e) => {
        const markerCells = document.querySelectorAll('.marker-cell');
        for (let i = 0; i < markerCells.length / 2; i++){
          markerCells[i].style.color = 'rgb(0, 0, 0, 0.3)';
        }
        marker.value = markerCell.textContent;
        if (marker.value === e.currentTarget.textContent) {
          e.currentTarget.style.color = 'rgb(0, 0, 0)';
        }
      });
    }
    playerOneContainer.append(name, marker);
    return {name, marker}
  })();
  
  const playerTwo = (() => {
    const playerTwoContainer = document.createElement('div');
    container.appendChild(playerTwoContainer);
    playerTwoContainer.setAttribute('class', 'player2-container');
    container.appendChild(playerTwoContainer);
    const name = document.createElement('input');
    const marker = document.createElement('div');
    marker.setAttribute('class', 'marker');
    name.value = 'Player 2';
    marker.value = 'o';
    for (let i = 0; i < 4; i++) {
      const markerCell = document.createElement('div');
      marker.appendChild(markerCell);
      markerCell.textContent = markers[i];
      markerCell.textContent === marker.value ? markerCell.style.color = 'rgb(0, 0, 0)' : markerCell.style.color = 'rgb(0, 0, 0, 0.3)';
      markerCell.setAttribute('class', 'marker-cell');
      markerCell.addEventListener('click', (e) => {
        const markerCells = document.querySelectorAll('.marker-cell');
        for (let i = 0; i < markerCells.length / 2; i++){
          markerCells[i + 4].style.color = 'rgb(0, 0, 0, 0.3)';
        }
        marker.value = markerCell.textContent;
        if (marker.value === e.currentTarget.textContent) {
          e.currentTarget.style.color = 'rgb(0, 0, 0)';
        }
      });
    }
    playerTwoContainer.append(name, marker);
    return {name, marker}
  })();

  const startButton = document.createElement('button');
  startButton.setAttribute('class', 'start-button');
  startButton.textContent = 'Start Game';
  container.appendChild(startButton);

  const scoreBoard = (() => {
    const one = () => `${player1.name}: ${player1.score}`;
    const two = () => `${player2.name}: ${player2.score}`;
    return {one, two};
  })();

  const restartGame = () => {
    while (container.childNodes.length > 2) {
      container.removeChild(container.lastChild);  
    }
    const gameGrid = document.createElement('div');
    gameGrid.setAttribute('class', 'game-grid');
    container.appendChild(gameGrid);
    
    for (let i = 0; i < 9; i++) {
      const playField = document.createElement('div');
      playField.setAttribute('class', 'play-field');
      gameGrid.appendChild(playField);
      playField.addEventListener('click', writeMarker);
    }
    const restartButton = document.createElement('button');
    container.appendChild(restartButton);
    restartButton.addEventListener('click', restartGame);
    restartButton.textContent = 'Restart';
    restartButton.setAttribute('class', 'retry');
    currentMarker = player1.marker;
    turn.textContent = `${player1.marker === currentMarker ? player1.name : player2.name}'s turn. ${currentMarker}`;
  }

  let player1;
  let player2;
  let currentMarker;

  const startGame = () => {
    if (playerOne.marker.value === playerTwo.marker.value) {
      alert('You can\'t play with the same markers! Choose another one.');
      return
    }
    player1 = player(playerOne.name.value, playerOne.marker.value);
    player2 = player(playerTwo.name.value, playerTwo.marker.value);
    currentMarker = player1.marker;
    scoreOne.textContent = `${player1.name}: ${player1.score}`;
    scoreTwo.textContent = `${player2.name}: ${player2.score}`;
    restartGame();
  }
  startButton.addEventListener('click', startGame);
  
  function writeMarker(e) {
    if (e.currentTarget.textContent === '') {
      e.currentTarget.textContent = currentMarker;
      currentMarker === player1.marker ? currentMarker = player2.marker : currentMarker = player1.marker;
      gameEnd.checkFilledFields();
    }
  }

  const scoreOne = document.createElement('h1');
  const scoreTwo = document.createElement('h1');
  const turn = document.createElement('div');
  scoreContainer.append(turn, scoreOne, scoreTwo);
  scoreOne.setAttribute('class', 'score-one');
  scoreTwo.setAttribute('class', 'score-two');

  const gameEnd = (() => {
    const checkFilledFields = () => {
      const playFields = document.querySelectorAll('.play-field');
      array.length = 0;
      playFields.forEach((field) => {
        array.push(field.textContent);
      });
      checkWinner();
    }
    const checkWinner = () => {
      let winner = false;
      let draw = false;
      turn.textContent = `${player1.marker === currentMarker ? player1.name : player2.name}'s turn. ${currentMarker}`;
      const win = (arr) => {
        if (draw || (arr.every((elem) => elem === arr[0]) && arr[0] !== '' && !winner)) {
          container.removeChild(container.lastChild);
          const endScreen = document.createElement('div');
          container.appendChild(endScreen);
          endScreen.setAttribute('class', 'endScreen');
          if (arr.every((elem) => elem === arr[0]) && arr[0] !== '') {
            arr[0] === player1.marker ? player1.score++ : player2.score++;
            arr[0] === player1.marker ? endScreen.textContent = `${player1.name} wins!` : endScreen.textContent = `${player2.name} wins!`;
          } else {
            endScreen.textContent = 'It\'s a draw';
          }          
          const retry = document.createElement('button');
          retry.textContent = 'Retry';
          endScreen.appendChild(retry);
          const endScoreOne = document.createElement('div');
          endScoreOne.setAttribute('class', 'end-score-one');
          const endScoreTwo = document.createElement('div');
          endScoreTwo.setAttribute('class', 'end-score-two');
          endScreen.append(endScoreOne, endScoreTwo);
          endScoreOne.textContent = scoreBoard.one();
          endScoreTwo.textContent = scoreBoard.two();
          scoreOne.textContent = `${player1.name}: ${player1.score}`;
          scoreTwo.textContent = `${player2.name}: ${player2.score}`;
          retry.setAttribute('class', 'retry');
          retry.addEventListener('click', () => {
            restartGame();
            if (container.contains(endScreen)) {
              container.removeChild(endScreen);
            }
          });
          winner = true;
        }
      }
      for (let i = 0; i < 3; i++) {
        if (winner) {
          break;
        }
        const arr = [];
        for (let j = 0; j < 3; j++) {
          arr.push(array[i * 3 + j]);
        }
        win(arr);
      }
      for (let i = 0; i < 3; i++) {
        if (winner) {
          break;
        }
        const arr = [];
        for (let j = 0; j < 3; j++) {
          arr.push(array[i + j * 3]);
        }
        win(arr);
      }
      const diagonal = () => {
        const arr = [];
        for (let i = 0; i < 3; i++) {
          arr.push(array[i * 4]);
        }
        win(arr);
        arr.length = 0;
        for (let i = 0; i < 3; i++) {
          if (winner) {
            break;
          }
          arr.push(array[2 + i * 2]);
        }
        win(arr);
      }
      if (!winner) {
        diagonal();
        if (!winner && array.every((elem) => elem !== '')) {
          draw = true;
          win(array);
        }
      }
    }
    return {checkFilledFields}
  })();
})();
