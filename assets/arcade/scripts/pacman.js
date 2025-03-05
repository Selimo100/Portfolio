document.addEventListener("DOMContentLoaded", () => {
    // Theme toggle functionality
    const themeToggle = document.getElementById("theme-toggle")
    const themeIcon = document.getElementById("theme-icon")

    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "light") {
        document.body.classList.add("light")
        themeIcon.textContent = "☀️"
    }

    // Theme toggle event listener
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light")

        if (document.body.classList.contains("light")) {
            themeIcon.textContent = "☀️"
            localStorage.setItem("theme", "light")
        } else {
            themeIcon.textContent = "🌙"
            localStorage.setItem("theme", "dark")
        }
    })

    // Game elements
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

    // Game constants
    const GRID_SIZE = 20 // Size of each grid cell
    const GRID_WIDTH = 21 // Number of cells horizontally
    const GRID_HEIGHT = 21 // Number of cells vertically

    // Adjust canvas size to fit the grid perfectly
    canvas.width = GRID_SIZE * GRID_WIDTH
    canvas.height = GRID_SIZE * GRID_HEIGHT

    const PACMAN_RADIUS = GRID_SIZE / 2 - 1
    const GHOST_RADIUS = GRID_SIZE / 2 - 1
    const DOT_RADIUS = GRID_SIZE / 6
    const POWER_DOT_RADIUS = GRID_SIZE / 3
    const GHOST_SPEED = 2
    const PACMAN_SPEED = 3

    // Game variables
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

    // Directions
    const DIRECTIONS = {
        UP: { x: 0, y: -1 },
        DOWN: { x: 0, y: 1 },
        LEFT: { x: -1, y: 0 },
        RIGHT: { x: 1, y: 0 },
        NONE: { x: 0, y: 0 },
    }

    // Pacman object
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
        gridAlign: true, // Flag to ensure grid alignment
        blocked: false, // Flag to indicate if movement is blocked
    }

    // Ghost objects
    const ghostColors = [
        { fill: "#FF0000", stroke: "#880000" }, // Red (Blinky)
        { fill: "#FFB8FF", stroke: "#FF00FF" }, // Pink (Pinky)
        { fill: "#00FFFF", stroke: "#00BBBB" }, // Cyan (Inky)
        { fill: "#FFB852", stroke: "#FF8800" }, // Orange (Clyde)
    ]

    let ghosts = []

    // Simplified maze layout for better visibility and gameplay
    // 0 = empty space, 1 = wall, 2 = dot, 3 = power dot, 4 = ghost house
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
        [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1], // Modified row 17 to have a path at column 10
        [1, 3, 2, 2, 1, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 1, 2, 2, 3, 1],
        [1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1],
        [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]

    let maze = []

    // Initialize the game
    function initGame() {
        score = 0
        lives = 3
        level = 1

        // Reset pacman
        pacman = {
            x: GRID_SIZE * 10 + GRID_SIZE / 2,
            y: GRID_SIZE * 17 + GRID_SIZE / 2, // Changed from 15 to 17
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

        // Initialize maze
        initMaze()

        // Initialize ghosts
        initGhosts()

        // Update displays
        scoreDisplay.textContent = score
        livesDisplay.textContent = lives
        levelDisplay.textContent = level

        // Show start screen
        gameStartScreen.classList.remove("hidden")
        gameOverScreen.classList.add("hidden")
        levelCompleteScreen.classList.add("hidden")

        gameActive = false
        gameStarted = false
        ghostFrightened = false
        ghostFrightenedTimer = 0

        // Draw initial state
        draw()
    }

    function initMaze() {
        maze = JSON.parse(JSON.stringify(mazeTemplate))
        dotsRemaining = 0

        // Count dots
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

        // Create ghosts with different starting positions and behaviors
        const ghostStartPositions = [
            { x: 10 * GRID_SIZE + GRID_SIZE / 2, y: 11 * GRID_SIZE + GRID_SIZE / 2 }, // Blinky (center)
            { x: 9 * GRID_SIZE + GRID_SIZE / 2, y: 11 * GRID_SIZE + GRID_SIZE / 2 }, // Pinky (left)
            { x: 11 * GRID_SIZE + GRID_SIZE / 2, y: 11 * GRID_SIZE + GRID_SIZE / 2 }, // Inky (right)
            { x: 10 * GRID_SIZE + GRID_SIZE / 2, y: 10 * GRID_SIZE + GRID_SIZE / 2 }, // Clyde (top)
        ]

        for (let i = 0; i < 4; i++) {
            ghosts.push({
                x: ghostStartPositions[i].x,
                y: ghostStartPositions[i].y,
                radius: GHOST_RADIUS,
                speed: GHOST_SPEED * (0.6 + level * 0.05), // Slower base speed
                direction: DIRECTIONS.LEFT,
                color: ghostColors[i],
                frightened: false,
                startPosition: { ...ghostStartPositions[i] },
                targetTile: { x: 0, y: 0 },
                mode: "scatter", // scatter, chase, frightened
                releaseTime: 0, // Set to 0 for immediate path following
                gridAlign: true,
                blocked: false, // Flag to indicate if movement is blocked
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

        // Calculate delta time for smooth animation
        const deltaTime = timestamp - lastTime
        lastTime = timestamp

        update(deltaTime / 16) // Normalize to ~60fps
        draw()

        animationFrameId = requestAnimationFrame(gameLoop)
    }

    function update(deltaTime) {
        // Update pacman mouth animation
        pacman.mouthOpen += pacman.mouthDir * deltaTime * 0.1
        if (pacman.mouthOpen > 0.5 || pacman.mouthOpen < 0.05) {
            pacman.mouthDir *= -1
        }

        // Get current grid position
        const gridX = Math.floor(pacman.x / GRID_SIZE)
        const gridY = Math.floor(pacman.y / GRID_SIZE)

        // Check if pacman is aligned with the grid
        const isAlignedX = Math.abs((pacman.x - GRID_SIZE / 2) % GRID_SIZE) < 1
        const isAlignedY = Math.abs((pacman.y - GRID_SIZE / 2) % GRID_SIZE) < 1

        // If aligned with grid, we can potentially change direction
        if (isAlignedX && isAlignedY) {
            pacman.gridAlign = true
            pacman.blocked = false // Reset blocked flag when aligned with grid

            // Center pacman on the grid cell
            pacman.x = gridX * GRID_SIZE + GRID_SIZE / 2
            pacman.y = gridY * GRID_SIZE + GRID_SIZE / 2

            // Try to change direction if a new one is queued
            if (pacman.nextDirection !== DIRECTIONS.NONE) {
                const nextX = gridX + pacman.nextDirection.x
                const nextY = gridY + pacman.nextDirection.y

                if (nextX >= 0 && nextX < GRID_WIDTH && nextY >= 0 && nextY < GRID_HEIGHT && maze[nextY][nextX] !== 1) {
                    pacman.direction = pacman.nextDirection
                    pacman.nextDirection = DIRECTIONS.NONE

                    // Update angle based on direction
                    if (pacman.direction === DIRECTIONS.RIGHT) pacman.angle = 0
                    else if (pacman.direction === DIRECTIONS.DOWN) pacman.angle = Math.PI / 2
                    else if (pacman.direction === DIRECTIONS.LEFT) pacman.angle = Math.PI
                    else if (pacman.direction === DIRECTIONS.UP) pacman.angle = (Math.PI * 3) / 2
                }
            }
        }

        // Move pacman if not blocked
        if (pacman.direction !== DIRECTIONS.NONE && !pacman.blocked) {
            const nextX = pacman.x + pacman.direction.x * pacman.speed * deltaTime
            const nextY = pacman.y + pacman.direction.y * pacman.speed * deltaTime

            const nextGridX = Math.floor(nextX / GRID_SIZE)
            const nextGridY = Math.floor(nextY / GRID_SIZE)

            // Check if next position is valid
            if (nextGridX >= 0 && nextGridX < GRID_WIDTH && nextGridY >= 0 && nextGridY < GRID_HEIGHT) {
                // Check if we're about to hit a wall
                if (maze[nextGridY][nextGridX] === 1) {
                    // If we're about to hit a wall, stop movement completely
                    if (pacman.direction === DIRECTIONS.RIGHT) {
                        pacman.x = nextGridX * GRID_SIZE - pacman.radius - 1
                    } else if (pacman.direction === DIRECTIONS.LEFT) {
                        pacman.x = (nextGridX + 1) * GRID_SIZE + pacman.radius + 1
                    } else if (pacman.direction === DIRECTIONS.DOWN) {
                        pacman.y = nextGridY * GRID_SIZE - pacman.radius - 1
                    } else if (pacman.direction === DIRECTIONS.UP) {
                        pacman.y = (nextGridY + 1) * GRID_SIZE + pacman.radius + 1
                    }

                    // Set blocked flag to prevent further movement in this direction
                    pacman.blocked = true
                } else {
                    // Move pacman
                    pacman.x = nextX
                    pacman.y = nextY
                }
            } else {
                // Handle tunnel wrapping
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

            // Check for dot collection
            const centerGridX = Math.floor(pacman.x / GRID_SIZE)
            const centerGridY = Math.floor(pacman.y / GRID_SIZE)

            if (centerGridX >= 0 && centerGridX < GRID_WIDTH && centerGridY >= 0 && centerGridY < GRID_HEIGHT) {
                if (maze[centerGridY][centerGridX] === 2) {
                    // Regular dot
                    maze[centerGridY][centerGridX] = 0
                    score += 10
                    dotsRemaining--
                    scoreDisplay.textContent = score
                } else if (maze[centerGridY][centerGridX] === 3) {
                    // Power dot
                    maze[centerGridY][centerGridX] = 0
                    score += 50
                    dotsRemaining--
                    scoreDisplay.textContent = score

                    // Activate frightened mode
                    ghostFrightened = true
                    ghostFrightenedTimer = 8000 - level * 1000 // Less time in higher levels
                    if (ghostFrightenedTimer < 2000) ghostFrightenedTimer = 2000 // Minimum 2 seconds

                    ghosts.forEach((ghost) => {
                        ghost.frightened = true
                        // Reverse direction when frightened
                        if (ghost.direction === DIRECTIONS.UP) ghost.direction = DIRECTIONS.DOWN
                        else if (ghost.direction === DIRECTIONS.DOWN) ghost.direction = DIRECTIONS.UP
                        else if (ghost.direction === DIRECTIONS.LEFT) ghost.direction = DIRECTIONS.RIGHT
                        else if (ghost.direction === DIRECTIONS.RIGHT) ghost.direction = DIRECTIONS.LEFT
                    })
                }
            }
        }

        // Update ghost frightened timer
        if (ghostFrightened) {
            ghostFrightenedTimer -= 16 * deltaTime // Approximately 16ms per frame at 60fps
            if (ghostFrightenedTimer <= 0) {
                ghostFrightened = false
                ghosts.forEach((ghost) => {
                    ghost.frightened = false
                })
            }
        }

        // Update ghosts
        ghosts.forEach((ghost) => {
            // Skip if ghost is not released yet
            if (ghost.releaseTime > 0) {
                ghost.releaseTime -= 16 * deltaTime
                return
            }

            // Move ghost
            const speed = ghost.frightened ? ghost.speed * 0.5 : ghost.speed

            // Get current grid position
            const ghostGridX = Math.floor(ghost.x / GRID_SIZE)
            const ghostGridY = Math.floor(ghost.y / GRID_SIZE)

            // Check if ghost is aligned with the grid
            const isGhostAlignedX = Math.abs((ghost.x - GRID_SIZE / 2) % GRID_SIZE) < speed
            const isGhostAlignedY = Math.abs((ghost.y - GRID_SIZE / 2) % GRID_SIZE) < speed

            if (isGhostAlignedX && isGhostAlignedY) {
                // Center the ghost at the grid cell for precise movement
                ghost.x = ghostGridX * GRID_SIZE + GRID_SIZE / 2
                ghost.y = ghostGridY * GRID_SIZE + GRID_SIZE / 2
                ghost.gridAlign = true
                ghost.blocked = false // Reset blocked flag when aligned with grid

                // Choose a new direction
                // Get possible directions (excluding walls and the opposite of current direction)
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

                // If no valid directions (shouldn't happen), keep current direction
                if (possibleDirections.length === 0) {
                    // Try all directions except the opposite
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

                // Choose direction based on mode
                if (ghost.frightened) {
                    // Random direction when frightened
                    const randomIndex = Math.floor(Math.random() * possibleDirections.length)
                    ghost.direction = possibleDirections[randomIndex] || ghost.direction
                } else {
                    // Target-based direction when not frightened
                    let targetX, targetY

                    // Different targeting for each ghost - less aggressive
                    if (ghost.color.fill === "#FF0000") {
                        //Blinky
                        // Blinky - targets a bit ahead of Pacman
                        targetX = Math.floor(pacman.x / GRID_SIZE) + pacman.direction.x * 2
                        targetY = Math.floor(pacman.y / GRID_SIZE) + pacman.direction.y * 2
                    } else if (ghost.color.fill === "#FFB8FF") {
                        //Pinky
                        // Pinky - targets 2 tiles ahead of Pacman (less than before)
                        targetX = Math.floor(pacman.x / GRID_SIZE) + pacman.direction.x * 2
                        targetY = Math.floor(pacman.y / GRID_SIZE) + pacman.direction.y * 2
                    } else if (ghost.color.fill === "#00FFFF") {
                        //Inky
                        // Inky - targets based on Blinky and Pacman but less precisely
                        const pacmanX = Math.floor(pacman.x / GRID_SIZE)
                        const pacmanY = Math.floor(pacman.y / GRID_SIZE)

                        // Random offset to make less precise
                        const offsetX = Math.floor(Math.random() * 5) - 2
                        const offsetY = Math.floor(Math.random() * 5) - 2

                        targetX = pacmanX + offsetX
                        targetY = pacmanY + offsetY
                    } else {
                        //Clyde
                        // Clyde - targets Pacman when far, scatter when close
                        const pacmanX = Math.floor(pacman.x / GRID_SIZE)
                        const pacmanY = Math.floor(pacman.y / GRID_SIZE)
                        const distance = Math.sqrt(Math.pow(ghostGridX - pacmanX, 2) + Math.pow(ghostGridY - pacmanY, 2))

                        if (distance > 5) {
                            // Increased distance threshold
                            targetX = pacmanX
                            targetY = pacmanY
                        } else {
                            // Random corner
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

                    // Ensure target is within bounds
                    targetX = Math.max(0, Math.min(GRID_WIDTH - 1, targetX))
                    targetY = Math.max(0, Math.min(GRID_HEIGHT - 1, targetY))

                    // Choose the direction that gets closest to the target
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

                    // Lower randomness to make ghosts more predictable in their path following
                    if (Math.random() < 0.05) {
                        // Reduced from 0.1 to 0.05
                        // 5% chance to choose random direction
                        const randomIndex = Math.floor(Math.random() * possibleDirections.length)
                        ghost.direction = possibleDirections[randomIndex] || bestDirection
                    } else {
                        ghost.direction = bestDirection
                    }
                }
            }

            // Move ghost if not blocked
            if (!ghost.blocked) {
                const nextX = ghost.x + ghost.direction.x * speed * deltaTime
                const nextY = ghost.y + ghost.direction.y * speed * deltaTime

                // Check if next position would hit a wall
                const nextGridX = Math.floor(nextX / GRID_SIZE)
                const nextGridY = Math.floor(nextY / GRID_SIZE)

                if (nextGridX >= 0 && nextGridX < GRID_WIDTH && nextGridY >= 0 && nextGridY < GRID_HEIGHT) {
                    if (maze[nextGridY][nextGridX] === 1) {
                        // If about to hit a wall, stop and wait for next grid alignment
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
                        // Move ghost
                        ghost.x = nextX
                        ghost.y = nextY
                    }
                } else {
                    // Handle tunnel wrapping
                    if (nextX < 0) ghost.x = canvas.width - GRID_SIZE / 2
                    else if (nextX > canvas.width) ghost.x = GRID_SIZE / 2
                    else if (nextY < 0) ghost.y = canvas.height - GRID_SIZE / 2
                    else if (nextY > canvas.height) ghost.y = GRID_SIZE / 2
                }
            }

            // Check for collision with pacman
            const distance = Math.sqrt(Math.pow(ghost.x - pacman.x, 2) + Math.pow(ghost.y - pacman.y, 2))

            if (distance < PACMAN_RADIUS + GHOST_RADIUS) {
                if (ghost.frightened) {
                    // Pacman eats the ghost
                    score += 200 * Math.pow(2, level - 1)
                    scoreDisplay.textContent = score

                    // Reset ghost to starting position
                    ghost.x = ghost.startPosition.x
                    ghost.y = ghost.startPosition.y
                    ghost.frightened = false
                    ghost.direction = DIRECTIONS.LEFT
                    ghost.releaseTime = 3000
                    ghost.blocked = false
                } else {
                    // Ghost catches pacman
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

        // Check if level is complete
        if (dotsRemaining === 0) {
            levelComplete()
        }
    }

    function resetPositions() {
        // Reset pacman
        pacman.x = GRID_SIZE * 10 + GRID_SIZE / 2
        pacman.y = GRID_SIZE * 17 + GRID_SIZE / 2 // Changed from 15 to 17
        pacman.direction = DIRECTIONS.NONE
        pacman.nextDirection = DIRECTIONS.NONE
        pacman.gridAlign = true
        pacman.blocked = false

        // Reset ghosts
        ghosts.forEach((ghost) => {
            ghost.x = ghost.startPosition.x
            ghost.y = ghost.startPosition.y
            ghost.direction = DIRECTIONS.LEFT
            ghost.frightened = false
            ghost.releaseTime = 0 // Changed from index * 3000 to 0 for immediate path following
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

        // Increase difficulty
        pacman.speed = PACMAN_SPEED + level * 0.1 // Less speed increase per level

        // Reset positions
        resetPositions()

        // Reset maze
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

        // Draw maze
        drawMaze()

        // Draw pacman
        drawPacman()

        // Draw ghosts
        drawGhosts()
    }

    function drawMaze() {
        for (let y = 0; y < GRID_HEIGHT; y++) {
            for (let x = 0; x < GRID_WIDTH; x++) {
                const cellType = maze[y][x]

                if (cellType === 1) {
                    // Wall
                    ctx.fillStyle = document.body.classList.contains("light") ? "#0c4a6e" : "#00997a"
                    ctx.fillRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE)
                } else if (cellType === 2) {
                    // Dot
                    ctx.beginPath()
                    ctx.arc(x * GRID_SIZE + GRID_SIZE / 2, y * GRID_SIZE + GRID_SIZE / 2, DOT_RADIUS, 0, Math.PI * 2)
                    ctx.fillStyle = document.body.classList.contains("light") ? "#0ea5e9" : "#00ffcc"
                    ctx.fill()
                    ctx.closePath()
                } else if (cellType === 3) {
                    // Power dot
                    ctx.beginPath()
                    ctx.arc(x * GRID_SIZE + GRID_SIZE / 2, y * GRID_SIZE + GRID_SIZE / 2, POWER_DOT_RADIUS, 0, Math.PI * 2)

                    // Make power dots pulse
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

        // Draw pacman with mouth
        ctx.arc(
            pacman.x,
            pacman.y,
            pacman.radius,
            pacman.angle + pacman.mouthOpen * Math.PI,
            pacman.angle + (2 - pacman.mouthOpen) * Math.PI,
        )

        // Draw line to center
        ctx.lineTo(pacman.x, pacman.y)

        ctx.fillStyle = document.body.classList.contains("light") ? "#0ea5e9" : "#FFFF00"
        ctx.fill()
        ctx.closePath()
    }

    function drawGhosts() {
        ghosts.forEach((ghost) => {
            // Ghost body
            ctx.beginPath()
            ctx.arc(ghost.x, ghost.y, ghost.radius, Math.PI, 0, false)

            // Ghost "skirt"
            const skirtY = ghost.y + ghost.radius
            ctx.lineTo(ghost.x + ghost.radius, skirtY)

            // Draw wavy bottom
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

            // Fill with appropriate color
            if (ghost.frightened) {
                // Blinking when frightened mode is about to end
                const isBlinking = ghostFrightenedTimer < 2000 && Math.floor(Date.now() / 200) % 2 === 0

                ctx.fillStyle = isBlinking ? "#FFFFFF" : "#2222FF"
            } else {
                ctx.fillStyle = ghost.color.fill
            }

            ctx.fill()

            // Draw eyes
            const eyeRadius = ghost.radius / 3
            const eyeOffsetX = ghost.radius / 3
            const eyeOffsetY = -ghost.radius / 5
            const pupilRadius = eyeRadius / 2

            // Eye whites
            ctx.fillStyle = "#FFFFFF"

            // Left eye
            ctx.beginPath()
            ctx.arc(ghost.x - eyeOffsetX, ghost.y + eyeOffsetY, eyeRadius, 0, Math.PI * 2)
            ctx.fill()
            ctx.closePath()

            // Right eye
            ctx.beginPath()
            ctx.arc(ghost.x + eyeOffsetX, ghost.y + eyeOffsetY, eyeRadius, 0, Math.PI * 2)
            ctx.fill()
            ctx.closePath()

            // Pupils
            if (!ghost.frightened) {
                ctx.fillStyle = "#000000"

                // Determine pupil position based on direction
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

                // Left pupil
                ctx.beginPath()
                ctx.arc(ghost.x - eyeOffsetX + pupilOffsetX, ghost.y + eyeOffsetY + pupilOffsetY, pupilRadius, 0, Math.PI * 2)
                ctx.fill()
                ctx.closePath()

                // Right pupil
                ctx.beginPath()
                ctx.arc(ghost.x + eyeOffsetX + pupilOffsetX, ghost.y + eyeOffsetY + pupilOffsetY, pupilRadius, 0, Math.PI * 2)
                ctx.fill()
                ctx.closePath()
            } else {
                // Draw frightened eyes (X shape)
                ctx.strokeStyle = "#FFFFFF"
                ctx.lineWidth = 2

                // Left eye X
                const leftEyeX = ghost.x - eyeOffsetX
                const leftEyeY = ghost.y + eyeOffsetY
                ctx.beginPath()
                ctx.moveTo(leftEyeX - pupilRadius, leftEyeY - pupilRadius)
                ctx.lineTo(leftEyeX + pupilRadius, leftEyeY + pupilRadius)
                ctx.moveTo(leftEyeX + pupilRadius, leftEyeY - pupilRadius)
                ctx.lineTo(leftEyeX - pupilRadius, leftEyeY + pupilRadius)
                ctx.stroke()
                ctx.closePath()

                // Right eye X
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

    // Event listeners
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

    // Mobile controls
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

    // Mouse controls for mobile buttons
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

    // Initialize the game
    initGame()
})

