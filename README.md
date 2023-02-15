# DOM Generator

Very simple DOM generator with types declaration。

## Installation

### From NPM

```sh
# Via npm
npm install create-element.ts
# Or pnpm
pnpm add create-element.ts
# Yarn? sure
yarn add create-element.ts
```

Then import it to your project.

```ts
// ESM
import { h } from 'h.ts'
// CJS
const { h } = require('h.ts')
```

### In browser

```html
<script src="https://unpkg.org/h.ts/dist/index.umd.js"></script>
<script>
  const { h } = window.CreateElement
  // ...
</script>
```

Or... Why not ESM?

```ts
import { h } from 'https://unpkg.org/h.ts?module'
// ...
```

## Usage

```ts
// step-1  - create element
const block = h('div', { class: 'foo' }, [h('span', 'bar'), 'baz'])
// step-2? - no more steps!
console.info(block.outerHTML) // <div class="foo"><span>bar</span>baz</div>
```
