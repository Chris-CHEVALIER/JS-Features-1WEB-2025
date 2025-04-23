window.addEventListener('scroll', () => {
  const scrollY = window.scrollY
  const logo = document.querySelector('.logo')
  const title = document.querySelector('.title')
  const description = document.querySelector('.description')
  const overlay = document.getElementById('overlay')
  const bg = document.getElementById('bg')

  // LOGO FADE OUT (0 -> 300px)
  if (scrollY <= 300) {
    logo.style.opacity = 1 - scrollY / 300
  }

  // TITLE FADE IN (200 -> 500px)
  if (scrollY > 200 && scrollY < 500) {
    title.style.opacity = (scrollY - 200) / 300
  } else if (scrollY <= 200) {
    title.style.opacity = 0
  }

  // DESCRIPTION FADE IN + RISE (400 -> 700px)
  if (scrollY > 400 && scrollY < 700) {
    description.style.opacity = (scrollY - 400) / 300
    description.style.transform = `translateY(${20 - (scrollY - 400) / 15}px)`
  } else if (scrollY <= 400) {
    description.style.opacity = 0
    description.style.transform = `translateY(20px)`
  }

  // GLOBAL FADE OUT + BLACK OVERLAY (800 -> 1100px)
  if (scrollY > 800 && scrollY < 1100) {
    const fade = (scrollY - 800) / 300
    title.style.opacity = 1 - fade
    description.style.opacity = 1 - fade
    overlay.style.opacity = fade
  }

  // FULLY BLACK
  if (scrollY >= 1100) {
    title.style.opacity = 0
    description.style.opacity = 0
    overlay.style.opacity = 1
  }

  // ZOOM BACKGROUND (max 1.1 scale up to 1100px)
  const zoom = Math.min(1.1, 1 + scrollY / 5000)
  bg.style.transform = `scale(${zoom})`
})
