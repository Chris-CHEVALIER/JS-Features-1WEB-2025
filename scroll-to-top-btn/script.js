// Pensez à prévoir un élément HTML associé à l'id "scrollToTop"
const scrollToTopButton = document.getElementById('scrollToTop')

window.addEventListener('scroll', function () {
  // Lorsque l'utilisateur scroll en dessous de 300px à la verticale
  if (window.scrollY > 300) {
    // Affiche l'icône
    scrollToTopButton.style.display = 'block'
  } else {
    // Fait disparaître l'icône
    scrollToTopButton.style.display = 'none'
  }
})

// Pour remonter la page de manière fluide ('smooth') au clic sur l'icône
scrollToTopButton.addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
