const scrollTo = (top: number, left: number = 0): void => window.scroll({
  top,
  left,
  behavior: 'smooth'
})

const scrollBy = (top: number, left: number = 0): void => window.scrollBy({
  top,
  left,
  behavior: 'smooth'
})

const scrollIntoView = (element: Element): void => element.scrollIntoView({
  behavior: 'smooth'
})

export {
  scrollTo,
  scrollBy,
  scrollIntoView
}
