gsap.registerPlugin(ScrollTrigger)

const columns = gsap.utils.toArray('.column')

columns.forEach((col, i) => {
  gsap.to(col, {
    opacity: 1,
    y: 0,
    scrollTrigger: {
      trigger: '.pin-section',
      start: () => `top top+=${i * 100}`,
      end: '+=100',
      scrub: true
    }
  })
})
