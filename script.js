// Global variables
let mouseX = 0
let mouseY = 0

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation()
  initializeAnimations()
  initializeMouseEffects()
  initializeScrollEffects()
  initializeTypingEffect()
  initializeThemeToggle()
})

// Theme toggle functionality
function initializeThemeToggle() {
  const themeToggle = document.getElementById("themeToggle")
  const themeIcon = document.getElementById("themeIcon")

  // Check for saved theme preference or default to 'dark'
  const currentTheme = localStorage.getItem("theme") || "dark"
  document.documentElement.setAttribute("data-theme", currentTheme)

  // Update icon based on current theme
  updateThemeIcon(currentTheme)

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"

    document.documentElement.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    updateThemeIcon(newTheme)
  })
}

function updateThemeIcon(theme) {
  const themeIcon = document.getElementById("themeIcon")
  if (theme === "dark") {
    themeIcon.className = "fas fa-sun"
  } else {
    themeIcon.className = "fas fa-moon"
  }
}

// Navigation functionality
function initializeNavigation() {
  const navToggle = document.getElementById("navToggle")
  const navMenu = document.getElementById("navMenu")
  const navLinks = document.querySelectorAll(".nav-link")

  // Mobile menu toggle
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    const icon = navToggle.querySelector("i")

    if (navMenu.classList.contains("active")) {
      icon.classList.remove("fa-bars")
      icon.classList.add("fa-times")
    } else {
      icon.classList.remove("fa-times")
      icon.classList.add("fa-bars")
    }
  })

  // Close mobile menu when clicking on links
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      const icon = navToggle.querySelector("i")
      icon.classList.remove("fa-times")
      icon.classList.add("fa-bars")
    })
  })

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href").substring(1)
      scrollToSection(targetId)
    })
  })
}

// Smooth scroll to section
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    const offsetTop = element.offsetTop - 70 // Account for fixed navbar
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }
}

// Mouse effects for background blobs
function initializeMouseEffects() {
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY

    // Update background blobs
    const blob1 = document.querySelector(".bg-blob-1")
    const blob2 = document.querySelector(".bg-blob-2")

    if (blob1) {
      blob1.style.transform = `translate(${mouseX * 0.02}px, ${mouseY * 0.02}px)`
    }

    if (blob2) {
      blob2.style.transform = `translate(${mouseX * -0.02}px, ${mouseY * -0.02}px)`
    }
  })
}

// Scroll effects
function initializeScrollEffects() {
  const navbar = document.querySelector(".navbar")

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY
    const currentTheme = document.documentElement.getAttribute("data-theme")

    // Navbar background opacity
    if (scrollY > 50) {
      if (currentTheme === "dark") {
        navbar.style.background = "rgba(15, 23, 42, 0.95)"
      } else {
        navbar.style.background = "rgba(255, 255, 255, 0.95)"
      }
    } else {
      if (currentTheme === "dark") {
        navbar.style.background = "rgba(15, 23, 42, 0.8)"
      } else {
        navbar.style.background = "rgba(255, 255, 255, 0.9)"
      }
    }

    // Update active navigation link
    updateActiveNavLink()
  })
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.clientHeight
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
}

// Initialize animations
function initializeAnimations() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(`
        .skill-category-card,
        .certificate-card,
        .project-card,
        .activity-card,
        .contact-card,
        .education-card
    `)

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.8s ease, transform 0.8s ease"
    observer.observe(el)
  })
}

// Typing effect for main tagline
function initializeTypingEffect() {
  const taglineElement = document.querySelector(".main-tagline")
  const originalText = taglineElement.textContent

  taglineElement.textContent = ""

  let i = 0
  const typeWriter = () => {
    if (i < originalText.length) {
      taglineElement.textContent += originalText.charAt(i)
      i++
      setTimeout(typeWriter, 50)
    }
  }

  // Start typing effect after a delay
  setTimeout(typeWriter, 1000)
}

// Download CV function
function downloadCV() {
  // You can replace this with actual CV download logic
  alert("CV download functionality would be implemented here")
}

// Add hover effects to cards
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(
    ".certificate-card, .project-card, .activity-card, .education-card, .skill-category-card",
  )

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")

  // Add a subtle fade-in effect for the entire page
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.5s ease"

  setTimeout(() => {
    document.body.style.opacity = "1"
  }, 100)
})

