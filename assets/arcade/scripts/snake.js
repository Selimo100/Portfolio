document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('snake-canvas');
    const ctx = canvas.getContext('2d');
    const scoreDisplay = document.getElementById('score');
    const highScoreDisplay = document.getElementById('high-score');
    const gameOverScreen = document.getElementById('game-over');
    const finalScoreDisplay = document.getElementById('final-score');
    const restartButton = document.getElementById('restart-button');
    
    const upButton = document.getElementById('up-button');
    const downButton = document.getElementById('down-button');
    const leftButton = document.getElementById('left-button');
    const rightButton = document.getElementById('right-button');
    
    const gridSize = 20;
    const tileCount = canvas.width / gridSize;
    let speed = 7;
    
    let snake = [];
    let food = {};
    let direction = 'right';
    let nextDirection = 'right';
    let score = 0;
    let highScore = localStorage.getItem('snakeHighScore') || 0;
    let gameActive = true;
    
    highScoreDisplay.textContent = highScore;
    
    function initGame() {
        snake = [
            { x: 5, y: 10 },
            { x: 4, y: 10 },
            { x: 3, y: 10 }
        ];
        
        direction = 'right';
        nextDirection = 'right';
        
        score = 0;
        scoreDisplay.textContent = score;
        
        placeFood();
        
        gameOverScreen.classList.add('hidden');
        
        gameActive = true;
        gameLoop();
    }
    
    function placeFood() {
        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
        
        for (let i = 0; i < snake.length; i++) {
            if (food.x === snake[i].x && food.y === snake[i].y) {
                placeFood();
                break;
            }
        }
    }
    
    function update() {
        if (!gameActive) return;
        
        direction = nextDirection;
        
        const head = { x: snake[0].x, y: snake[0].y };
        
        switch (direction) {
            case 'up':
                head.y--;
                break;
            case 'down':
                head.y++;
                break;
            case 'left':
                head.x--;
                break;
            case 'right':
                head.x++;
                break;
        }
        
        if (
            head.x < 0 || head.x >= tileCount ||
            head.y < 0 || head.y >= tileCount ||
            checkSnakeCollision(head)
        ) {
            gameOver();
            return;
        }
        
        snake.unshift(head);
        
        if (head.x === food.x && head.y === food.y) {
            score++;
            scoreDisplay.textContent = score;
            
            if (score % 5 === 0) {
                speed += 1;
            }
            
            placeFood();
        } else {
            snake.pop();
        }
    }
    
    function checkSnakeCollision(head) {
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                return true;
            }
        }
        return false;
    }
    
    function draw() {
        ctx.fillStyle = document.body.classList.contains('light') ? '#f8fafc' : '#0e1726';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = document.body.classList.contains('light') ? '#0ea5e9' : '#00ffcc';
        ctx.beginPath();
        ctx.arc(
            food.x * gridSize + gridSize / 2,
            food.y * gridSize + gridSize / 2,
            gridSize / 2 - 2,
            0,
            Math.PI * 2
        );
        ctx.fill();
        
        for (let i = 0; i < snake.length; i++) {
            if (i === 0) {
                ctx.fillStyle = document.body.classList.contains('light') ? '#0369a1' : '#00ccbb';
            } else {
                ctx.fillStyle = document.body.classList.contains('light') ? '#0ea5e9' : '#00ffcc';
            }
            
            ctx.fillRect(
                snake[i].x * gridSize + 1,
                snake[i].y * gridSize + 1,
                gridSize - 2,
                gridSize - 2
            );
        }
    }
    
    function gameOver() {
        gameActive = false;
        
        if (score > highScore) {
            highScore = score;
            highScoreDisplay.textContent = highScore;
            localStorage.setItem('snakeHighScore', highScore);
        }
        
        finalScoreDisplay.textContent = score;
        gameOverScreen.classList.remove('hidden');
    }
    
    function gameLoop() {
        update();
        draw();
        
        if (gameActive) {
            setTimeout(gameLoop, 1000 / speed);
        }
    }
    
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                if (direction !== 'down') nextDirection = 'up';
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                if (direction !== 'up') nextDirection = 'down';
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                if (direction !== 'right') nextDirection = 'left';
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                if (direction !== 'left') nextDirection = 'right';
                break;
        }
    });
    
    upButton.addEventListener('click', () => {
        if (direction !== 'down') nextDirection = 'up';
    });
    
    downButton.addEventListener('click', () => {
        if (direction !== 'up') nextDirection = 'down';
    });
    
    leftButton.addEventListener('click', () => {
        if (direction !== 'right') nextDirection = 'left';
    });
    
    rightButton.addEventListener('click', () => {
        if (direction !== 'left') nextDirection = 'right';
    });
    
    restartButton.addEventListener('click', initGame);
    
    initGame();
});