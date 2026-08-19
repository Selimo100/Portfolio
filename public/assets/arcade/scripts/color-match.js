document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("game-board")
    const targetColorBox = document.getElementById("target-color")
    const scoreDisplay = document.getElementById("score")
    const timeLeftDisplay = document.getElementById("time-left")
    const highScoreDisplay = document.getElementById("high-score")
    const startButton = document.getElementById("start-button")
    const difficultyBtns = document.querySelectorAll(".difficulty-btn")
  
    let score = 0
    let timeLeft = 60
    let gameInterval
    let gameActive = false
    let targetColor = ""
    let gridSize = 5
    let numCircles = 25
    let matchingCircles = 5
    let difficulty = "easy"
    let highScore = localStorage.getItem("colorMatchHighScore") || 0
  
    highScoreDisplay.textContent = highScore
  
    function getRandomColor() {
      const letters = "0123456789ABCDEF"
      let color = "#"
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    }
  
    function getSimilarColor(baseColor, difficulty) {
      const baseParts = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(baseColor)
      if (!baseParts) return getRandomColor()
  
      const r = Number.parseInt(baseParts[1], 16)
      const g = Number.parseInt(baseParts[2], 16)
      const b = Number.parseInt(baseParts[3], 16)
  
      let variance
      switch (difficulty) {
        case "easy":
          variance = 60
          break
        case "medium":
          variance = 40
          break
        case "hard":
          variance = 20
          break
        default:
          variance = 60
      }
  
      const getVariance = () => Math.floor(Math.random() * variance) - variance / 2
  
      const newR = Math.max(0, Math.min(255, r + getVariance()))
      const newG = Math.max(0, Math.min(255, g + getVariance()))
      const newB = Math.max(0, Math.min(255, b + getVariance()))
  
      return `#${newR.toString(16).padStart(2, "0")}${newG.toString(16).padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`
    }
  
    function createGameBoard() {
      gameBoard.innerHTML = ""
      gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`
  
      targetColor = getRandomColor()
      targetColorBox.style.backgroundColor = targetColor
  
      const matchingIndices = []
      while (matchingIndices.length < matchingCircles) {
        const index = Math.floor(Math.random() * numCircles)
        if (!matchingIndices.includes(index)) {
          matchingIndices.push(index)
        }
      }
  
      for (let i = 0; i < numCircles; i++) {
        const circle = document.createElement("div")
        circle.className = "color-circle"
  
        if (matchingIndices.includes(i)) {
          circle.style.backgroundColor = targetColor
          circle.dataset.match = "true"
        } else {
          circle.style.backgroundColor = getSimilarColor(targetColor, difficulty)
          circle.dataset.match = "false"
        }
  
        circle.addEventListener("click", handleCircleClick)
        gameBoard.appendChild(circle)
      }
    }
  
    function handleCircleClick(e) {
      if (!gameActive) return
  
      const circle = e.target
      const isMatch = circle.dataset.match === "true"
  
      if (isMatch) {
        score += 10
        scoreDisplay.textContent = score
        circle.classList.add("correct")
        setTimeout(() => {
          circle.classList.remove("correct")
          createGameBoard()
        }, 300)
      } else {
        score = Math.max(0, score - 5)
        scoreDisplay.textContent = score
        circle.classList.add("wrong")
        setTimeout(() => {
          circle.classList.remove("wrong")
        }, 300)
      }
    }
  
    function startGame() {
      score = 0
      scoreDisplay.textContent = score
  
      switch (difficulty) {
        case "easy":
          timeLeft = 60
          gridSize = 5
          numCircles = 25
          matchingCircles = 5
          break
        case "medium":
          timeLeft = 45
          gridSize = 6
          numCircles = 36
          matchingCircles = 6
          break
        case "hard":
          timeLeft = 30
          gridSize = 7
          numCircles = 49
          matchingCircles = 7
          break
      }
  
      timeLeftDisplay.textContent = timeLeft
      gameActive = true
      startButton.disabled = true
  
      createGameBoard()
  
      gameInterval = setInterval(() => {
        timeLeft--
        timeLeftDisplay.textContent = timeLeft
  
        if (timeLeft <= 0) {
          endGame()
        }
      }, 1000)
    }
  
    function endGame() {
      clearInterval(gameInterval)
      gameActive = false
      startButton.disabled = false
  
      if (score > highScore) {
        highScore = score
        highScoreDisplay.textContent = highScore
        localStorage.setItem("colorMatchHighScore", highScore)
      }
  
      gameBoard.innerHTML = `
              <div style="text-align: center; padding: 20px;">
                  <h2>Game Over!</h2>
                  <p>Your score: ${score}</p>
                  <p>High score: ${highScore}</p>
              </div>
          `
    }
  
    startButton.addEventListener("click", startGame)
  
    difficultyBtns.forEach((button) => {
      button.addEventListener("click", () => {
        difficultyBtns.forEach((btn) => btn.classList.remove("active"))
        button.classList.add("active")
        difficulty = button.dataset.difficulty
      })
    })
  })
  
  