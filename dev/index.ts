import { h } from '../src/index'

const APP_ROOT = document.getElementById('app')!

// Build a simple DOM tree
const main = h('main', [
  h('h1', 'DOM Generator'),
  h('article', [
    h('h2', 'hello, world'),
    h(
      'p',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempor tellus et tellus porta tristique.'
    ),
  ]),
])
APP_ROOT.appendChild(main)

// Add some styles
document.head.appendChild(
  h(
    'style',
    `
html, body {
  margin: 0;
  padding: 0;
}
:root {
  font-size: 16px;
}
body {
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif;
}
main {
  margin: 0 auto;
  max-width: 1200px;
  width: calc(100vw - 2rem);
}
`
  )
)

// Let's try something pro
const withStyles = h('div', { style: { color: 'red' } }, 'Mama, I am red!')
const withClasses = h('div', { class: ['foo', 'bar'] }, 'Mama, I have classes!')
main.append(h('h2', 'Pro'), withStyles, withClasses)

// and listen to some events
const withEvents = h(
  'button',
  { onClick: () => alert('Hello, world!') },
  'Click me!'
)
main.append(h('h2', 'Events'), h('p', withEvents))

// Pass HTMLElement instance as first parameter
const textList = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']
let textIndex = -1
const changeText = h('button')
// Let's try some magic
// We can replace the children of the element by passing some thing to it
h(changeText, 'Just click me!')
// We can also add properties to the element
h(changeText, {
  onClick() {
    changeText.textContent = textList[++textIndex % textList.length]
  },
})
main.append(h('p', changeText))
