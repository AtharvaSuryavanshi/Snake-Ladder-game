const playerButtons = document.querySelectorAll('.player-btn');
const nameInputs = document.getElementById('nameInputs');
const botInfo = document.getElementById('botInfo');
const startGameBtn = document.getElementById('startGameBtn');
const board = document.getElementById('board');
const rollDiceBtn = document.getElementById('rollDice');
const diceResult = document.getElementById('diceResult');
const currentPlayerLabel = document.getElementById('currentPlayer');
const playersInfo = document.getElementById('playersInfo');

const colors = ['red', 'dodgerblue', 'limegreen', 'orange'];
let players = [];
let currentPlayerIndex = 0;
let moveCount = 0;
let gameStartTime = 0;
let gameTimer = null;

// Snake and Ladder positions
const snakes = {
  99: 7,
  95: 56,
  92: 35,
  89: 70,
  74: 53,
  64: 36,
  62: 19,
  49: 11,
  46: 25,
  16: 6,
};

const ladders = {
  2: 38,
  4: 14,
  8: 31,
  21: 42,
  28: 84,
  36: 44,
  51: 67,
  71: 91,
  80: 99,
};

function createInput(index) {
  const div = document.createElement('div');
  div.className = 'input-group';
  div.innerHTML = `
    <span style="background: ${colors[index]}"></span>
    <input type="text" placeholder="Player ${index + 1} name" />
  `;
  return div;
}

playerButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    playerButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const count = parseInt(btn.dataset.count);
    nameInputs.innerHTML = '<label>👤 Player Names</label>';

    for (let i = 0; i < count; i++) {
      nameInputs.appendChild(createInput(i));
    }

    botInfo.style.display = count === 1 ? 'block' : 'none';
  });
});

startGameBtn.addEventListener('click', () => {
  const inputs = nameInputs.querySelectorAll('input');
  players = [];

  inputs.forEach((input, i) => {
    const name = input.value.trim() || `Player ${i + 1}`;
    players.push({ name, color: colors[i], position: 1 });
  });

  if (players.length === 1) {
    players.push({ name: 'Bot 🤖', color: colors[1], position: 1 });
  }

  document.getElementById('setupScreen').style.display = 'none';
  document.getElementById('gameScreen').style.display = 'block';

  gameStartTime = Date.now();
  startGameTimer();
  renderBoard();
  updateTokens();
  updatePlayersInfo();
  currentPlayerLabel.innerText = players[currentPlayerIndex].name;
});

