const clothesBin = document.getElementById('clothes-bin')
const characterZone = document.getElementById('character-zone')

let draggedItem = null
let draggedFromSlot = null

function makeDraggable (item) {
  item.setAttribute('draggable', 'true')
  item.addEventListener('dragstart', e => {
    draggedItem = e.target
    const parent = draggedItem.parentElement

    if (parent.classList.contains('clothing-slot')) {
      draggedFromSlot = parent
    } else if (parent.id === 'clothes-bin') {
      draggedFromSlot = null
    }

    e.dataTransfer.setData('type', draggedItem.dataset.type)
  })
}

// Initialisation
document.querySelectorAll('.clothing').forEach(makeDraggable)

// Drop sur le personnage
characterZone.addEventListener('dragover', e => e.preventDefault())
characterZone.addEventListener('drop', e => {
  e.preventDefault()
  const type = e.dataTransfer.getData('type')
  const slot = document.getElementById(`slot-${type}`)

  // Si un vêtement est déjà là, on le remet dans le bac
  if (slot.firstChild && slot.firstChild !== draggedItem) {
    clothesBin.appendChild(slot.firstChild)
    makeDraggable(slot.firstChild)
  }

  // On déplace l'élément (depuis bac ou slot)
  if (draggedItem) {
    slot.innerHTML = ''
    slot.appendChild(draggedItem)
  }
})

// Drop dans le bac à vêtements
clothesBin.addEventListener('dragover', e => e.preventDefault())
clothesBin.addEventListener('drop', e => {
  e.preventDefault()
  if (draggedItem) {
    if (draggedFromSlot) {
      draggedFromSlot.innerHTML = ''
    }
    clothesBin.appendChild(draggedItem)
    makeDraggable(draggedItem)
  }
})
