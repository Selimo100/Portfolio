    const canvas = document.getElementById("pacman-canvas")
    const ctx = canvas.getContext("2d")
    const scoreDisplay = document.getElementById("score")
    const livesDisplay = document.getElementById("lives")
    const levelDisplay = document.getElementById("level")
    const gameStartScreen = document.getElementById("game-start")
    const gameOverScreen = document.getElementById("game-over")
    const levelCompleteScreen = document.getElementById("level-complete")
    const finalScoreDisplay = document.getElementById("final-score")
    const nextLevelDisplay = document.getElementById("next-level")
    const restartButton = document.getElementById("restart-button")
    const upButton = document.getElementById("up-button")
    const leftButton = document.getElementById("left-button")
    const rightButton = document.getElementById("right-button")
    const downButton = document.getElementById("down-button")

    const GRID_SIZE = 20
    const GRID_WIDTH = 21
    const GRID_HEIGHT = 21 
    canvas.width = GRID_SIZE * GRID_WIDTH
    canvas.height = GRID_SIZE * GRID_HEIGHT

    const PACMAN_RADIUS = GRID_SIZE / 2 - 1
    const GHOST_RADIUS = GRID_SIZE / 2 - 1
    const DOT_RADIUS = GRID_SIZE / 6
    const POWER_DOT_RADIUS = GRID_SIZE / 3
    const GHOST_SPEED = 2
    const PACMAN_SPEED = 3

    let score = 0
    let lives = 3
    let level = 1
    let gameActive = false
    let gameStarted = false
    let upPressed = false
    let downPressed = false
    let leftPressed = false
    let rightPressed = false
    let animationFrameId = null
    let ghostFrightened = false
    let ghostFrightenedTimer = 0
    let dotsRemaining = 0
    let lastTime = 0

    const DIRECTIONS = {
        UP: { x: 0, y: -1 },
        DOWN: { x: 0, y: 1 },
        LEFT: { x: -1, y: 0 },
        RIGHT: { x: 1, y: 0 },
        NONE: { x: 0, y: 0 },
    }

    let pacman = {
        x: GRID_SIZE * 10 + GRID_SIZE / 2,
        y: GRID_SIZE * 15 + GRID_SIZE / 2,
        radius: PACMAN_RADIUS,
        speed: PACMAN_SPEED,
        direction: DIRECTIONS.NONE,
        nextDirection: DIRECTIONS.NONE,
        mouthOpen: 0.2,
        mouthDir: 0.1,
        angle: 0,
        gridAlign: true,
        blocked: false, 
    }

    const ghostColors = [
        { fill: "#FF0000", stroke: "#880000" }, 
        { fill: "#FFB8FF", stroke: "#FF00FF" }, 
        { fill: "#00FFFF", stroke: "#00BBBB" }, 
        { fill: "#FFB852", stroke: "#FF8800" }, 
    ]

    let ghosts = []

    const mazeTemplate = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
        [1, 3, 1, 0, 1, 2, 1, 0, 1, 2, 1, 2, 1, 0, 1, 2, 1, 0, 1, 3, 1],
        [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 1, 1, 1, 2, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 2, 1, 0, 1, 1, 4, 1, 1, 0, 1, 2, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1], 
        [1, 3, 2, 2, 1, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 1, 2, 2, 3, 1],
        [1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1],
        [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]

    let maze = []

    function initGame() {
        score = 0
        lives = 3
        level = 1

        pacman = {
            x: GRID_SIZE * 10 + GRID_SIZE / 2,
            y: GRID_SIZE * 17 + GRID_SIZE / 2, 
            radius: PACMAN_RADIUS,
            speed: PACMAN_SPEED,
            direction: DIRECTIONS.NONE,
            nextDirection: DIRECTIONS.NONE,
            mouthOpen: 0.2,
            mouthDir: 0.1,
            angle: 0,
            gridAlign: true,
            blocked: false,
        }

        initMaze()

        initGhosts()

        scoreDisplay.textContent = score
        livesDisplay.textContent = lives
        levelDisplay.textContent = level

        gameStartScreen.classList.remove("hidden")
        gameOverScreen.classList.add("hidden")
        levelCompleteScreen.classList.add("hidden")

        gameActive = false
        gameStarted = false
        ghostFrightened = false
        ghostFrightenedTimer = 0

        draw()
    }

    function initMaze() {
        maze = JSON.parse(JSON.stringify(mazeTemplate))
        dotsRemaining = 0

        for (let y = 0; y < GRID_HEIGHT; y++) {
            for (let x = 0; x < GRID_WIDTH; x++) {
                if (maze[y][x] === 2 || maze[y][x] === 3) {
                    dotsRemaining++
                }
            }
        }
    }

    function initGhosts() {
        ghosts = []

        const ghostStartPositions = [
            { x: 10 * GRID_SIZE + GRID_SIZE / 2, y: 11 * GRID_SIZE + GRID_SIZE / 2 },
            { x: 9 * GRID_SIZE + GRID_SIZE / 2, y: 11 * GRID_SIZE + GRID_SIZE / 2 }, 
            { x: 11 * GRID_SIZE + GRID_SIZE / 2, y: 11 * GRID_SIZE + GRID_SIZE / 2 },
            { x: 10 * GRID_SIZE + GRID_SIZE / 2, y: 10 * GRID_SIZE + GRID_SIZE / 2 },
        ]

        for (let i = 0; i < 4; i++) {
            ghosts.push({
                x: ghostStartPositions[i].x,
                y: ghostStartPositions[i].y,
                radius: GHOST_RADIUS,
                speed: GHOST_SPEED * (0.6 + level * 0.05), 
                direction: DIRECTIONS.LEFT,
                color: ghostColors[i],
                frightened: false,
                startPosition: { ...ghostStartPositions[i] },
                targetTile: { x: 0, y: 0 },
                mode: "scatter", 
                releaseTime: 0,
                gridAlign: true,
                blocked: false, 
            })
        }
    }

    function startGame() {
        if (!gameStarted) {
            gameStarted = true
            gameActive = true
            gameStartScreen.classList.add("hidden")
            lastTime = performance.now()
            gameLoop(lastTime)
        } else if (!gameActive) {
            gameActive = true
            levelCompleteScreen.classList.add("hidden")
            lastTime = performance.now()
            gameLoop(lastTime)
        }
    }

    function gameLoop(timestamp) {
        if (!gameActive) return

        const deltaTime = timestamp - lastTime
        lastTime = timestamp

        update(deltaTime / 16) 
        draw()

        animationFrameId = requestAnimationFrame(gameLoop)
    }

    function update(deltaTime) {
        pacman.mouthOpen += pacman.mouthDir * deltaTime * 0.1
        if (pacman.mouthOpen > 0.5 || pacman.mouthOpen < 0.05) {
            pacman.mouthDir *= -1
        }

        const gridX = Math.floor(pacman.x / GRID_SIZE)
        const gridY = Math.floor(pacman.y / GRID_SIZE)

        const isAlignedX = Math.abs((pacman.x - GRID_SIZE / 2) % GRID_SIZE) < 1
        const isAlignedY = Math.abs((pacman.y - GRID_SIZE / 2) % GRID_SIZE) < 1

        if (isAlignedX && isAlignedY) {
            pacman.gridAlign = true
            pacman.blocked = false 

            pacman.x = gridX * GRID_SIZE + GRID_SIZE / 2
            pacman.y = gridY * GRID_SIZE + GRID_SIZE / 2

            if (pacman.nextDirection !== DIRECTIONS.NONE) {
                const nextX = gridX + pacman.nextDirection.x
                const nextY = gridY + pacman.nextDirection.y

                if (nextX >= 0 && nextX < GRID_WIDTH && nextY >= 0 && nextY < GRID_HEIGHT && maze[nextY][nextX] !== 1) {
                    pacman.direction = pacman.nextDirection
                    pacman.nextDirection = DIRECTIONS.NONE

                    if (pacman.direction === DIRECTIONS.RIGHT) pacman.angle = 0
                    else if (pacman.direction === DIRECTIONS.DOWN) pacman.angle = Math.PI / 2
                    else if (pacman.direction === DIRECTIONS.LEFT) pacman.angle = Math.PI
                    else if (pacman.direction === DIRECTIONS.UP) pacman.angle = (Math.PI * 3) / 2
                }
            }
        }

        if (pacman.direction !== DIRECTIONS.NONE && !pacman.blocked) {
            const nextX = pacman.x + pacman.direction.x * pacman.speed * deltaTime
            const nextY = pacman.y + pacman.direction.y * pacman.speed * deltaTime

            const nextGridX = Math.floor(nextX / GRID_SIZE)
            const nextGridY = Math.floor(nextY / GRID_SIZE)

            if (nextGridX >= 0 && nextGridX < GRID_WIDTH && nextGridY >= 0 && nextGridY < GRID_HEIGHT) {
                if (maze[nextGridY][nextGridX] === 1) {
                    if (pacman.direction === DIRECTIONS.RIGHT) {
                        pacman.x = nextGridX * GRID_SIZE - pacman.radius - 1
                    } else if (pacman.direction === DIRECTIONS.LEFT) {
                        pacman.x = (nextGridX + 1) * GRID_SIZE + pacman.radius + 1
                    } else if (pacman.direction === DIRECTIONS.DOWN) {
                        pacman.y = nextGridY * GRID_SIZE - pacman.radius - 1
                    } else if (pacman.direction === DIRECTIONS.UP) {
                        pacman.y = (nextGridY + 1) * GRID_SIZE + pacman.radius + 1
                    }

                    pacman.blocked = true
                } else {
                    pacman.x = nextX
                    pacman.y = nextY
                }
            } else {
                if (nextX < 0) {
                    pacman.x = canvas.width - GRID_SIZE / 2
                } else if (nextX > canvas.width) {
                    pacman.x = GRID_SIZE / 2
                } else if (nextY < 0) {
                    pacman.y = canvas.height - GRID_SIZE / 2
                } else if (nextY > canvas.height) {
                    pacman.y = GRID_SIZE / 2
                }
            }

            const centerGridX = Math.floor(pacman.x / GRID_SIZE)
            const centerGridY = Math.floor(pacman.y / GRID_SIZE)

            if (centerGridX >= 0 && centerGridX < GRID_WIDTH && centerGridY >= 0 && centerGridY < GRID_HEIGHT) {
                if (maze[centerGridY][centerGridX] === 2) {
                    maze[centerGridY][centerGridX] = 0
                    score += 10
                    dotsRemaining--
                    scoreDisplay.textContent = score
                } else if (maze[centerGridY][centerGridX] === 3) {
                    maze[centerGridY][centerGridX] = 0
                    score += 50
                    dotsRemaining--
                    scoreDisplay.textContent = score

                    ghostFrightened = true
                    ghostFrightenedTimer = 8000 - level * 1000 
                    if (ghostFrightenedTimer < 2000) ghostFrightenedTimer = 2000 

                    ghosts.forEach((ghost) => {
                        ghost.frightened = true
                        if (ghost.direction === DIRECTIONS.UP) ghost.direction = DIRECTIONS.DOWN
                        else if (ghost.direction === DIRECTIONS.DOWN) ghost.direction = DIRECTIONS.UP
                        else if (ghost.direction === DIRECTIONS.LEFT) ghost.direction = DIRECTIONS.RIGHT
                        else if (ghost.direction === DIRECTIONS.RIGHT) ghost.direction = DIRECTIONS.LEFT
                    })
                }
            }
        }

        if (ghostFrightened) {
            ghostFrightenedTimer -= 16 * deltaTime 
            if (ghostFrightenedTimer <= 0) {
                ghostFrightened = false
                ghosts.forEach((ghost) => {
                    ghost.frightened = false
                })
            }
        }

        ghosts.forEach((ghost) => {
            if (ghost.releaseTime > 0) {
                ghost.releaseTime -= 16 * deltaTime
                return
            }

            const speed = ghost.frightened ? ghost.speed * 0.5 : ghost.speed

            const ghostGridX = Math.floor(ghost.x / GRID_SIZE)
            const ghostGridY = Math.floor(ghost.y / GRID_SIZE)

            const isGhostAlignedX = Math.abs((ghost.x - GRID_SIZE / 2) % GRID_SIZE) < speed
            const isGhostAlignedY = Math.abs((ghost.y - GRID_SIZE / 2) % GRID_SIZE) < speed

            if (isGhostAlignedX && isGhostAlignedY) {
                ghost.x = ghostGridX * GRID_SIZE + GRID_SIZE / 2
                ghost.y = ghostGridY * GRID_SIZE + GRID_SIZE / 2
                ghost.gridAlign = true
                ghost.blocked = false 

                const possibleDirections = []

                if (ghostGridY > 0 && maze[ghostGridY - 1][ghostGridX] !== 1 && ghost.direction !== DIRECTIONS.DOWN) {
                    possibleDirections.push(DIRECTIONS.UP)
                }
                if (
                    ghostGridY < GRID_HEIGHT - 1 &&
                    maze[ghostGridY + 1][ghostGridX] !== 1 &&
                    ghost.direction !== DIRECTIONS.UP
                ) {
                    possibleDirections.push(DIRECTIONS.DOWN)
                }
                if (ghostGridX > 0 && maze[ghostGridY][ghostGridX - 1] !== 1 && ghost.direction !== DIRECTIONS.RIGHT) {
                    possibleDirections.push(DIRECTIONS.LEFT)
                }
                if (
                    ghostGridX < GRID_WIDTH - 1 &&
                    maze[ghostGridY][ghostGridX + 1] !== 1 &&
                    ghost.direction !== DIRECTIONS.LEFT
                ) {
                    possibleDirections.push(DIRECTIONS.RIGHT)
                }

                if (possibleDirections.length === 0) {
                    if (ghost.direction !== DIRECTIONS.DOWN && ghostGridY > 0 && maze[ghostGridY - 1][ghostGridX] !== 1) {
                        possibleDirections.push(DIRECTIONS.UP)
                    }
                    if (
                        ghost.direction !== DIRECTIONS.UP &&
                        ghostGridY < GRID_HEIGHT - 1 &&
                        maze[ghostGridY + 1][ghostGridX] !== 1
                    ) {
                        possibleDirections.push(DIRECTIONS.DOWN)
                    }
                    if (ghost.direction !== DIRECTIONS.RIGHT && ghostGridX > 0 && maze[ghostGridY][ghostGridX - 1] !== 1) {
                        possibleDirections.push(DIRECTIONS.LEFT)
                    }
                    if (
                        ghost.direction !== DIRECTIONS.LEFT &&
                        ghostGridX < GRID_WIDTH - 1 &&
                        maze[ghostGridY][ghostGridX + 1] !== 1
                    ) {
                        possibleDirections.push(DIRECTIONS.RIGHT)
                    }
                }

                if (ghost.frightened) {
                    const randomIndex = Math.floor(Math.random() * possibleDirections.length)
                    ghost.direction = possibleDirections[randomIndex] || ghost.direction
                } else {
                    let targetX, targetY

                    if (ghost.color.fill === "#FF0000") {
                        targetX = Math.floor(pacman.x / GRID_SIZE) + pacman.direction.x * 2
                        targetY = Math.floor(pacman.y / GRID_SIZE) + pacman.direction.y * 2
                    } else if (ghost.color.fill === "#FFB8FF") {
                        targetX = Math.floor(pacman.x / GRID_SIZE) + pacman.direction.x * 2
                        targetY = Math.floor(pacman.y / GRID_SIZE) + pacman.direction.y * 2
                    } else if (ghost.color.fill === "#00FFFF") {
                        const pacmanX = Math.floor(pacman.x / GRID_SIZE)
                        const pacmanY = Math.floor(pacman.y / GRID_SIZE)

                        const offsetX = Math.floor(Math.random() * 5) - 2
                        const offsetY = Math.floor(Math.random() * 5) - 2

                        targetX = pacmanX + offsetX
                        targetY = pacmanY + offsetY
                    } else {
                        const pacmanX = Math.floor(pacman.x / GRID_SIZE)
                        const pacmanY = Math.floor(pacman.y / GRID_SIZE)
                        const distance = Math.sqrt(Math.pow(ghostGridX - pacmanX, 2) + Math.pow(ghostGridY - pacmanY, 2))

                        if (distance > 5) {
                            targetX = pacmanX
                            targetY = pacmanY
                        } else {
                            const corners = [
                                { x: 1, y: 1 },
                                { x: GRID_WIDTH - 2, y: 1 },
                                { x: 1, y: GRID_HEIGHT - 2 },
                                { x: GRID_WIDTH - 2, y: GRID_HEIGHT - 2 },
                            ]
                            const corner = corners[Math.floor(Math.random() * corners.length)]
                            targetX = corner.x
                            targetY = corner.y
                        }
                    }

                    targetX = Math.max(0, Math.min(GRID_WIDTH - 1, targetX))
                    targetY = Math.max(0, Math.min(GRID_HEIGHT - 1, targetY))

                    let bestDirection = ghost.direction
                    let bestDistance = Number.POSITIVE_INFINITY

                    possibleDirections.forEach((direction) => {
                        const newX = ghostGridX + direction.x
                        const newY = ghostGridY + direction.y
                        const distance = Math.sqrt(Math.pow(newX - targetX, 2) + Math.pow(newY - targetY, 2))

                        if (distance < bestDistance) {
                            bestDistance = distance
                            bestDirection = direction
                        }
                    })

                    if (Math.random() < 0.05) {
                        const randomIndex = Math.floor(Math.random() * possibleDirections.length)
                        ghost.direction = possibleDirections[randomIndex] || bestDirection
                    } else {
                        ghost.direction = bestDirection
                    }
                }
            }

            if (!ghost.blocked) {
                const nextX = ghost.x + ghost.direction.x * speed * deltaTime
                const nextY = ghost.y + ghost.direction.y * speed * deltaTime

                const nextGridX = Math.floor(nextX / GRID_SIZE)
                const nextGridY = Math.floor(nextY / GRID_SIZE)

                if (nextGridX >= 0 && nextGridX < GRID_WIDTH && nextGridY >= 0 && nextGridY < GRID_HEIGHT) {
                    if (maze[nextGridY][nextGridX] === 1) {
                        if (ghost.direction === DIRECTIONS.RIGHT) {
                            ghost.x = nextGridX * GRID_SIZE - ghost.radius - 1
                        } else if (ghost.direction === DIRECTIONS.LEFT) {
                            ghost.x = (nextGridX + 1) * GRID_SIZE + ghost.radius + 1
                        } else if (ghost.direction === DIRECTIONS.DOWN) {
                            ghost.y = nextGridY * GRID_SIZE - ghost.radius - 1
                        } else if (ghost.direction === DIRECTIONS.UP) {
                            ghost.y = (nextGridY + 1) * GRID_SIZE + ghost.radius + 1
                        }
                        ghost.blocked = true
                    } else {
                        ghost.x = nextX
                        ghost.y = nextY
                    }
                } else {
                    if (nextX < 0) ghost.x = canvas.width - GRID_SIZE / 2
                    else if (nextX > canvas.width) ghost.x = GRID_SIZE / 2
                    else if (nextY < 0) ghost.y = canvas.height - GRID_SIZE / 2
                    else if (nextY > canvas.height) ghost.y = GRID_SIZE / 2
                }
            }

            const distance = Math.sqrt(Math.pow(ghost.x - pacman.x, 2) + Math.pow(ghost.y - pacman.y, 2))

            if (distance < PACMAN_RADIUS + GHOST_RADIUS) {
                if (ghost.frightened) {
                    score += 200 * Math.pow(2, level - 1)
                    scoreDisplay.textContent = score

                    ghost.x = ghost.startPosition.x
                    ghost.y = ghost.startPosition.y
                    ghost.frightened = false
                    ghost.direction = DIRECTIONS.LEFT
                    ghost.releaseTime = 3000
                    ghost.blocked = false
                } else {
                    lives--
                    livesDisplay.textContent = lives

                    if (lives === 0) {
                        gameOver()
                    } else {
                        resetPositions()
                    }
                }
            }
        })

        if (dotsRemaining === 0) {
            levelComplete()
        }
    }

    function resetPositions() {
        pacman.x = GRID_SIZE * 10 + GRID_SIZE / 2
        pacman.y = GRID_SIZE * 17 + GRID_SIZE / 2 
        pacman.direction = DIRECTIONS.NONE
        pacman.nextDirection = DIRECTIONS.NONE
        pacman.gridAlign = true
        pacman.blocked = false

        ghosts.forEach((ghost) => {
            ghost.x = ghost.startPosition.x
            ghost.y = ghost.startPosition.y
            ghost.direction = DIRECTIONS.LEFT
            ghost.frightened = false
            ghost.releaseTime = 0 
            ghost.gridAlign = true
            ghost.blocked = false
        })

        ghostFrightened = false
        ghostFrightenedTimer = 0
    }

    function levelComplete() {
        gameActive = false
        level++

        levelDisplay.textContent = level
        nextLevelDisplay.textContent = level

        pacman.speed = PACMAN_SPEED + level * 0.1 
        resetPositions()

        initMaze()

        levelCompleteScreen.classList.remove("hidden")

        cancelAnimationFrame(animationFrameId)
    }

    function gameOver() {
        gameActive = false

        finalScoreDisplay.textContent = score

        const highScore = localStorage.getItem("pacmanHighScore") || 0
        if (score > highScore) {
            localStorage.setItem("pacmanHighScore", score)
        }

        gameOverScreen.classList.remove("hidden")

        cancelAnimationFrame(animationFrameId)
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        drawMaze()

        drawPacman()

        drawGhosts()
    }

    function drawMaze() {
        for (let y = 0; y < GRID_HEIGHT; y++) {
            for (let x = 0; x < GRID_WIDTH; x++) {
                const cellType = maze[y][x]

                if (cellType === 1) {
                    ctx.fillStyle = document.body.classList.contains("light") ? "#0c4a6e" : "#00997a"
                    ctx.fillRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE)
                } else if (cellType === 2) {
                    ctx.beginPath()
                    ctx.arc(x * GRID_SIZE + GRID_SIZE / 2, y * GRID_SIZE + GRID_SIZE / 2, DOT_RADIUS, 0, Math.PI * 2)
                    ctx.fillStyle = document.body.classList.contains("light") ? "#0ea5e9" : "#00ffcc"
                    ctx.fill()
                    ctx.closePath()
                } else if (cellType === 3) {
                    ctx.beginPath()
                    ctx.arc(x * GRID_SIZE + GRID_SIZE / 2, y * GRID_SIZE + GRID_SIZE / 2, POWER_DOT_RADIUS, 0, Math.PI * 2)

                    const pulseRate = (Math.sin(Date.now() / 200) + 1) / 2
                    ctx.fillStyle = document.body.classList.contains("light")
                        ? `rgba(14, 165, 233, ${0.5 + pulseRate * 0.5})`
                        : `rgba(0, 255, 204, ${0.5 + pulseRate * 0.5})`

                    ctx.fill()
                    ctx.closePath()
                }
            }
        }
    }

    function drawPacman() {
        ctx.beginPath()

        ctx.arc(
            pacman.x,
            pacman.y,
            pacman.radius,
            pacman.angle + pacman.mouthOpen * Math.PI,
            pacman.angle + (2 - pacman.mouthOpen) * Math.PI,
        )

        ctx.lineTo(pacman.x, pacman.y)

        ctx.fillStyle = document.body.classList.contains("light") ? "#0ea5e9" : "#FFFF00"
        ctx.fill()
        ctx.closePath()
    }

    function drawGhosts() {
        ghosts.forEach((ghost) => {
            ctx.beginPath()
            ctx.arc(ghost.x, ghost.y, ghost.radius, Math.PI, 0, false)

            const skirtY = ghost.y + ghost.radius
            ctx.lineTo(ghost.x + ghost.radius, skirtY)

            const waveCount = 4
            const waveWidth = (ghost.radius * 2) / waveCount
            const waveHeight = ghost.radius / 2

            for (let i = 0; i < waveCount; i++) {
                const waveX = ghost.x + ghost.radius - i * waveWidth - waveWidth / 2
                ctx.lineTo(waveX, skirtY + waveHeight)
                ctx.lineTo(waveX - waveWidth / 2, skirtY)
            }

            ctx.lineTo(ghost.x - ghost.radius, skirtY)
            ctx.closePath()

            if (ghost.frightened) {
                const isBlinking = ghostFrightenedTimer < 2000 && Math.floor(Date.now() / 200) % 2 === 0

                ctx.fillStyle = isBlinking ? "#FFFFFF" : "#2222FF"
            } else {
                ctx.fillStyle = ghost.color.fill
            }

            ctx.fill()

            const eyeRadius = ghost.radius / 3
            const eyeOffsetX = ghost.radius / 3
            const eyeOffsetY = -ghost.radius / 5
            const pupilRadius = eyeRadius / 2

            ctx.fillStyle = "#FFFFFF"

            ctx.beginPath()
            ctx.arc(ghost.x - eyeOffsetX, ghost.y + eyeOffsetY, eyeRadius, 0, Math.PI * 2)
            ctx.fill()
            ctx.closePath()

            ctx.beginPath()
            ctx.arc(ghost.x + eyeOffsetX, ghost.y + eyeOffsetY, eyeRadius, 0, Math.PI * 2)
            ctx.fill()
            ctx.closePath()

            if (!ghost.frightened) {
                ctx.fillStyle = "#000000"

                let pupilOffsetX = 0
                let pupilOffsetY = 0

                if (ghost.direction === DIRECTIONS.UP) {
                    pupilOffsetY = -pupilRadius
                } else if (ghost.direction === DIRECTIONS.DOWN) {
                    pupilOffsetY = pupilRadius
                } else if (ghost.direction === DIRECTIONS.LEFT) {
                    pupilOffsetX = -pupilRadius
                } else if (ghost.direction === DIRECTIONS.RIGHT) {
                    pupilOffsetX = pupilRadius
                }

                ctx.beginPath()
                ctx.arc(ghost.x - eyeOffsetX + pupilOffsetX, ghost.y + eyeOffsetY + pupilOffsetY, pupilRadius, 0, Math.PI * 2)
                ctx.fill()
                ctx.closePath()

                ctx.beginPath()
                ctx.arc(ghost.x + eyeOffsetX + pupilOffsetX, ghost.y + eyeOffsetY + pupilOffsetY, pupilRadius, 0, Math.PI * 2)
                ctx.fill()
                ctx.closePath()
            } else {
                ctx.strokeStyle = "#FFFFFF"
                ctx.lineWidth = 2

                const leftEyeX = ghost.x - eyeOffsetX
                const leftEyeY = ghost.y + eyeOffsetY
                ctx.beginPath()
                ctx.moveTo(leftEyeX - pupilRadius, leftEyeY - pupilRadius)
                ctx.lineTo(leftEyeX + pupilRadius, leftEyeY + pupilRadius)
                ctx.moveTo(leftEyeX + pupilRadius, leftEyeY - pupilRadius)
                ctx.lineTo(leftEyeX - pupilRadius, leftEyeY + pupilRadius)
                ctx.stroke()
                ctx.closePath()

                const rightEyeX = ghost.x + eyeOffsetX
                const rightEyeY = ghost.y + eyeOffsetY
                ctx.beginPath()
                ctx.moveTo(rightEyeX - pupilRadius, rightEyeY - pupilRadius)
                ctx.lineTo(rightEyeX + pupilRadius, rightEyeY + pupilRadius)
                ctx.moveTo(rightEyeX + pupilRadius, rightEyeY - pupilRadius)
                ctx.lineTo(rightEyeX - pupilRadius, rightEyeY + pupilRadius)
                ctx.stroke()
                ctx.closePath()
            }
        })
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowUp" || e.key === "w") {
            upPressed = true
            pacman.nextDirection = DIRECTIONS.UP
        } else if (e.key === "ArrowDown" || e.key === "s") {
            downPressed = true
            pacman.nextDirection = DIRECTIONS.DOWN
        } else if (e.key === "ArrowLeft" || e.key === "a") {
            leftPressed = true
            pacman.nextDirection = DIRECTIONS.LEFT
        } else if (e.key === "ArrowRight" || e.key === "d") {
            rightPressed = true
            pacman.nextDirection = DIRECTIONS.RIGHT
        }

        if (!gameStarted || !gameActive) {
            startGame()
        }
    })

    document.addEventListener("keyup", (e) => {
        if (e.key === "ArrowUp" || e.key === "w") {
            upPressed = false
        } else if (e.key === "ArrowDown" || e.key === "s") {
            downPressed = false
        } else if (e.key === "ArrowLeft" || e.key === "a") {
            leftPressed = false
        } else if (e.key === "ArrowRight" || e.key === "d") {
            rightPressed = false
        }
    })

    upButton.addEventListener("touchstart", () => {
        upPressed = true
        pacman.nextDirection = DIRECTIONS.UP
        if (!gameStarted || !gameActive) {
            startGame()
        }
    })

    upButton.addEventListener("touchend", () => {
        upPressed = false
    })

    downButton.addEventListener("touchstart", () => {
        downPressed = true
        pacman.nextDirection = DIRECTIONS.DOWN
        if (!gameStarted || !gameActive) {
            startGame()
        }
    })

    downButton.addEventListener("touchend", () => {
        downPressed = false
    })

    leftButton.addEventListener("touchstart", () => {
        leftPressed = true
        pacman.nextDirection = DIRECTIONS.LEFT
        if (!gameStarted || !gameActive) {
            startGame()
        }
    })

    leftButton.addEventListener("touchend", () => {
        leftPressed = false
    })

    rightButton.addEventListener("touchstart", () => {
        rightPressed = true
        pacman.nextDirection = DIRECTIONS.RIGHT
        if (!gameStarted || !gameActive) {
            startGame()
        }
    })

    rightButton.addEventListener("touchend", () => {
        rightPressed = false
    })

    upButton.addEventListener("mousedown", () => {
        upPressed = true
        pacman.nextDirection = DIRECTIONS.UP
        if (!gameStarted || !gameActive) {
            startGame()
        }
    })

    upButton.addEventListener("mouseup", () => {
        upPressed = false
    })

    downButton.addEventListener("mousedown", () => {
        downPressed = true
        pacman.nextDirection = DIRECTIONS.DOWN
        if (!gameStarted || !gameActive) {
            startGame()
        }
    })

    downButton.addEventListener("mouseup", () => {
        downPressed = false
    })

    leftButton.addEventListener("mousedown", () => {
        leftPressed = true
        pacman.nextDirection = DIRECTIONS.LEFT
        if (!gameStarted || !gameActive) {
            startGame()
        }
    })

    leftButton.addEventListener("mouseup", () => {
        leftPressed = false
    })

    rightButton.addEventListener("mousedown", () => {
        rightPressed = true
        pacman.nextDirection = DIRECTIONS.RIGHT
        if (!gameStarted || !gameActive) {
            startGame()
        }
    })

    rightButton.addEventListener("mouseup", () => {
        rightPressed = false
    })

    canvas.addEventListener("click", () => {
        if (!gameStarted || !gameActive) {
            startGame()
        }
    })

    restartButton.addEventListener("click", initGame)

    window.addEventListener("resize", () => {
        if (!gameActive) {
            draw()
        }
    })

    initGame()
