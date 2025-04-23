const cookieSettings = document.getElementById('cookie-settings')
const cookieModal = document.getElementById('cookie-modal')
const closeBtn = document.getElementById('close-btn')

/* Au clic sur l'icône d'écrou, affiche la modale et réduit l'opacité du reste du contenu de la page */
cookieSettings.addEventListener('click', () => {
  document.getElementById('page-content').style.opacity = 0.5
  cookieModal.style.display = 'block'
})

/* Au clic sur l'icône de croix, masque la modale */
closeBtn.addEventListener('click', () => {
  document.getElementById('page-content').style.opacity = 1
  cookieModal.style.display = 'none'
})

/* Au clic à l'extérieur de la modal, la masque */
window.addEventListener('click', e => {
  if (e.target === document.documentElement) {
    document.getElementById('page-content').style.opacity = 1
    cookieModal.style.display = 'none'
  }
})

// Affiche une alerte à l'écran en fonction du choix de l'utilisateur
document.getElementById('all-cookies').addEventListener('click', () => {
  alert('Tous les cookies activés')
})

document.getElementById('no-cookies').addEventListener('click', () => {
  alert('Tous les cookies refusés')
})

document.getElementById('save').addEventListener('click', () => {
  alert('Modifications enregistrées')
})
