document.addEventListener("DOMContentLoaded", () => {
    const navSlide = () => {
      const burger = document.querySelector(".burger")
      const nav = document.querySelector(".nav-links")
      const navLinks = document.querySelectorAll(".nav-links li")
  
      burger.addEventListener("click", () => {
        // Toggle Nav
        nav.classList.toggle("nav-active")
  
        // Animate Links
        navLinks.forEach((link, index) => {
          if (link.style.animation) {
            link.style.animation = ""
          } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`
          }
        })
  
        // Burger Animation
        burger.classList.toggle("toggle")
      })
    }
  
    navSlide()
  
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        })
      })
    })
  
    // Form submission (you can add your own logic here)
    const form = document.querySelector(".contact-form")
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault()
        // Add your form submission logic here
        alert("Form submitted! (This is a placeholder action)")
      })
    }
  })
  
  