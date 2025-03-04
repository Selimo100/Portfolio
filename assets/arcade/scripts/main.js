document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle")
    const themeIcon = document.getElementById("theme-icon")
  
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "light") {
      document.body.classList.add("light")
      themeIcon.textContent = "☀️"
    }
  
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light")
  
      if (document.body.classList.contains("light")) {
        localStorage.setItem("theme", "light")
        themeIcon.textContent = "☀️"
      } else {
        localStorage.setItem("theme", "dark")
        themeIcon.textContent = "🌙"
      }
    })
  })
  
  