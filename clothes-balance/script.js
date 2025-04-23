const {
  Engine,
  Render,
  Runner,
  World,
  Bodies,
  Body,
  Composite,
  Composites,
  Events,
  Mouse,
  MouseConstraint
} = Matter

const engine = Engine.create()
const world = engine.world

const container = document.getElementById('canvas-container')
const width = window.innerWidth
const height = window.innerHeight * 0.9

const render = Render.create({
  element: container,
  engine: engine,
  options: {
    width,
    height,
    wireframes: false,
    background: '#eef'
  }
})

Render.run(render)
Runner.run(Runner.create(), engine)

// Sol
const ground = Bodies.rectangle(width / 2, height - 20, width, 40, {
  isStatic: true
})
World.add(world, ground)

// Balance (base + plateaux)
const base = Bodies.rectangle(width / 2, height - 100, 200, 20, {
  isStatic: true
})
const leftPlate = Bodies.rectangle(width / 2 - 120, height - 150, 120, 20, {
  isStatic: true,
  label: 'plate'
})
const rightPlate = Bodies.rectangle(width / 2 + 120, height - 150, 120, 20, {
  isStatic: true,
  label: 'plate'
})
World.add(world, [base, leftPlate, rightPlate])

// Bac à vêtements
const bin = Bodies.rectangle(width / 2, 100, 400, 20, { isStatic: true })
World.add(world, bin)

// Vêtements avec images et prix
const clothesData = [
  {
    x: width / 2 - 150,
    y: 50,
    img: 'https://static.vecteezy.com/system/resources/thumbnails/049/223/498/small/black-t-shirt-ai-generative-free-png.png',
    price: 10
  },
  {
    x: width / 2,
    y: 50,
    img: 'https://static.vecteezy.com/system/resources/thumbnails/037/174/415/small/ai-generated-3d-rendering-of-a-man-shorts-on-transparent-background-ai-generated-free-png.png',
    price: 15
  },
  {
    x: width / 2 + 150,
    y: 50,
    img: 'https://static.vecteezy.com/system/resources/thumbnails/044/812/684/small/a-one-classic-blue-jeans-isolated-on-transparent-background-png.png',
    price: 20
  }
]

const clothes = clothesData.map(data => {
  const body = Bodies.circle(data.x, data.y, 20, {
    restitution: 0.5,
    render: {
      sprite: {
        texture: data.img,
        xScale: 1,
        yScale: 1
      }
    }
  })
  body.price = data.price
  return body
})

World.add(world, clothes)

// Drag and drop
const mouse = Mouse.create(render.canvas)
const mouseConstraint = MouseConstraint.create(engine, {
  mouse,
  constraint: {
    stiffness: 0.2,
    render: { visible: false }
  }
})
World.add(world, mouseConstraint)
render.mouse = mouse

// Affichage prix
const priceDisplay = document.getElementById('price-display')

Events.on(engine, 'afterUpdate', () => {
  let total = 0
  for (const cloth of clothes) {
    if (isOnPlate(cloth, leftPlate) || isOnPlate(cloth, rightPlate)) {
      total += cloth.price
    }
  }
  priceDisplay.textContent = `Prix total : ${total} €`
})

function isOnPlate (body, plate) {
  const b = body.bounds
  const p = plate.bounds
  const overlap =
    b.max.x > p.min.x &&
    b.min.x < p.max.x &&
    b.max.y > p.min.y &&
    b.min.y < p.max.y
  return overlap
}
