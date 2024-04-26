import { Properties } from 'csstype'
import { setStyles, computedStyleValue } from '../utils/css.js'
import { removableListener } from '../utils/listener.js'

/**
 * Install all global shortcuts
 * - `element.$css`: Shortcut for setting and getting CSS properties
 * - `element.$on`: Shortcut for adding event listeners
 *
 * WARNING: This tool will modify the global `HTMLElement` and `Element` prototypes.
 */
export function applyAllGlobalShortcuts() {
  applyCSSShortcut()
  applyListenerShortcut()
}

declare global {
  interface HTMLElement {
    $css(prop: keyof Properties): string
    $css(prop: keyof Properties, value: string): this
    $css(props: Properties): this
  }
}
export function applyCSSShortcut() {
  HTMLElement.prototype.$css = function <T extends HTMLElement>(
    this: T,
    prop: keyof Properties | Properties,
    value?: string
  ): string | T {
    if (typeof prop === 'string') {
      if (value) {
        this.style.setProperty(prop, value)
        return this
      }
      return computedStyleValue(this, prop)
    }
    setStyles(this, prop)
    return this
  }
}

declare global {
  interface Element {
    /**
     * Add event listener and return a function to remove it
     */
    $on<K extends keyof ElementEventMap>(
      type: K,
      listener: (this: Element, ev: ElementEventMap[K]) => any,
      options?: boolean | AddEventListenerOptions
    ): () => void
  }
}
export function applyListenerShortcut() {
  Element.prototype.$on = function <
    T extends Element,
    K extends keyof ElementEventMap
  >(
    this: T,
    type: K,
    listener: (this: Element, ev: ElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ) {
    return removableListener(this, type, listener, options)
  }
}
