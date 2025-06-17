# 🐍🪜 Snake & Ladder Game

A fully functional, interactive Snake & Ladder game built with vanilla HTML, CSS, and JavaScript. Features beautiful animations, responsive design, and both single-player (vs Bot) and multiplayer modes.

## 🎮 Game Features

- **Multiple Players**: Support for 1-4 players
- **Bot Opponent**: Single player can play against an AI bot
- **Animated Movement**: Smooth token animations across the board
- **Snake & Ladder Effects**: Visual feedback for snakes and ladders
- **Game Statistics**: Track game time and total moves
- **Pause/Resume**: Game control options
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Beautiful UI**: Gradient backgrounds and glassmorphism effects

## 🚀 How to Play

1. **Setup**: Choose number of players (1-4) and enter player names
2. **Gameplay**: Players take turns rolling dice to move their tokens
3. **Snakes**: Landing on a snake head moves you down to its tail
4. **Ladders**: Landing on a ladder bottom moves you up to its top
5. **Winning**: First player to reach square 100 wins the game

## 📁 File Structure

```
snake-ladder-game/
│
├── index.html          # Main HTML file (complete game)
├── style.css           # Styling (embedded in HTML)
├── script.js           # Game logic (embedded in HTML)
└── README.md           # This documentation
```

## 🔧 Code Architecture

### HTML Structure

The game consists of two main screens:

#### 1. Setup Screen (`#setupScreen`)
```html
<div class="container" id="setupScreen">
    <!-- Player count selection -->
    <!-- Player name inputs -->
    <!-- Start game button -->
</div>
```

#### 2. Game Screen (`#gameScreen`)
```html
<div class="game-wrapper" id="gameScreen">
    <!-- Top navigation bar -->
    <!-- Game board and sidebar -->
</div>
```

### CSS Styling

#### Key Design Features:
- **Responsive Layout**: Flexbox and CSS Grid
- **Glassmorphism**: `backdrop-filter: blur()` effects
- **Animations**: CSS keyframes for pulse and bounce effects
- **Mobile-First**: Progressive enhancement for larger screens

#### Important CSS Classes:
- `.container`: Setup screen styling
- `.game-wrapper`: Main game container
- `.board`: 10x10 grid for game board
- `.tile`: Individual board squares
- `.token`: Player pieces
- `.winner-message`: Victory popup

### JavaScript Game Logic

#### Core Components

##### 1. Game State Variables
```javascript
let players = [];           // Array of player objects
let currentPlayerIndex = 0; // Current player's turn
let moveCount = 0;         // Total moves counter
let gameStartTime = 0;     // Game start timestamp
let gameTimer = null;      // Timer interval reference
```

##### 2. Game Board Data
```javascript
// Snake positions (head: tail)
const snakes = {
    99: 7, 95: 56, 92: 35, 89: 70,
    74: 53, 64: 36, 62: 19, 49: 11,
    46: 25, 16: 6
};

// Ladder positions (bottom: top)
const ladders = {
    2: 38, 4: 14, 8: 31, 21: 42,
    28: 84, 36: 44, 51: 67, 71: 91,
    80: 99
};
```

#### Key Functions Explained

##### 1. Board Rendering (`renderBoard()`)
```javascript
function renderBoard() {
    // Creates 10x10 grid (100 squares)
    // Numbers squares in snake-like pattern
    // Adds snake/ladder visual indicators
    // Alternates row direction (left-to-right, right-to-left)
}
```

**How it works:**
- Loop through 10 rows (9 to 0, top to bottom)
- For each row, create 10 columns
- Number calculation: `row * 10 + (isLeftToRight ? col + 1 : 10 - col)`
- Add special styling for snake/ladder squares

##### 2. Player Movement (`animateMove()`)
```javascript
function animateMove(player, fromPos, toPos, callback) {
    // Smoothly animates token movement
    // Updates position incrementally
    // Calls callback when animation complete
}
```

**Animation Process:**
1. Start from current position
2. Increment position every 200ms
3. Update token visual position
4. Execute callback when reaching destination

##### 3. Dice Rolling (`rollDice()`)
```javascript
function rollDice() {
    // Generate random number 1-6
    // Calculate new position
    // Handle boundary conditions (can't exceed 100)
    // Animate movement
    // Check for snakes/ladders
    // Check for winner
}
```

