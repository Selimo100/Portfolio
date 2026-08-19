document.addEventListener("DOMContentLoaded", () => {
    const wordDisplay = document.getElementById("word-display")
    const wordInput = document.getElementById("word-input")
    const scoreDisplay = document.getElementById("score")
    const timeLeftDisplay = document.getElementById("time-left")
    const wpmDisplay = document.getElementById("wpm")
    const accuracyDisplay = document.getElementById("accuracy")
    const startButton = document.getElementById("start-button")
    const difficultyBtns = document.querySelectorAll(".difficulty-btn")
    const resultsContainer = document.getElementById("results-container")
    const finalScoreDisplay = document.getElementById("final-score")
    const finalWpmDisplay = document.getElementById("final-wpm")
    const finalAccuracyDisplay = document.getElementById("final-accuracy")
  
    const easyWords = [
      "the",
      "be",
      "to",
      "of",
      "and",
      "a",
      "in",
      "that",
      "have",
      "it",
      "for",
      "not",
      "on",
      "with",
      "he",
      "as",
      "you",
      "do",
      "at",
      "this",
      "but",
      "his",
      "by",
      "from",
      "they",
      "we",
      "say",
      "her",
      "she",
      "or",
      "an",
      "will",
      "my",
      "one",
      "all",
      "would",
      "there",
      "their",
      "what",
      "so",
      "up",
      "out",
      "if",
      "about",
      "who",
      "get",
      "which",
      "go",
      "me",
      "when",
    ]
  
    const mediumWords = [
      "about",
      "better",
      "bring",
      "carry",
      "clean",
      "drink",
      "eight",
      "every",
      "fight",
      "first",
      "great",
      "house",
      "learn",
      "never",
      "other",
      "place",
      "plant",
      "point",
      "right",
      "small",
      "sound",
      "spell",
      "still",
      "study",
      "their",
      "there",
      "these",
      "thing",
      "think",
      "three",
      "water",
      "where",
      "which",
      "world",
      "would",
      "write",
    ]
  
    const hardWords = [
      "absolutely",
      "accomplish",
      "acknowledge",
      "acquisition",
      "ambassador",
      "anticipate",
      "appreciate",
      "appropriate",
      "architecture",
      "association",
      "atmosphere",
      "authenticity",
      "calculation",
      "celebration",
      "challenging",
      "collaborate",
      "comfortable",
      "communicate",
      "competition",
      "complicated",
      "composition",
      "consequence",
      "considerable",
      "continuously",
      "contribution",
      "conversation",
      "deliberately",
      "demonstrate",
      "description",
      "development",
      "disappearance",
      "disappointed",
      "distribution",
      "economically",
      "effectiveness",
      "embarrassment",
      "entertainment",
      "enthusiastic",
      "environmental",
      "establishment",
      "extraordinary",
      "fundamentally",
      "grandchildren",
      "headquarters",
      "identification",
      "implementation",
      "impossibility",
      "impressionable",
      "inappropriate",
      "independence",
      "infrastructure",
      "intelligence",
      "international",
      "interpretation",
      "investigation",
      "manufacturing",
      "mathematician",
      "mediterranean",
      "neighborhood",
      "nevertheless",
      "occasionally",
      "organization",
      "overwhelming",
      "particularly",
      "pharmaceutical",
      "philosophical",
      "pronunciation",
      "psychological",
      "qualification",
      "recommendation",
      "rehabilitation",
      "relationship",
      "representative",
      "responsibility",
      "revolutionary",
      "simultaneously",
      "sophisticated",
      "specifically",
      "substantially",
      "technological",
      "temperature",
      "transformation",
      "transportation",
      "uncomfortable",
      "understanding",
      "unfortunately",
      "vulnerability",
    ]
  
    let currentWords = easyWords
    let score = 0
    let timeLeft = 60
    let gameInterval
    let gameActive = false
    let wordsTyped = 0
    let correctChars = 0
    let totalChars = 0
    let startTime
    let difficulty = "easy"
  
    function getRandomWord() {
      return currentWords[Math.floor(Math.random() * currentWords.length)]
    }
  
    function updateWordDisplay() {
      const word = getRandomWord()
      wordDisplay.innerHTML = `<div class="word-prompt">${word}</div>`
      return word
    }
  
    function calculateWPM() {
      if (wordsTyped === 0) return 0
  
      const minutesElapsed = (Date.now() - startTime) / 60000
      return Math.round(wordsTyped / minutesElapsed)
    }
  
    function calculateAccuracy() {
      if (totalChars === 0) return 100
      return Math.round((correctChars / totalChars) * 100)
    }
  
    function startGame() {
      score = 0
      wordsTyped = 0
      correctChars = 0
      totalChars = 0
      scoreDisplay.textContent = score
      wpmDisplay.textContent = "0"
      accuracyDisplay.textContent = "100%"
  
      switch (difficulty) {
        case "easy":
          timeLeft = 60
          currentWords = easyWords
          break
        case "medium":
          timeLeft = 60
          currentWords = mediumWords
          break
        case "hard":
          timeLeft = 60
          currentWords = hardWords
          break
      }
  
      timeLeftDisplay.textContent = timeLeft
      gameActive = true
      startButton.disabled = true
      wordInput.disabled = false
      wordInput.value = ""
      wordInput.focus()
      resultsContainer.style.display = "none"
  
      const currentWord = updateWordDisplay()
      startTime = Date.now()
  
      gameInterval = setInterval(() => {
        timeLeft--
        timeLeftDisplay.textContent = timeLeft
  
        const wpm = calculateWPM()
        wpmDisplay.textContent = wpm
  
        if (timeLeft <= 0) {
          endGame()
        }
      }, 1000)
    }
  
    function endGame() {
      clearInterval(gameInterval)
      gameActive = false
      startButton.disabled = false
      wordInput.disabled = true
  
      const finalWpm = calculateWPM()
      const finalAccuracy = calculateAccuracy()
  
      finalScoreDisplay.textContent = score
      finalWpmDisplay.textContent = finalWpm
      finalAccuracyDisplay.textContent = `${finalAccuracy}%`
  
      resultsContainer.style.display = "block"
      wordDisplay.innerHTML = '<div class="word-prompt">Game Over!</div>'
    }
  
    wordInput.addEventListener("input", () => {
      if (!gameActive) return
  
      const currentWord = wordDisplay.querySelector(".word-prompt").textContent
      const typedWord = wordInput.value
  
      if (typedWord === currentWord) {
        score += currentWord.length
        wordsTyped++
        correctChars += currentWord.length
        totalChars += currentWord.length
  
        const accuracy = calculateAccuracy()
        accuracyDisplay.textContent = `${accuracy}%`
  
        scoreDisplay.textContent = score
        wordInput.value = ""
        updateWordDisplay()
      }
    })
  
    startButton.addEventListener("click", startGame)
  
    difficultyBtns.forEach((button) => {
      button.addEventListener("click", () => {
        difficultyBtns.forEach((btn) => btn.classList.remove("active"))
        button.classList.add("active")
        difficulty = button.dataset.difficulty
      })
    })
  })
  
  