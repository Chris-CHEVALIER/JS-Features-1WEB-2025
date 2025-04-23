let slideIndex = 1
showSlides(slideIndex)

// Gestion du bouton précédent
document.getElementById('prev').addEventListener('click', () => {
  showSlides((slideIndex -= 1))
})

// Gestion du bouton suivant
document.getElementById('next').addEventListener('click', () => {
  showSlides((slideIndex += 1))
})

function showSlides (n) {
  const slides = document.getElementsByClassName('slides')
  const dots = document.getElementsByClassName('dot')

  // Gestion du carousel à défilement infini
  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }

  // Gestion des slides du carousel
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none'
  }
  slides[slideIndex - 1].style.display = 'block'

  // Gestion des points de suivi du carousel
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '')
  }

  dots[slideIndex - 1].className += ' active'
}
