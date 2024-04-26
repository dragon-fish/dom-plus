import { Properties } from 'csstype'
import { handleCSS, removableListener } from '../modules/index.js'
import type { AnyElement } from '../types/Element.js'

/**
 * WIP: This is a work in progress. Please do not use it yet.
 *
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
  // @ts-ignore
  HTMLElement.prototype.$css = function (prop, value) {
    return handleCSS.bind(null)(this, prop, value)
  }
}

declare global {
  interface Element {
    /**
     * Add event listener and return a function to remove it
     */
    $on<T extends AnyElement>(
      this: T,
      type: string,
      listener: (this: T, ev: Event) => any,
      options?: boolean | AddEventListenerOptions
    ): () => void
    $on<
      T extends AnyElement,
      K extends T extends HTMLElement
        ? keyof HTMLElementEventMap
        : keyof SVGElementEventMap
    >(
      type: K | string,
      listener: (
        this: T,
        ev: K extends string
          ? Event
          : T extends HTMLElement
          ? HTMLElementEventMap[K]
          : SVGElementEventMap[K]
      ) => any,
      options?: boolean | AddEventListenerOptions
    ): () => void
  }
}
export function applyListenerShortcut() {
  // @ts-ignore
  Element.prototype.$on = function (type, listener, options) {
    return removableListener.bind(null)(this, type, listener, options)
  }
}
