/* Sources des images du carousel */
const imagesSrc = [
  'https://placehold.co/300x200?text=1',
  'https://placehold.co/300x200?text=2',
  'https://placehold.co/300x200?text=3',
  'https://placehold.co/300x200?text=4',
  'https://placehold.co/300x200?text=5'
]

const carousel = document.getElementById('carousel')
const container = document.getElementById('carouselContainer')
let allImages = []

function createCarouselImages () {
  carousel.innerHTML = ''
  const cloned = [
    ...imagesSrc.slice(-2),
    ...imagesSrc,
    ...imagesSrc.slice(0, 2)
  ]
  cloned.forEach(src => {
    const img = document.createElement('img')
    img.src = src
    carousel.appendChild(img)
  })
  
  allImages = carousel.querySelectorAll('img')
}

let currentIndex = 2
let startX = 0
let isDragging = false
let currentTranslate = 0
let prevTranslate = 0
let animationID = 0

function setPositionByIndex (animate = true) {
  const imgWidth = allImages[0].offsetWidth + 20
  currentTranslate =
    -imgWidth * currentIndex +
    (container.offsetWidth - allImages[0].offsetWidth) / 2
  carousel.style.transition = animate ? 'transform 0.4s ease' : 'none'
  carousel.style.transform = `translateX(${currentTranslate}px)`
  updateClasses()
}

function updateClasses () {
  allImages.forEach((img, i) => {
    img.classList.remove('left', 'center', 'right')
    if (i === currentIndex) {
      img.classList.add('center')
    } else if (i === currentIndex - 1) {
      img.classList.add('left')
    } else if (i === currentIndex + 1) {
      img.classList.add('right')
    }
  })
}

function loopFix () {
  const len = imagesSrc.length
  if (currentIndex <= 1) {
    currentIndex += len
    setPositionByIndex(false)
  } else if (currentIndex >= len + 2) {
    currentIndex -= len
    setPositionByIndex(false)
  }
}

function animation () {
  carousel.style.transition = 'none'
  carousel.style.transform = `translateX(${currentTranslate}px)`
  if (isDragging) requestAnimationFrame(animation)
}

function getPositionX (e) {
  return e.type.includes('mouse') ? e.clientX : e.touches[0].clientX
}

function dragStart (e) {
  isDragging = true
  startX = getPositionX(e)
  prevTranslate = currentTranslate
  animationID = requestAnimationFrame(animation)
}

function dragMove (e) {
  if (!isDragging) return
  const currentX = getPositionX(e)
  const diff = currentX - startX
  currentTranslate = prevTranslate + diff
}

function dragEnd () {
  cancelAnimationFrame(animationID)
  isDragging = false
  const movedBy = currentTranslate - prevTranslate
  const threshold = 100

  if (movedBy < -threshold) currentIndex++
  else if (movedBy > threshold) currentIndex--

  setPositionByIndex()
  setTimeout(loopFix, 420)
}

function setupEvents () {
  // Touch events
  container.addEventListener('touchstart', dragStart)
  container.addEventListener('touchmove', dragMove)
  container.addEventListener('touchend', dragEnd)

  // Mouse events
  container.addEventListener('mousedown', dragStart)
  container.addEventListener('mousemove', dragMove)
  container.addEventListener('mouseup', dragEnd)
  container.addEventListener('mouseleave', () => isDragging && dragEnd())
}

// Init
createCarouselImages()
setupEvents()
setPositionByIndex()

window.addEventListener('resize', () => {
  setPositionByIndex(false)
})
