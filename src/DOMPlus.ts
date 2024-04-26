import { Properties } from 'csstype'
import {
  addClass,
  handleCSS,
  removableListener,
  removeClass,
  toggleClass,
} from './modules/index.js'
import type { AnyElement } from './types/Element.js'

/**
 * DOMPlus is a collection of useful methods for DOM elements
 *
 * - **WARNING**: This is an abstract type and should not be used directly. Please do not try to instantiate it. Use `createDOMPlus` instead.
 */
export interface DOMPlus<T extends AnyElement> extends HTMLElement {
  /**
   * Add class names to the element
   */
  $addClass(classNames: string | string[], ...rest: string[]): DOMPlus<T>
  /**
   * Remove class names from the element
   */
  $removeClass(classNames: string | string[], ...rest: string[]): DOMPlus<T>
  /**
   * Toggle class names on the element
   */
  $toggleClass(classNames: string, force?: boolean): DOMPlus<T>

  /**
   * Get computed style value or set CSS properties
   */
  $css(prop: keyof Properties): string
  $css(prop: keyof Properties, value: string): this
  $css(props: Properties): this

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

  /**
   * Set text content of the element
   */
  $text(): string
  $text(text: string): this
}

/**
 * Create a DOMPlus instance from a DOM element
 */
export function createDOMPlus<T extends AnyElement>(el: T): DOMPlus<T> {
  const element = el as DOMPlus<T>

  // @ts-ignore FIXME: Type definition is incorrect, too bad!
  element.$addClass = addClass.bind(null, element)
  // @ts-ignore FIXME: Type definition is incorrect, too bad!
  element.$removeClass = removeClass.bind(null, element)
  // @ts-ignore FIXME: Type definition is incorrect, too bad!
  element.$toggleClass = toggleClass.bind(null, element)

  // @ts-ignore FIXME: Type definition is incorrect, too bad!
  element.$css = handleCSS.bind(null, element)

  element.$on = removableListener.bind(null, element)

  // @ts-ignore FIXME: Type definition is incorrect, too bad!
  element.$text = function (text?: string) {
    if (typeof text === 'undefined') {
      return this.textContent || ''
    }
    this.textContent = text
    return this
  }

  return element
}
