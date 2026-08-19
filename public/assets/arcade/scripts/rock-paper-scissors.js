document.addEventListener("DOMContentLoaded", () => {
  const choices = ["rock", "paper", "scissors"]
  const icons = { rock: "✊", paper: "✋", scissors: "✌️" }

  const playerChoiceDiv = document.getElementById("player-choice")
  const computerChoiceDiv = document.getElementById("computer-choice")
  const resultDiv = document.getElementById("result")
  const playerScoreDisplay = document.getElementById("player-score")
  const computerScoreDisplay = document.getElementById("computer-score")
  const choiceButtons = document.querySelectorAll(".choice")
  const resetButton = document.getElementById("reset-button")

  let playerScore = 0
  let computerScore = 0
  let gameActive = true

  loadScores()

  choiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!gameActive) return

      const playerChoice = button.id
      playRound(playerChoice)
    })
  })

  resetButton.addEventListener("click", resetGame)

  function playRound(playerChoice) {
    setGameActive(false)

    playerChoiceDiv.classList.remove("winner")
    computerChoiceDiv.classList.remove("winner")

    playerChoiceDiv.innerHTML = icons[playerChoice]
    computerChoiceDiv.innerHTML = "🤔"
    resultDiv.textContent = "Thinking..."

    setTimeout(() => {
      const computerChoice = choices[Math.floor(Math.random() * choices.length)]
      computerChoiceDiv.innerHTML = icons[computerChoice]

      const result = determineWinner(playerChoice, computerChoice)

      if (result === "win") {
        playerScore++
        resultDiv.textContent = "You win!"
        playerChoiceDiv.classList.add("winner")
      } else if (result === "lose") {
        computerScore++
        resultDiv.textContent = "Computer wins!"
        computerChoiceDiv.classList.add("winner")
      } else {
        resultDiv.textContent = "It's a draw!"
      }

      playerScoreDisplay.textContent = playerScore
      computerScoreDisplay.textContent = computerScore

      saveScores()

      setTimeout(() => setGameActive(true), 500)
    }, 600)
  }

  function determineWinner(player, computer) {
    if (player === computer) {
      return "draw"
    }

    if (
      (player === "rock" && computer === "scissors") ||
      (player === "scissors" && computer === "paper") ||
      (player === "paper" && computer === "rock")
    ) {
      return "win"
    }

    return "lose"
  }

  function setGameActive(active) {
    gameActive = active
    choiceButtons.forEach((button) => {
      button.disabled = !active
      button.style.opacity = active ? "1" : "0.7"
    })
  }

  function saveScores() {
    localStorage.setItem(
      "rpsScores",
      JSON.stringify({
        player: playerScore,
        computer: computerScore,
      }),
    )
  }

  function loadScores() {
    const savedScores = localStorage.getItem("rpsScores")
    if (savedScores) {
      const scores = JSON.parse(savedScores)
      playerScore = scores.player || 0
      computerScore = scores.computer || 0
      playerScoreDisplay.textContent = playerScore
      computerScoreDisplay.textContent = computerScore
    }
  }

  function resetGame() {
    playerScore = 0
    computerScore = 0

    playerScoreDisplay.textContent = "0"
    computerScoreDisplay.textContent = "0"

    playerChoiceDiv.innerHTML = "❓"
    computerChoiceDiv.innerHTML = "❓"

    playerChoiceDiv.classList.remove("winner")
    computerChoiceDiv.classList.remove("winner")

    resultDiv.textContent = "Scores have been reset!"

    localStorage.removeItem("rpsScores")

    resetButton.classList.add("active")
    setTimeout(() => {
      resetButton.classList.remove("active")
    }, 300)
  }
})

