import { h } from '../src/index'

const app = h('main', [
  h('h1', 'DOM Generator'),
  h('article', [
    h('h2', 'hello, world'),
    h(
      'p',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempor tellus et tellus porta tristique.'
    ),
  ]),
])

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

document.getElementById('app')?.appendChild(app)

// step-1  - create element
const block = h('div', { class: 'foo' }, [h('span', 'bar'), 'baz'])
// step-2? - no more steps!
console.info(block.outerHTML)
