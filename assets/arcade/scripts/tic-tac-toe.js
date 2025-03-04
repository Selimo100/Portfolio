document.addEventListener("DOMContentLoaded", () => {
    let currentPlayer = "X"
    let gameActive = true
  
    const gameStatus = document.getElementById("game-status")
    const currentPlayerDisplay = document.getElementById("current-player")
    const resetButton = document.getElementById("reset-button")
    const gameBoard = document.getElementById("game-board")
  
    gameBoard.addEventListener("click", (event) => {
      const clickedField = event.target
  
      if (clickedField.classList.contains("field") && !clickedField.textContent && gameActive) {
        handleFieldClick(clickedField)
      }
    })
  
    resetButton.addEventListener("click", resetGame)
  
    function handleFieldClick(field) {
      field.textContent = currentPlayer
  
      if (checkForWin(currentPlayer)) {
        gameStatus.textContent = `Player ${currentPlayer} wins!`
        highlightWinningFields()
        gameActive = false
        return
      }
  
      if (checkForDraw()) {
        gameStatus.textContent = "It's a draw!"
        gameActive = false
        return
      }
  
      currentPlayer = currentPlayer === "X" ? "O" : "X"
      currentPlayerDisplay.textContent = currentPlayer
    }
  
    function checkForWin(player) {
      const winPatterns = [
        ["11", "12", "13"],
        ["21", "22", "23"],
        ["31", "32", "33"],
        ["11", "21", "31"],
        ["12", "22", "32"],
        ["13", "23", "33"],
        ["11", "22", "33"],
        ["13", "22", "31"],
      ]
  
      return winPatterns.some((pattern) => {
        return pattern.every((id) => {
          return document.getElementById(id).textContent === player
        })
      })
    }
  
    function highlightWinningFields() {
      const winPatterns = [
        ["11", "12", "13"],
        ["21", "22", "23"],
        ["31", "32", "33"],
        ["11", "21", "31"],
        ["12", "22", "32"],
        ["13", "23", "33"],
        ["11", "22", "33"],
        ["13", "22", "31"],
      ]
  
      for (const pattern of winPatterns) {
        if (pattern.every((id) => document.getElementById(id).textContent === currentPlayer)) {
          pattern.forEach((id) => {
            document.getElementById(id).classList.add("winning")
          })
          break
        }
      }
    }
  
    function checkForDraw() {
      const fields = document.querySelectorAll(".field")
      return Array.from(fields).every((field) => field.textContent)
    }
  
    function resetGame() {
      const fields = document.querySelectorAll(".field")
      fields.forEach((field) => {
        field.textContent = ""
        field.classList.remove("winning")
      })
  
      currentPlayer = "X"
      currentPlayerDisplay.textContent = currentPlayer
      gameStatus.textContent = `Next player: `
      gameActive = true
    }
  })
  
  