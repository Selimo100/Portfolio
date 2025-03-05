document.addEventListener("DOMContentLoaded", () => {
    const scoreDisplay = document.getElementById("score")
    const timeLeftDisplay = document.getElementById("time-left")
    const highScoreDisplay = document.getElementById("high-score")
    const startButton = document.getElementById("start-button")
    const difficultyBtns = document.querySelectorAll(".difficulty-btn")
    const moles = document.querySelectorAll(".mole")
  
    let score = 0
    let timeLeft = 30
    let gameRunning = false
    let difficulty = "easy"
    let highScore = localStorage.getItem("whackAMoleHighScore") || 0
  
    // Update high score display
    highScoreDisplay.textContent = highScore
  
    const difficultySettings = {
      easy: {
        minDelay: 1000,
        maxDelay: 2000,
        upTime: 1500,
      },
      medium: {
        minDelay: 750,
        maxDelay: 1500,
        upTime: 1200,
      },
      hard: {
        minDelay: 500,
        maxDelay: 1200,
        upTime: 1000,
      },
    }
  
    function startGame() {
      if (gameRunning) return
  
      // Reset game state
      score = 0
      timeLeft = 30
      gameRunning = true
  
      // Update displays
      scoreDisplay.textContent = score
      timeLeftDisplay.textContent = timeLeft
      startButton.textContent = "Game In Progress"
      startButton.disabled = true
  
      // Start the countdown
      const countdown = setInterval(() => {
        timeLeft--
        timeLeftDisplay.textContent = timeLeft
  
        if (timeLeft <= 0) {
          clearInterval(countdown)
          endGame()
        }
      }, 1000)
  
      // Start spawning moles
      spawnMole()
    }
  
    function endGame() {
      gameRunning = false
      startButton.textContent = "Start Game"
      startButton.disabled = false
  
      // Update high score if needed
      if (score > highScore) {
        highScore = score
        highScoreDisplay.textContent = highScore
        localStorage.setItem("whackAMoleHighScore", highScore)
        alert(`New High Score: ${highScore}!`)
      }
  
      // Hide all moles
      moles.forEach((mole) => {
        mole.classList.remove("up")
        mole.classList.remove("bonked")
      })
    }
  
    function spawnMole() {
      if (!gameRunning) return
  
      const settings = difficultySettings[difficulty]
  
      // Get random mole
      const moleIndex = Math.floor(Math.random() * moles.length)
      const mole = moles[moleIndex]
  
      // Make sure mole isn't already up
      if (mole.classList.contains("up")) {
        spawnMole()
        return
      }
  
      // Show mole
      mole.classList.add("up")
  
      // Hide mole after a delay
      setTimeout(() => {
        mole.classList.remove("up")
        mole.classList.remove("bonked")
  
        if (gameRunning) {
          // Random delay before next mole
          const delay = Math.random() * (settings.maxDelay - settings.minDelay) + settings.minDelay
          setTimeout(spawnMole, delay)
        }
      }, settings.upTime)
    }
  
    function whackMole(e) {
      if (!gameRunning) return
  
      const mole = e.currentTarget
  
      // Check if mole is up and not already bonked
      if (mole.classList.contains("up") && !mole.classList.contains("bonked")) {
        score++
        scoreDisplay.textContent = score
        mole.classList.add("bonked")
  
        // Play whack sound
        playWhackSound()
      }
    }
  
    function playWhackSound() {
      // Create and play a simple "bonk" sound
      const audio = new Audio("data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU9vT18A")
      audio.volume = 0.3
      audio.play().catch(() => {
        // Ignore errors - some browsers block autoplay
      })
    }
  
    // Event Listeners
    startButton.addEventListener("click", startGame)
  
    moles.forEach((mole) => {
      mole.addEventListener("click", whackMole)
    })
  
    difficultyBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        difficultyBtns.forEach((b) => b.classList.remove("active"))
        btn.classList.add("active")
        difficulty = btn.dataset.difficulty
      })
    })
  
    // Keyboard controls for testing
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space" && !gameRunning) {
        startGame()
      }
    })
  })
  
  