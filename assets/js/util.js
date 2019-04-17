export function fixedRollThrough() {
  let bodyEl = document.body
  let top = window.scrollY
  return function (forbidScroll) {
    // 禁止穿透
    if (forbidScroll) {
      top = window.scrollY
      bodyEl.style.position = 'fixed'
      bodyEl.style.top = -top + 'px'
      bodyEl.style.left = '0'
      bodyEl.style.right = '0'
    } else {
      bodyEl.style.position = ''
      bodyEl.style.top = ''
      bodyEl.style.left = ''
      bodyEl.style.right = ''
      window.scrollTo(0, top)
    }
  }
}