**Game Flow:**
1. Generate dice value (1-6)
2. Calculate new position
3. Validate move (can't go beyond 100)
4. Animate token movement
5. Apply snake/ladder effects
6. Check for victory condition
7. Switch to next player

##### 4. Snake & Ladder Logic
```javascript
// After movement animation completes:
if (snakes[newPosition]) {
    // Move down to snake's tail
    player.position = snakes[newPosition];
} else if (ladders[newPosition]) {
    // Move up to ladder's top
    player.position = ladders[newPosition];
}
```

##### 5. Bot AI (`nextTurn()`)
```javascript
// Auto-play for bot players
if (players[currentPlayerIndex].name.includes('Bot')) {
    setTimeout(() => {
        if (!rollDiceBtn.disabled) rollDice();
    }, 1500);
}
```

#### Game State Management

##### Player Object Structure
```javascript
{
    name: "Player 1",        // Player display name
    color: "red",            // Token color
    position: 1              // Current board position
}
```

##### Turn Management
- `currentPlayerIndex`: Tracks whose turn it is
- Cycles through players array: `(currentPlayerIndex + 1) % players.length`
- Bot turns are automated with 1.5-second delay

##### Timer System
```javascript
function startGameTimer() {
    gameTimer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - gameStartTime) / 1000);
        // Update display every second
    }, 1000);
}
```

## 🎯 Game Rules Implementation

### Movement Rules
1. **Dice Roll**: Random 1-6 value
2. **Forward Movement**: Add dice value to current position
3. **Boundary Check**: Cannot exceed position 100
4. **Exact Landing**: Must land exactly on 100 to win

### Snake Rules
- Landing on snake head (higher number) moves to tail (lower number)
- 10 snakes strategically placed on board
- Visual feedback with 🐍 emoji and red styling

### Ladder Rules  
- Landing on ladder bottom (lower number) moves to top (higher number)
- 9 ladders strategically placed on board
- Visual feedback with 🪜 emoji and green styling

### Victory Condition
- First player to reach exactly position 100 wins
- Game timer stops, winner popup displays
- "Play Again" option reloads the game

## 📱 Responsive Design

### Breakpoints
- **Desktop**: Default styling (768px+)
- **Tablet**: Adjusted layout (768px and below)
- **Mobile**: Optimized for small screens (480px and below)

### Mobile Optimizations
- Reduced board size (400px → 320px)
- Smaller tokens (14px → 10px)
- Adjusted padding and margins
- Touch-friendly button sizes

## 🎨 Visual Features

### CSS Effects
- **Glassmorphism**: Translucent panels with blur effects
- **Gradients**: Purple-blue background gradients
- **Animations**: Smooth transitions and hover effects
- **Pulse Effect**: Current player highlighting

### Color Scheme
- **Players**: Red, Blue, Green, Orange tokens
- **Snakes**: Red background with border
- **Ladders**: Green background with border
- **UI**: White/transparent overlays

## 🔧 Setup Instructions

### Method 1: Direct Use
1. Save the complete HTML file as `index.html`
2. Open in any modern web browser
3. No additional setup required

### Method 2: Development Setup
1. Create project folder
2. Save HTML, CSS, and JS in separate files
3. Link files in HTML head section
4. Serve with local development server

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🎮 Game Controls

### Setup Phase
- **Player Count**: Click number buttons (1-4)
- **Names**: Type in input fields (optional)
- **Start**: Click "Start Adventure" button

### Gameplay Phase
- **Roll Dice**: Click "🎲 Roll Dice" button
- **Menu**: Click "☰" for game options
- **Pause/Resume**: Use menu options
- **Reset**: Reload page or use menu

## 🐛 Known Limitations

1. **Local Storage**: Game state not saved between sessions
2. **Sound Effects**: No audio feedback
3. **Network Play**: No online multiplayer
4. **Undo Function**: No move reversal capability

## 🚀 Possible Enhancements

### Features to Add
- Save/load game functionality
- Sound effects and music
- Multiple board themes
- Tournament mode
- Statistics tracking
- Online multiplayer
- Custom snake/ladder positions

### Technical Improvements
- WebSocket for real-time multiplayer
- Local storage for game persistence
- Progressive Web App (PWA) features
- Advanced AI opponents

## 📄 License

This project is open source and available under the MIT License.

---

**Enjoy playing Snake & Ladder! 🎲🎉**
