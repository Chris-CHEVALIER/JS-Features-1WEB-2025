// Modal des langues
const toggleBtn = document.getElementById('languages-toggle')
const modal = document.getElementById('languages-modal')

/* Au clic sur le lien "Langue", affiche ou masque la modal des langues */
toggleBtn.addEventListener('click', () => {
  const isVisible = modal.style.display === 'block'
  modal.style.display = isVisible ? 'none' : 'block'
})

// Burger menu
const burger = document.querySelector('.burger')
const sidebar = document.getElementById('sidebar')
const closeBtn = document.getElementById('close-btn')

/* Au clic sur l'icône burger, ajoute la classe active à la barre verticale pour l'afficher */
burger.addEventListener('click', () => {
  sidebar.classList.add('active')
})

/* Au clic sur l'icône de croix, retire la classe active de la barre verticale pour la masquer */
closeBtn.addEventListener('click', () => {
  sidebar.classList.remove('active')
})

/* Au clic à l'extérieur de la modal, retire la classe active de la barre verticale pour la masquer */
window.addEventListener('click', e => {
  if (e.target === document.documentElement) {
    sidebar.classList.remove('active')
  }
})
