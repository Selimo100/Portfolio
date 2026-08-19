document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('flappy-canvas');
    const ctx = canvas.getContext('2d');
    const scoreDisplay = document.getElementById('score');
    const highScoreDisplay = document.getElementById('high-score');
    const gameStartScreen = document.getElementById('game-start');
    const gameOverScreen = document.getElementById('game-over');
    const finalScoreDisplay = document.getElementById('final-score');
    const restartButton = document.getElementById('restart-button');
    
    const gravity = 0.5;
    const jumpStrength = -8;
    const pipeWidth = 60;
    const pipeGap = 150;
    const pipeSpacing = 200;
    
    let bird = {};
    let pipes = [];
    let score = 0;
    let highScore = localStorage.getItem('flappyHighScore') || 0;
    let gameActive = false;
    let gameStarted = false;
    let animationFrameId = null;
    
    highScoreDisplay.textContent = highScore;
    
    const birdImg = new Image();
    birdImg.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 30"><ellipse cx="20" cy="15" rx="18" ry="12" fill="%23FFDE59"/><circle cx="28" cy="10" r="3" fill="%23FFFFFF"/><circle cx="28" cy="10" r="1" fill="%23000000"/><path d="M15 15 Q20 20 25 15" stroke="%23FF6B6B" stroke-width="2" fill="none"/><path d="M38 15 L45 10" stroke="%23FF6B6B" stroke-width="2"/><path d="M38 15 L45 20" stroke="%23FF6B6B" stroke-width="2"/></svg>';
    
    function initGame() {
        bird = {
            x: 50,
            y: canvas.height / 2 - 15,
            width: 40,
            height: 30,
            velocity: 0
        };
        
        pipes = [];
        score = 0;
        gameActive = true;
        gameStarted = false;
        
        scoreDisplay.textContent = score;
        
        gameStartScreen.classList.remove('hidden');
        gameOverScreen.classList.add('hidden');
        
        draw();
    }
    
    function startGame() {
        gameStarted = true;
        gameStartScreen.classList.add('hidden');
        
        createPipe();
        
        gameLoop();
    }
    
    function gameLoop() {
        update();
        draw();
        
        if (gameActive) {
            animationFrameId = requestAnimationFrame(gameLoop);
        }
    }
    
    function update() {
        if (!gameStarted) return;
        
        bird.velocity += gravity;
        bird.y += bird.velocity;
        
        if (bird.y + bird.height >= canvas.height) {
            bird.y = canvas.height - bird.height;
            gameOver();
        }
        
        if (bird.y <= 0) {
            bird.y = 0;
            bird.velocity = 0;
        }
        
        for (let i = 0; i < pipes.length; i++) {
            pipes[i].x -= 2;
            
            if (
                bird.x + bird.width > pipes[i].x &&
                bird.x < pipes[i].x + pipeWidth &&
                (bird.y < pipes[i].topHeight || bird.y + bird.height > pipes[i].topHeight + pipeGap)
            ) {
                gameOver();
            }
            
            if (pipes[i].x + pipeWidth < bird.x && !pipes[i].passed) {
                pipes[i].passed = true;
                score++;
                scoreDisplay.textContent = score;
            }
            
            if (pipes[i].x + pipeWidth < 0) {
                pipes.splice(i, 1);
                i--;
            }
        }
        
        if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - pipeSpacing) {
            createPipe();
        }
    }
    
    function draw() {
        ctx.fillStyle = document.body.classList.contains('light') ? '#87CEEB' : '#0e1726';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = document.body.classList.contains('light') ? '#8B4513' : '#1e293b';
        ctx.fillRect(0, canvas.height - 20, canvas.width, 20);
        
        ctx.fillStyle = document.body.classList.contains('light') ? '#228B22' : '#00ffcc';
        ctx.fillRect(0, canvas.height - 20, canvas.width, 5);
        
        for (let i = 0; i < pipes.length; i++) {
            const pipeColor = document.body.classList.contains('light') ? '#0ea5e9' : '#00ffcc';
            
            ctx.fillStyle = pipeColor;
            ctx.fillRect(pipes[i].x, 0, pipeWidth, pipes[i].topHeight);
            
            ctx.fillRect(pipes[i].x, pipes[i].topHeight + pipeGap, pipeWidth, canvas.height - pipes[i].topHeight - pipeGap);
            
            ctx.fillStyle = document.body.classList.contains('light') ? '#0284c7' : '#00ccbb';
            ctx.fillRect(pipes[i].x - 3, pipes[i].topHeight - 10, pipeWidth + 6, 10);
            ctx.fillRect(pipes[i].x - 3, pipes[i].topHeight + pipeGap, pipeWidth + 6, 10);
        }
        
        ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }
    
    function createPipe() {
        const topHeight = Math.floor(Math.random() * (canvas.height - pipeGap - 100)) + 50;
        
        pipes.push({
            x: canvas.width,
            topHeight: topHeight,
            passed: false
        });
    }
    
    function jump() {
        if (!gameStarted) {
            startGame();
        } else if (gameActive) {
            bird.velocity = jumpStrength;
        }
    }
    
    function gameOver() {
        gameActive = false;
        
        if (score > highScore) {
            highScore = score;
            highScoreDisplay.textContent = highScore;
            localStorage.setItem('flappyHighScore', highScore);
        }
        
        finalScoreDisplay.textContent = score;
        gameOverScreen.classList.remove('hidden');
        
        cancelAnimationFrame(animationFrameId);
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            jump();
            e.preventDefault();
        }
    });
    
    canvas.addEventListener('click', jump);
    
    restartButton.addEventListener('click', initGame);
    
    initGame();
});