// Add keyboard navigation support
document.addEventListener("keydown", (e) => {
  // Press 'h' to go to home
  if (e.key === "h" || e.key === "H") {
    scrollToSection("home")
  }
  // Press 'e' to go to education
  else if (e.key === "e" || e.key === "E") {
    scrollToSection("education")
  }
  // Press 's' to go to skills
  else if (e.key === "s" || e.key === "S") {
    scrollToSection("skills")
  }
  // Press 'c' to go to certificates
  else if (e.key === "c" || e.key === "C") {
    scrollToSection("certificates")
  }
  // Press 'p' to go to projects
  else if (e.key === "p" || e.key === "P") {
    scrollToSection("projects")
  }
  // Press 'x' to go to extracurricular
  else if (e.key === "x" || e.key === "X") {
    scrollToSection("extracurricular")
  }
  // Press 't' to toggle theme
  else if (e.key === "t" || e.key === "T") {
    document.getElementById("themeToggle").click()
  }
})

// Performance optimization
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Optimize scroll handler
const optimizedScrollHandler = debounce(() => {
  const navbar = document.querySelector(".navbar")
  const scrollY = window.scrollY
  const currentTheme = document.documentElement.getAttribute("data-theme")

  if (scrollY > 50) {
    if (currentTheme === "dark") {
      navbar.style.background = "rgba(15, 23, 42, 0.95)"
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)"
    }
  } else {
    if (currentTheme === "dark") {
      navbar.style.background = "rgba(15, 23, 42, 0.8)"
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.9)"
    }
  }

  updateActiveNavLink()
}, 10)

window.addEventListener("scroll", optimizedScrollHandler)

// Add smooth reveal animation for sections
function initializeSectionReveal() {
  const sections = document.querySelectorAll("section")

  const revealSection = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("section-revealed")
        observer.unobserve(entry.target)
      }
    })
  }

  const sectionObserver = new IntersectionObserver(revealSection, {
    threshold: 0.15,
  })

  sections.forEach((section) => {
    section.classList.add("section-hidden")
    sectionObserver.observe(section)
  })
}

// Add CSS for section reveal animation
const style = document.createElement("style")
style.textContent = `
    .section-hidden {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 1s ease, transform 1s ease;
    }
    
    .section-revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-link.active {
        color: var(--accent-blue) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`
document.head.appendChild(style)

// Initialize section reveal
document.addEventListener("DOMContentLoaded", initializeSectionReveal)

// Add click handlers for certificate actions
// document.addEventListener("DOMContentLoaded", () => {
//   const viewButtons = document.querySelectorAll(".cert-btn.primary")
//   const verifyButtons = document.querySelectorAll(".cert-btn.secondary")

//   viewButtons.forEach((button) => {
//     button.addEventListener("click", (e) => {
//       e.preventDefault()
//       // You can implement actual certificate viewing logic here
//       alert("Certificate viewing functionality would be implemented here")
//     })
//   })

//   verifyButtons.forEach((button) => {
//     button.addEventListener("click", (e) => {
//       e.preventDefault()
//       // You can implement actual certificate verification logic here
//       alert("Certificate verification functionality would be implemented here")
//     })
//   })
// })

// Add parallax effect to floating elements
document.addEventListener("mousemove", (e) => {
  const floatingElements = document.querySelectorAll(".floating-element")

  floatingElements.forEach((element, index) => {
    const speed = (index + 1) * 0.02
    const x = (e.clientX * speed) / 100
    const y = (e.clientY * speed) / 100

    element.style.transform = `translate(${x}px, ${y}px)`
  })
})

// Add smooth transitions for all interactive elements
document.addEventListener("DOMContentLoaded", () => {
  const interactiveElements = document.querySelectorAll("button, a, .card, .skill-item")

  interactiveElements.forEach((element) => {
    element.style.transition = "all 0.3s ease"
  })
})


function openCertificatePopup(imageSrc) {
  const overlay = document.createElement("div");
  overlay.className = "certificate-popup-overlay";

  const content = document.createElement("div");
  content.className = "certificate-popup-content";

  const close = document.createElement("span");
  close.className = "popup-close";
  close.innerHTML = "&times;";
  close.onclick = () => document.body.removeChild(overlay);

  const img = document.createElement("img");
  img.src = imageSrc;
  img.alt = "Certificate Preview";

  content.appendChild(close);
  content.appendChild(img);
  overlay.appendChild(content);
  document.body.appendChild(overlay);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      document.body.removeChild(overlay);
    }
  });
}

