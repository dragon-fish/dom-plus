import { h, q } from '../src/index.js'

const APP_ROOT = q<HTMLElement>('app')!

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

/** 渐变文字 */
.rainbow {
  background-image: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
`
  )
)

// Let's try something pro
const withStyles = h('p', { style: { color: 'red' } }, 'Mama, I am red!')
const withClasses = h(
  'div',
  { class: ['foo', 'bar', 'rainbow'] },
  h('span', { class: ['rainbow'] }, 'Mama, I become rainbow!')
)
main.append(h('h2', 'Pro'), withStyles, withClasses)

// and listen to some events
const withEvents = h(
  'button',
  { onClick: () => alert('Hello, world!') },
  'Click me!'
)
const stop = withEvents.$on('click', (e) => {
  e.preventDefault()
  e.stopPropagation()
  alert('This alert will be shown only once!')
  stop()
})

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
main.append(
  h('h2', 'Events'),
  h('div', { style: { display: 'flex', gap: '1rem' } }, [
    withEvents,
    changeText,
  ])
)

// Plugins
const pluginsTarget = h('p', 'Lorem ipsum dolor sit amet')
const colorList = ['red', 'green', 'blue', 'yellow', 'purple']
let colorIndex = 0
const setCss = h(
  'button',
  {
    onClick() {
      pluginsTarget
        .$css('color', colorList[colorIndex % colorList.length])
        .$css('backgroundColor', colorList[++colorIndex % colorList.length])
    },
  },
  'Set CSS'
)
const getCss = h(
  'button',
  {
    onClick() {
      alert(
        `Color: ${pluginsTarget.$css(
          'color'
        )}\nBackground: ${pluginsTarget.$css('backgroundColor')}`
      )
    },
  },
  'Get CSS'
)
main.append(
  h('h2', 'Plugins'),
  pluginsTarget,
  h(
    'div',
    {
      style: {
        display: 'flex',
        gap: '1rem',
      },
    },
    [setCss, getCss]
  )
)

// Chainable
const chainableTarget = h(
  'p',
  {
    class: 'foo bar',
    style: {
      color: 'red',
    },
  },
  'Hello, world!'
)
const chainable = h(
  'button',
  {
    onClick() {
      chainableTarget
        .$addClass('baz')
        .$toggleClass('foo')
        .$css('color', 'blue')
        .$css({ fontSize: '2rem' })
        .$text('Hey, I changed!')
    },
  },
  'Chainable'
)
main.append(h('h2', 'Chainable'), chainableTarget, chainable)
