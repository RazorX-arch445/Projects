


let scoreInfo = JSON.parse(localStorage.getItem('Score')) || {
  Win : 0,
  Lose : 0,
  Tie : 0
};



updateScoreLive();
let idTimeout;
let timeoutID1;
let timeoutID2;
function timeoutIntervalId() {
  clearTimeout(timeoutID1);
  clearTimeout(timeoutID2);
  timeoutID1 = setTimeout(() => {
    document.querySelector('.js-move')
    .innerHTML = ``;
  }, 6000)

  timeoutID2 = setTimeout(() => {
    document.querySelector('.js-reult')
    .innerHTML = ``;
  }, 6000)

  
  
}



function chooseComputerMove () {
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1/3) {
    computerMove = 'Rock';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'Paper';
  } else if (randomNumber >= 2/3 && randomNumber < 1) {
    computerMove = 'Scissors';
  }

  return computerMove;
};

let result = '';

const resetButton = document.querySelector('.js-reset-btn');
const confirmR = document.querySelector('.js-confirmation');
resetButton.addEventListener('click', () => {
  confirmR.innerHTML =`
    <div class="confirmation-container">
      <label>Are you sure you want to reset Score?</label>
      <button class="js-confirm-yes yes-btn">Yes</button>
      <button class="js-confirm-no no-btn" >No</button>
    </div>
    
    `;
    setTimeout(() => {
      confirmR.innerHTML = ``;
    }, 6000)
  const yesButton = document.querySelector('.js-confirm-yes');
  const noButton = document.querySelector('.js-confirm-no');
  yesButton.addEventListener('click', () => {
    scoreTally('resetScore');
    confirmR.innerHTML = ``;
  })
  noButton.addEventListener('click', () => {confirmR.innerHTML = ``;})
  
});

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'Backspace'){
    confirmR.innerHTML =`
    <div class="confirmation-container">
      <label>Are you sure you want to reset Score?</label>
      <button class="js-confirm-yes yes-btn">Yes</button>
      <button class="js-confirm-no no-btn" >No</button>
    </div>
    
    `;
    
    clearTimeout(idTimeout);
    idTimeout = setTimeout(() => {
      confirmR.innerHTML = ``;
    }, 6000)
    const yesButton = document.querySelector('.js-confirm-yes');
    const noButton = document.querySelector('.js-confirm-no');
    yesButton.addEventListener('click', () => {
      scoreTally('resetScore');
      confirmR.innerHTML = ``;
    })
    noButton.addEventListener('click', () => {confirmR.innerHTML = ``;})
  }
});

function scoreTally(rScore) {
  const result1 = result;
  if (result1 === 'You win') {
    scoreInfo.Win += 1
  } else if (result1 === 'You lose') {
    scoreInfo.Lose += 1
  } else if (result1 === 'Tie') {
    scoreInfo.Tie += 1
  } 
  if (rScore === 'resetScore') {
    scoreInfo.Win = 0;
    scoreInfo.Lose = 0;
    scoreInfo.Tie = 0;
  }
  updateScoreLive();

  localStorage.setItem('Score', JSON.stringify(scoreInfo)); 
}

let isAutoPlaying = false;
let intervalId;

const autoButton = document.querySelector('.js-autoplay-btn');

autoButton.addEventListener('click', () => {
  autoPlay();
});

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'a'){
    autoPlay();
  }
});
//const autoPlay = () => {

//};
function autoPlay(){
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = chooseComputerMove();
      playGame(playerMove);
    }, 1000);
    autoButton.innerHTML = 'Stop Autoplay';
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    autoButton.innerHTML = 'Autoplay';
    
    setTimeout(() => {
      document.querySelector('.js-reult')
      .innerHTML = ``;
    }, 6000)

    setTimeout(() => {
      document.querySelector('.js-move')
      .innerHTML = ``;
    }, 6000)
    isAutoPlaying = false;
  }
}

const rockButton = document.querySelector('.js-rock-btn');
const paperButton = document.querySelector('.js-paper-btn');
const scissorsButton = document.querySelector('.js-scissors-btn');

rockButton.addEventListener('click', () => {
  playGame('Rock');
  timeoutIntervalId();
});
paperButton.addEventListener('click', () => {
  playGame('Paper');
  timeoutIntervalId();
});
scissorsButton.addEventListener('click', () => {
  playGame('Scissors');
  timeoutIntervalId();
});

const keyPressGame = document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r') {
    playGame('Rock');
    timeoutIntervalId();
  } else if (event.key === 'p') {
    playGame('Paper');
    timeoutIntervalId();
  } else if (event.key === 's') {
    playGame('Scissors');
    timeoutIntervalId();
  }
})

function playGame(playerMove) {
  const computerMove = chooseComputerMove();
  

  if (playerMove === 'Scissors') {
    if (computerMove === 'Rock') {
      result = 'You lose';
    } else if (computerMove === 'Paper') {
      result = 'You win';
    } else if (computerMove === 'Scissors') {
      result = 'Tie';
    }

  }

  else if (playerMove === 'Paper') {
    if (computerMove === 'Rock') {
      result = 'You win';
    } else if (computerMove === 'Paper') {
      result = 'Tie';
    } else if (computerMove === 'Scissors') {
      result = 'You lose';
    }
  }

  else if (playerMove === 'Rock') {
    if (computerMove === 'Rock') {
      result = 'Tie';
    } else if (computerMove === 'Paper') {
      result = 'You lose';
    } else if (computerMove === 'Scissors') {
      result = 'You win';
    }
  }
  scoreTally();

  function displayStats() {
    document.querySelector('.js-move')
      .innerHTML = `Player: <img src="images/${playerMove}-emoji.png">    <img src="images/${computerMove}-emoji.png">: CPU `;
    
  };

  function displayResults() {
    document.querySelector('.js-reult')
      .innerHTML = `${result}`;
  };

  displayResults();

  displayStats();
  
};

function updateScoreLive() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${scoreInfo.Win}, Losses: ${scoreInfo.Lose}, Ties: ${scoreInfo.Tie}`;
  
};