document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('breakout-canvas');
    const ctx = canvas.getContext('2d');
    const scoreDisplay = document.getElementById('score');
    const livesDisplay = document.getElementById('lives');
    const levelDisplay = document.getElementById('level');
    const gameStartScreen = document.getElementById('game-start');
    const gameOverScreen = document.getElementById('game-over');
    const levelCompleteScreen = document.getElementById('level-complete');
    const finalScoreDisplay = document.getElementById('final-score');
    const nextLevelDisplay = document.getElementById('next-level');
    const restartButton = document.getElementById('restart-button');
    const leftButton = document.getElementById('left-button');
    const rightButton = document.getElementById('right-button');
    
    const ballRadius = 8;
    const paddleHeight = 10;
    const paddleWidth = 75;
    const brickRowCount = 5;
    const brickColumnCount = 8;
    const brickWidth = 50;
    const brickHeight = 20;
    const brickPadding = 10;
    const brickOffsetTop = 30;
    const brickOffsetLeft = 30;
    
    let score = 0;
    let lives = 3;
    let level = 1;
    let gameActive = false;
    let gameStarted = false;
    let rightPressed = false;
    let leftPressed = false;
    let animationFrameId = null;
    
    let ball = {
        x: canvas.width / 2,
        y: canvas.height - 30,
        dx: 4,
        dy: -4
    };
    
    let paddle = {
        x: (canvas.width - paddleWidth) / 2,
        y: canvas.height - paddleHeight - 10,
        width: paddleWidth,
        height: paddleHeight
    };
    
    let bricks = [];
    
    function initBricks() {
        bricks = [];
        for (let c = 0; c < brickColumnCount; c++) {
            bricks[c] = [];
            for (let r = 0; r < brickRowCount; r++) {
                let color;
                if (document.body.classList.contains('light')) {
                    const colors = ['#0ea5e9', '#0284c7', '#0369a1', '#075985', '#0c4a6e'];
                    color = colors[r];
                } else {
                    const colors = ['#00ffcc', '#00e6b8', '#00cca3', '#00b38f', '#00997a'];
                    color = colors[r];
                }
                
                bricks[c][r] = { 
                    x: 0, 
                    y: 0, 
                    status: 1, 
                    color: color,
                    points: (brickRowCount - r) * 10 
                };
            }
        }
    }
    
    function initGame() {
        score = 0;
        lives = 3;
        level = 1;
        
        ball = {
            x: canvas.width / 2,
            y: canvas.height - 30,
            dx: 4,
            dy: -4
        };
        
        paddle = {
            x: (canvas.width - paddleWidth) / 2,
            y: canvas.height - paddleHeight - 10,
            width: paddleWidth,
            height: paddleHeight
        };
        
        initBricks();
        
        scoreDisplay.textContent = score;
        livesDisplay.textContent = lives;
        levelDisplay.textContent = level;
        
        gameStartScreen.classList.remove('hidden');
        gameOverScreen.classList.add('hidden');
        levelCompleteScreen.classList.add('hidden');
        
        gameActive = false;
        gameStarted = false;
        draw();
    }
    
    function startGame() {
        if (!gameStarted) {
            gameStarted = true;
            gameActive = true;
            gameStartScreen.classList.add('hidden');
            gameLoop();
        } else if (!gameActive) {
            gameActive = true;
            levelCompleteScreen.classList.add('hidden');
            gameLoop();
        }
    }
    
    function gameLoop() {
        if (!gameActive) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        update();
        
        draw();
        
        animationFrameId = requestAnimationFrame(gameLoop);
    }
    
    function update() {
        if (rightPressed && paddle.x < canvas.width - paddle.width) {
            paddle.x += 7;
        } else if (leftPressed && paddle.x > 0) {
            paddle.x -= 7;
        }
        
        ball.x += ball.dx;
        ball.y += ball.dy;
        
        if (ball.x + ball.dx > canvas.width - ballRadius || ball.x + ball.dx < ballRadius) {
            ball.dx = -ball.dx;
        }
        
        if (ball.y + ball.dy < ballRadius) {
            ball.dy = -ball.dy;
        } else if (ball.y + ball.dy > canvas.height - ballRadius) {
            if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
                const hitPosition = (ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2);
                ball.dx = hitPosition * 5; 
                ball.dy = -Math.abs(ball.dy);
            } else {
                lives--;
                livesDisplay.textContent = lives;
                
                if (lives === 0) {
                    gameOver();
                } else {
                    ball.x = canvas.width / 2;
                    ball.y = canvas.height - 30;
                    ball.dx = 4;
                    ball.dy = -4;
                    paddle.x = (canvas.width - paddle.width) / 2;
                }
            }
        }
        
        collisionDetection();
    }
    
    function collisionDetection() {
        let bricksRemaining = 0;
        
        for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
                const brick = bricks[c][r];
                
                if (brick.status === 1) {
                    bricksRemaining++;
                    
                    const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                    const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                    brick.x = brickX;
                    brick.y = brickY;
                    
                    if (
                        ball.x > brickX && 
                        ball.x < brickX + brickWidth && 
                        ball.y > brickY && 
                        ball.y < brickY + brickHeight
                    ) {
                        ball.dy = -ball.dy;
                        brick.status = 0;
                        score += brick.points;
                        scoreDisplay.textContent = score;
                    }
                }
            }
        }
        
        if (bricksRemaining === 0) {
            levelComplete();
        }
    }
    
    function levelComplete() {
        gameActive = false;
        level++;
        
        levelDisplay.textContent = level;
        nextLevelDisplay.textContent = level;
        
        ball.dx *= 1.1;
        ball.dy *= 1.1;
        
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 30;
        paddle.x = (canvas.width - paddle.width) / 2;
        
        initBricks();
        
        levelCompleteScreen.classList.remove('hidden');
        
        cancelAnimationFrame(animationFrameId);
    }
    
    function gameOver() {
        gameActive = false;
        
        finalScoreDisplay.textContent = score;
        
        const highScore = localStorage.getItem('breakoutHighScore') || 0;
        if (score > highScore) {
            localStorage.setItem('breakoutHighScore', score);
        }
        
        gameOverScreen.classList.remove('hidden');
        
        cancelAnimationFrame(animationFrameId);
    }
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        drawBricks();
        
        drawBall();
        
        drawPaddle();
    }
    
    function drawBricks() {
        for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
                if (bricks[c][r].status === 1) {
                    const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                    const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                    
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = bricks[c][r].color;
                    ctx.fill();
                    ctx.closePath();
                    
                    ctx.strokeStyle = document.body.classList.contains('light') ? '#0c4a6e' : '#00997a';
                    ctx.strokeRect(brickX, brickY, brickWidth, brickHeight);
                }
            }
        }
    }
    function drawBall() {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = document.body.classList.contains('light') ? '#0ea5e9' : '#00ffcc';
        ctx.fill();
        ctx.closePath();
    }
    
    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
        ctx.fillStyle = document.body.classList.contains('light') ? '#0ea5e9' : '#00ffcc';
        ctx.fill();
        ctx.closePath();
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Right' || e.key === 'ArrowRight') {
            rightPressed = true;
        } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
            leftPressed = true;
        }
        
        if (!gameStarted || !gameActive) {
            startGame();
        }
    });
    
    document.addEventListener('keyup', (e) => {
        if (e.key === 'Right' || e.key === 'ArrowRight') {
            rightPressed = false;
        } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
            leftPressed = false;
        }
    });
    
    leftButton.addEventListener('touchstart', () => {
        leftPressed = true;
        if (!gameStarted || !gameActive) {
            startGame();
        }
    });
    
    leftButton.addEventListener('touchend', () => {
        leftPressed = false;
    });
    
    rightButton.addEventListener('touchstart', () => {
        rightPressed = true;
        if (!gameStarted || !gameActive) {
            startGame();
        }
    });
    
    rightButton.addEventListener('touchend', () => {
        rightPressed = false;
    });
    
    leftButton.addEventListener('mousedown', () => {
        leftPressed = true;
        if (!gameStarted || !gameActive) {
            startGame();
        }
    });
    
    leftButton.addEventListener('mouseup', () => {
        leftPressed = false;
    });
    
    rightButton.addEventListener('mousedown', () => {
        rightPressed = true;
        if (!gameStarted || !gameActive) {
            startGame();
        }
    });
    
    rightButton.addEventListener('mouseup', () => {
        rightPressed = false;
    });
    
    canvas.addEventListener('click', () => {
        if (!gameStarted || !gameActive) {
            startGame();
        }
    });
    
    restartButton.addEventListener('click', initGame);
    
    window.addEventListener('resize', () => {
        if (!gameActive) {
            draw();
        }
    });
    
    initGame();
});