function startGameTimer() {
  gameTimer = setInterval(() => {
    const elapsed = Math.floor((Date.now() - gameStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    document.getElementById('gameTime').innerText = 
      `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
}

function renderBoard() {
  board.innerHTML = '';
  let isLeftToRight = true;

  for (let row = 9; row >= 0; row--) {
    const tiles = [];
    for (let col = 0; col < 10; col++) {
      const number = row * 10 + (isLeftToRight ? col + 1 : 10 - col);
      const tile = document.createElement('div');
      tile.className = 'tile';
      tile.dataset.tile = number;
      
      // Add snake or ladder styling
      let specialElement = '';
      if (snakes[number]) {
        tile.classList.add('snake');
        specialElement = '<div class="snake-emoji">🐍</div>';
      } else if (ladders[number]) {
        tile.classList.add('ladder');
        specialElement = '<div class="ladder-emoji">🪜</div>';
      }
      
      tile.innerHTML = `
        <div class="tile-number">${number}</div>
        ${specialElement}
        <div class="tokens"></div>
      `;
      tiles.push(tile);
    }
    isLeftToRight = !isLeftToRight;
    tiles.forEach(tile => board.appendChild(tile));
  }
}

function updateTokens() {
  document.querySelectorAll('.tile .tokens').forEach(container => container.innerHTML = '');
  players.forEach(player => {
    const token = document.createElement('div');
    token.className = 'token';
    token.style.backgroundColor = player.color;
    const tile = board.querySelector(`.tile[data-tile='${player.position}'] .tokens`);
    if (tile) tile.appendChild(token);
  });
}

function updatePlayersInfo() {
  playersInfo.innerHTML = '<h3>Players</h3>';
  players.forEach((player, index) => {
    const playerDiv = document.createElement('div');
    playerDiv.className = 'player-info';
    if (index === currentPlayerIndex) {
      playerDiv.classList.add('current-turn');
    }
    playerDiv.innerHTML = `
      <div class="player-color" style="background-color: ${player.color}"></div>
      <div>
        <div><strong>${player.name}</strong></div>
        <div>Position: ${player.position}</div>
      </div>
    `;
    playersInfo.appendChild(playerDiv);
  });
}

function animateMove(player, fromPos, toPos, callback) {
  let currentPos = fromPos;
  const interval = setInterval(() => {
    if (currentPos < toPos) {
      currentPos++;
      player.position = currentPos;
      updateTokens();
    } else {
      clearInterval(interval);
      callback();
    }
  }, 200);
}

function showWinner(playerName) {
  clearInterval(gameTimer);
  const winnerDiv = document.createElement('div');
  winnerDiv.className = 'winner-message';
  winnerDiv.innerHTML = `
    🎉 ${playerName} Wins! 🏆<br>
    <button onclick="location.reload()" style="margin-top: 1rem; padding: 10px 20px; background: #fff; color: #000; border: none; border-radius: 10px; cursor: pointer; font-weight: bold;">Play Again</button>
  `;
  document.body.appendChild(winnerDiv);
  rollDiceBtn.disabled = true;
}

function rollDice() {
  if (rollDiceBtn.disabled) return;
  
  const dice = Math.floor(Math.random() * 6) + 1;
  diceResult.innerHTML = `🎲 ${players[currentPlayerIndex].name} rolled a ${dice}!`;
  moveCount++;
  document.getElementById('moveCount').innerText = moveCount;

  const player = players[currentPlayerIndex];
  const oldPosition = player.position;
  let newPosition = oldPosition + dice;
  
  // Can't go beyond 100
  if (newPosition > 100) {
    diceResult.innerHTML += `<br>Can't move beyond 100!`;
    nextTurn();
    return;
  }

  rollDiceBtn.disabled = true;

  // Animate movement
  animateMove(player, oldPosition, newPosition, () => {
    // Check for snakes and ladders
    if (snakes[newPosition]) {
      setTimeout(() => {
        diceResult.innerHTML += `<br>🐍 Snake bite! Down to ${snakes[newPosition]}`;
        player.position = snakes[newPosition];
        updateTokens();
        updatePlayersInfo();
        setTimeout(nextTurn, 1500);
      }, 1000);
    } else if (ladders[newPosition]) {
      setTimeout(() => {
        diceResult.innerHTML += `<br>🪜 Ladder climb! Up to ${ladders[newPosition]}`;
        player.position = ladders[newPosition];
        updateTokens();
        updatePlayersInfo();
        setTimeout(nextTurn, 1500);
      }, 1000);
    } else {
      updatePlayersInfo();
      setTimeout(nextTurn, 1000);
    }

    // Check for winner
    if (player.position === 100) {
      setTimeout(() => showWinner(player.name), 1500);
      return;
    }
  });
}

function nextTurn() {
  if (players[currentPlayerIndex].position === 100) return;
  
  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  currentPlayerLabel.innerText = players[currentPlayerIndex].name;
  updatePlayersInfo();
  rollDiceBtn.disabled = false;

  // Auto-play for bot
  if (players[currentPlayerIndex].name.includes('Bot') && !rollDiceBtn.disabled) {
    setTimeout(() => {
      if (!rollDiceBtn.disabled) rollDice();
    }, 1500);
  }
}

rollDiceBtn.addEventListener('click', rollDice);

// Menu toggle
const menuBtn = document.getElementById('menuBtn');
const menuOptions = document.getElementById('menuOptions');

menuBtn.addEventListener('click', () => {
  if (menuOptions.style.display === 'none' || menuOptions.style.display === '') {
    menuOptions.style.display = 'block';
  } else {
    menuOptions.style.display = 'none';
  }
});

// Hide menu when clicking outside
document.addEventListener('click', (e) => {
  if (!menuBtn.contains(e.target) && !menuOptions.contains(e.target)) {
    menuOptions.style.display = 'none';
  }
});

// Pause, Resume, Exit functionality
let isPaused = false;

function pauseGame() {
  isPaused = true;
  rollDiceBtn.disabled = true;
  if (gameTimer) clearInterval(gameTimer);
  menuOptions.style.display = 'none';
}

function resumeGame() {
  isPaused = false;
  rollDiceBtn.disabled = false;
  startGameTimer();
  menuOptions.style.display = 'none';
}

function exitGame() {
  const confirmExit = confirm("Are you sure you want to exit the game?");
  if (confirmExit) {
    location.reload();
  }
  menuOptions.style.display = 'none';
}