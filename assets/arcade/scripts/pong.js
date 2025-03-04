const canvas = document.getElementById("pongCanvas")
const ctx = canvas.getContext("2d")

const paddleHeight = 80
const paddleWidth = 10
const ballRadius = 8
let playerScore = 0
let aiScore = 0

let playerY = (canvas.height - paddleHeight) / 2
let aiY = (canvas.height - paddleHeight) / 2
let ballX = canvas.width / 2
let ballY = canvas.height / 2
let ballSpeedX = 5
let ballSpeedY = 5
let gameRunning = true

const playerScoreDisplay = document.getElementById("player-score")
const aiScoreDisplay = document.getElementById("ai-score")

const keys = {
  w: false,
  s: false,
}

document.addEventListener("keydown", (event) => {
  if (event.key === "w" || event.key === "W") keys.w = true
  if (event.key === "s" || event.key === "S") keys.s = true
})

document.addEventListener("keyup", (event) => {
  if (event.key === "w" || event.key === "W") keys.w = false
  if (event.key === "s" || event.key === "S") keys.s = false
})

function updatePlayerPosition() {
  const moveSpeed = 8

  if (keys.w && playerY > 0) {
    playerY -= moveSpeed
  }

  if (keys.s && playerY < canvas.height - paddleHeight) {
    playerY += moveSpeed
  }
}

function updateAI() {
  const aiSpeed = 4 
  const aiCenter = aiY + paddleHeight / 2
  const ballTarget = ballY

  if (Math.abs(aiCenter - ballTarget) > paddleHeight / 4) {
    if (aiCenter < ballTarget) {
      aiY += aiSpeed
    } else {
      aiY -= aiSpeed
    }
  }

  if (aiY < 0) aiY = 0
  if (aiY > canvas.height - paddleHeight) aiY = canvas.height - paddleHeight
}

function updateBall() {
  ballX += ballSpeedX
  ballY += ballSpeedY

  if (ballY <= ballRadius || ballY >= canvas.height - ballRadius) {
    ballSpeedY = -ballSpeedY
    playSound("wall")
  }

  if (ballX - ballRadius <= paddleWidth && ballY >= playerY && ballY <= playerY + paddleHeight) {
    const hitPosition = (ballY - (playerY + paddleHeight / 2)) / (paddleHeight / 2)
    ballSpeedX = Math.abs(ballSpeedX)
    ballSpeedY = hitPosition * 7 

    ballSpeedX += 0.2
    playSound("paddle")
  }

  if (ballX + ballRadius >= canvas.width - paddleWidth && ballY >= aiY && ballY <= aiY + paddleHeight) {
    const hitPosition = (ballY - (aiY + paddleHeight / 2)) / (paddleHeight / 2)
    ballSpeedX = -Math.abs(ballSpeedX)
    ballSpeedY = hitPosition * 7 

    ballSpeedX -= 0.2
    playSound("paddle")
  }

  if (ballX < 0) {
    aiScore++
    aiScoreDisplay.textContent = aiScore
    resetBall("ai")
    playSound("score")
  } else if (ballX > canvas.width) {
    playerScore++
    playerScoreDisplay.textContent = playerScore
    resetBall("player")
    playSound("score")
  }
}

function resetBall(scorer) {
  ballX = canvas.width / 2
  ballY = canvas.height / 2

  ballSpeedX = scorer === "player" ? -5 : 5
  ballSpeedY = Math.random() * 6 - 3

  gameRunning = false
  setTimeout(() => {
    gameRunning = true
  }, 1000)
}

function playSound(type) {
}

function draw() {
  ctx.fillStyle = document.body.classList.contains("light") ? "#f8fafc" : "#0e1726"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.setLineDash([10, 15])
  ctx.beginPath()
  ctx.moveTo(canvas.width / 2, 0)
  ctx.lineTo(canvas.width / 2, canvas.height)
  ctx.strokeStyle = document.body.classList.contains("light") ? "rgba(14, 165, 233, 0.3)" : "rgba(0, 255, 204, 0.3)"
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.setLineDash([])

  const paddleColor = document.body.classList.contains("light") ? "#0ea5e9" : "#00ffcc"
  ctx.fillStyle = paddleColor

  ctx.fillRect(0, playerY, paddleWidth, paddleHeight)

  ctx.fillRect(canvas.width - paddleWidth, aiY, paddleWidth, paddleHeight)

  ctx.beginPath()
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2)
  ctx.fill()
  ctx.closePath()
}

function gameLoop() {
  if (gameRunning) {
    updatePlayerPosition()
    updateAI()
    updateBall()
  }

  draw()
  requestAnimationFrame(gameLoop)
}

gameLoop()

