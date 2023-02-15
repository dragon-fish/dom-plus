# DOM Generator

Very simple DOM generator with types declaration.

## Installation

### From NPM

```sh
# Via npm
npm install create-element-ts
# Or pnpm
pnpm add create-element-ts
# Yarn? sure
yarn add create-element-ts
```

Then import it to your project.

```ts
// ESM
import { h } from 'create-element-ts'
// CJS
const { h } = require('create-element-ts')
```

### In browser

```html
<script src="https://unpkg.com/create-element-ts/dist/index.umd.js"></script>
<script>
  const { h } = window.CreateElement
  // ...
</script>
```

Or... Why not ESM?

```ts
import { h } from 'https://unpkg.com/create-element-ts?module'
// ...
```

## Usage

```ts
// step-1  - create element
const block = h('div', { class: 'foo' }, [h('span', 'bar'), 'baz'])
// step-2? - no more steps!
console.info(block.outerHTML) // <div class="foo"><span>bar</span>baz</div>
```
