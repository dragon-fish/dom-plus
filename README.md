<div align="center">

# PRO DOM Generator

Very simple DOM generator with types declaration.

</div>

## Why?

- [x] 🤯 Vanilla JS, no framework required!
- [x] 😏 No more `document.createElement` and `element.appendChild`!
- [x] 🤫 Even no `element.addEventListener`!
- [x] 🤩 Modify existing Element instance!
- [x] 😍 Fricking tiny size: 0 dependencies, 0 configuration, 0 problems! `dist/index.js  2.34 kB │ gzip: 0.93 kB │ map: 8.74 kB`

## Installation

### From NPM

```sh
# Via npm
npm install dom-pro
# Or pnpm
pnpm add dom-pro
# Yarn? sure
yarn add dom-pro
```

Then import it to your project.

```ts
// ESM
import { h } from 'dom-pro'
// CJS
const { h } = require('dom-pro')
```

### In browser

```html
<script src="https://unpkg.com/dom-pro"></script>
<script>
  const { h } = window.CreateElement
  // ...
</script>
```

Or... Why not ESM?

```ts
import { h } from 'https://unpkg.com/dom-pro?module'
// ...
```

## Usage

### General usage

```ts
// step-1  - create element
const block = h('div', { class: 'foo', style: 'color: red' }, [
  h('span', 'bar'),
  'baz',
])
// step-2? - no more steps! It works as you expect!
console.info(block.outerHTML) // <div class="foo"><span>bar</span>baz</div>
```

### CSS styles

Why not use CSS styles as an object?

```ts
const redBlock = h('div', { style: { color: 'red' } }, 'Hey, I am red!')
```

It's working! Even with the types!

### Class names

```ts
const block = h('div', { class: ['foo', 'bar'] }, 'Hey, I have classes!')
```

Needless to say, it's working too!!

### Event listeners

```ts
const button = h(
  'button',
  {
    onClick: () => {
      alert('Hello, world!')
    },
  },
  'Click me!'
)
```

**IT JUST WORKS!!!**

### Pass through Element as first argument

So you can modify the element.

```ts
// From: <div id="some-element">Blah</div>
const block = h(
  document.querySelector('#some-element'),
  { class: 'foo' },
  'Hey, I am a block!'
)
// To: <div id="some-element" class="foo">Hey, I am a block!</div>
```

Why are you still reading this?!! **Just try it!!!!!**

---

> MIT License
>
> Copyright (c) 2023-present dragon-fish
