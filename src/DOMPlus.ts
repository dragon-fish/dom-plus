import { Properties } from 'csstype'
import {
  computedStyleValue,
  removableListener,
  setStyles,
} from './utils/index.js'

/**
 * DOMPlus is a collection of useful methods for DOM elements
 *
 * - **WARNING**: This is an abstract type and should not be used directly. Please do not try to instantiate it. Use `createDOMPlus` instead.
 */
export interface DOMPlus<T extends HTMLElement | SVGElement>
  extends HTMLElement {
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
  $toggleClass(classNames: string | string[], force?: boolean): DOMPlus<T>

  /**
   * Get computed style value or set CSS properties
   */
  $css(prop: keyof Properties): string
  $css(prop: keyof Properties, value: string): this
  $css(props: Properties): this

  /**
   * Add event listener and return a function to remove it
   */
  $on<K extends keyof ElementEventMap>(
    type: K,
    listener: (this: Element, ev: ElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): () => void
}

/**
 * Create a DOMPlus instance from a DOM element
 */
export function createDOMPlus<T extends HTMLElement | SVGElement>(
  el: T
): DOMPlus<T> {
  // @ts-ignore
  const element = el as DOMPlus<T>

  element.$addClass = function (
    classNames: string | string[],
    ...rest: string[]
  ) {
    const list = parseClassNames(classNames, ...rest)
    this.classList.add(...list)
    return this
  }

  element.$removeClass = function (
    classNames: string | string[],
    ...rest: string[]
  ) {
    const list = parseClassNames(classNames, ...rest)
    this.classList.remove(...list)
    return this
  }

  element.$toggleClass = function (
    classNames: string | string[],
    force?: boolean
  ) {
    const list = parseClassNames(classNames)
    list.forEach((c) => this.classList.toggle(c, force))
    return this
  }

  element.$css = function <T extends HTMLElement>(
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

  element.$on = function <T extends Element, K extends keyof ElementEventMap>(
    this: T,
    type: K,
    listener: (this: Element, ev: ElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ) {
    return removableListener(this, type, listener, options)
  }

  return element
}

function parseClassNames(
  classNames: string | string[],
  ...rest: string[]
): string[] {
  if (typeof classNames === 'string') {
    return classNames
      .split(' ')
      .map((c) => c.trim())
      .filter(Boolean)
  }
  return [...classNames, ...rest]
}
