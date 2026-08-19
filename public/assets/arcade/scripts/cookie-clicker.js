document.addEventListener("DOMContentLoaded", () => {
    let score = 0
    let cookiesPerClick = 1
    let clickUpgradeCost = 10
    let autoClickerCost = 100
    let autoClickersCount = 0
  
    const scoreDisplay = document.getElementById("score")
    const perClickDisplay = document.getElementById("per-click")
    const cookie = document.getElementById("cookie")
    const clickUpgradeButton = document.getElementById("upgrade-click")
    const autoUpgradeButton = document.getElementById("upgrade-auto")
    const clickUpgradeCostDisplay = document.getElementById("upgrade-cost")
    const autoUpgradeCostDisplay = document.getElementById("auto-cost")
    const cookieBox = document.getElementById("cookie-box")
  
    loadGame()
  
    cookie.addEventListener("click", () => {
      addCookies(cookiesPerClick)
      createFloatingText(`+${cookiesPerClick}`)
  
      cookie.classList.add("clicked")
      setTimeout(() => cookie.classList.remove("clicked"), 100)
    })
  
    clickUpgradeButton.addEventListener("click", () => {
      if (score >= clickUpgradeCost) {
        score -= clickUpgradeCost
        cookiesPerClick++
        clickUpgradeCost = Math.floor(clickUpgradeCost * 1.5)
  
        updateDisplay()
        saveGame()
      }
    })
  
    autoUpgradeButton.addEventListener("click", () => {
      if (score >= autoClickerCost) {
        score -= autoClickerCost
        autoClickersCount++
        autoClickerCost = Math.floor(autoClickerCost * 1.8)
  
        updateDisplay()
        saveGame()
      }
    })
  
    setInterval(() => {
      if (autoClickersCount > 0) {
        addCookies(autoClickersCount)
        createFloatingText(`+${autoClickersCount}`, true)
      }
    }, 1000)
  
    setInterval(updateButtonStates, 100)
  
    setInterval(saveGame, 10000)
  
    function addCookies(amount) {
      score += amount
      updateDisplay()
    }
  
    function updateDisplay() {
      scoreDisplay.textContent = formatNumber(score)
      perClickDisplay.textContent = formatNumber(cookiesPerClick)
      clickUpgradeCostDisplay.textContent = formatNumber(clickUpgradeCost)
      autoUpgradeCostDisplay.textContent = formatNumber(autoClickerCost)
  
      updateButtonStates()
    }
  
    function updateButtonStates() {
      clickUpgradeButton.disabled = score < clickUpgradeCost
      autoUpgradeButton.disabled = score < autoClickerCost
    }
  
    function createFloatingText(text, isAuto = false) {
      const floatingText = document.createElement("div")
      floatingText.className = "cookie-float"
      floatingText.textContent = text
  
      if (isAuto) {
        floatingText.style.left = `${Math.random() * 80 + 10}px`
        floatingText.style.top = `${Math.random() * 80 + 10}px`
      } else {
        floatingText.style.left = "50%"
        floatingText.style.top = "50%"
        floatingText.style.transform = "translate(-50%, -50%)"
      }
  
      cookieBox.appendChild(floatingText)
  
      setTimeout(() => {
        cookieBox.removeChild(floatingText)
      }, 1500)
    }
  
    function formatNumber(num) {
      if (num < 1000) return num
      if (num < 1000000) return (num / 1000).toFixed(1) + "K"
      return (num / 1000000).toFixed(1) + "M"
    }
  
    function saveGame() {
      const gameData = {
        score,
        cookiesPerClick,
        clickUpgradeCost,
        autoClickerCost,
        autoClickersCount,
        lastSaved: Date.now(),
      }
  
      localStorage.setItem("cookieClickerSave", JSON.stringify(gameData))
    }
  
    function loadGame() {
      const savedGame = localStorage.getItem("cookieClickerSave")
  
      if (savedGame) {
        const gameData = JSON.parse(savedGame)
  
        score = gameData.score || 0
        cookiesPerClick = gameData.cookiesPerClick || 1
        clickUpgradeCost = gameData.clickUpgradeCost || 10
        autoClickerCost = gameData.autoClickerCost || 100
        autoClickersCount = gameData.autoClickersCount || 0
  
        updateDisplay()
  
        const now = Date.now()
        const lastSaved = gameData.lastSaved || now
        const secondsElapsed = Math.floor((now - lastSaved) / 1000)
  
        if (secondsElapsed > 60 && autoClickersCount > 0) {
          const offlineEarnings = autoClickersCount * secondsElapsed
          score += offlineEarnings
  
          alert(`Welcome back! Your auto clickers earned ${formatNumber(offlineEarnings)} cookies while you were away.`)
          updateDisplay()
        }
      }
    }
  })
  
  