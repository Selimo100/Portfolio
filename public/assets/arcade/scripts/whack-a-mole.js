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
  
      score = 0
      timeLeft = 30
      gameRunning = true
  
      scoreDisplay.textContent = score
      timeLeftDisplay.textContent = timeLeft
      startButton.textContent = "Game In Progress"
      startButton.disabled = true
  
      const countdown = setInterval(() => {
        timeLeft--
        timeLeftDisplay.textContent = timeLeft
  
        if (timeLeft <= 0) {
          clearInterval(countdown)
          endGame()
        }
      }, 1000)
  
      spawnMole()
    }
  
    function endGame() {
      gameRunning = false
      startButton.textContent = "Start Game"
      startButton.disabled = false
  
      if (score > highScore) {
        highScore = score
        highScoreDisplay.textContent = highScore
        localStorage.setItem("whackAMoleHighScore", highScore)
        alert(`New High Score: ${highScore}!`)
      }
  
      moles.forEach((mole) => {
        mole.classList.remove("up")
        mole.classList.remove("bonked")
      })
    }
  
    function spawnMole() {
      if (!gameRunning) return
  
      const settings = difficultySettings[difficulty]
  
      const moleIndex = Math.floor(Math.random() * moles.length)
      const mole = moles[moleIndex]
      if (mole.classList.contains("up")) {
        spawnMole()
        return
      }
  
      mole.classList.add("up")
  
      setTimeout(() => {
        mole.classList.remove("up")
        mole.classList.remove("bonked")
  
        if (gameRunning) {
          const delay = Math.random() * (settings.maxDelay - settings.minDelay) + settings.minDelay
          setTimeout(spawnMole, delay)
        }
      }, settings.upTime)
    }
  
    function whackMole(e) {
      if (!gameRunning) return
  
      const mole = e.currentTarget
  
      if (mole.classList.contains("up") && !mole.classList.contains("bonked")) {
        score++
        scoreDisplay.textContent = score
        mole.classList.add("bonked")
  
        playWhackSound()
      }
    }
  
    function playWhackSound() {
      const audio = new Audio("data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU9vT18A")
      audio.volume = 0.3
      audio.play().catch(() => {
      })
    }
  
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
  
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space" && !gameRunning) {
        startGame()
      }
    })
  })
  
  