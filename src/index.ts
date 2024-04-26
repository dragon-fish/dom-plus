/**
 * DOM generator
 * @author Dragon-Fish
 * @license MIT
 */

import type {
  AnyElement,
  FullElementTagNameMap,
  ElementChildren,
  ElementAttributes,
} from './types/Element.js'
import { type DOMPlus, createDOMPlus } from './DOMPlus.js'

// create element by tag name
export function createElement<K extends keyof FullElementTagNameMap>(
  tagName: K,
  children?: ElementChildren
): DOMPlus<FullElementTagNameMap[K]>
export function createElement<K extends keyof FullElementTagNameMap>(
  tagName: K,
  attr?: ElementAttributes,
  children?: ElementChildren
): DOMPlus<FullElementTagNameMap[K]>
// using given element
export function createElement<K extends AnyElement>(
  element: K,
  children?: ElementChildren
): DOMPlus<K>
export function createElement<K extends AnyElement>(
  element: K,
  attr?: ElementAttributes,
  children?: ElementChildren
): DOMPlus<K>

/**
 * Create a DOMPlus element, with attributes and children
 * with the given tag name or element
 */
export function createElement<
  K extends keyof FullElementTagNameMap | AnyElement
>(
  initialTarget: K,
  attrOrChildren?: ElementChildren | ElementAttributes,
  children?: ElementChildren
) {
  // Create element
  let rawElement: AnyElement | null = null
  if (typeof initialTarget === 'string') {
    rawElement = document.createElement(initialTarget as string)
  } else if (
    typeof initialTarget === 'object' &&
    (initialTarget instanceof Element || initialTarget instanceof SVGElement)
  ) {
    rawElement = initialTarget
  } else {
    throw new TypeError(
      'Invalid first argument: must be a string or an instance of Element'
    )
  }

  if (!rawElement) {
    return null
  }
  const el = createDOMPlus(rawElement)

  // Check if the second argument is attributes or children
  if (typeof attrOrChildren === 'string' || attrOrChildren instanceof Element) {
    attrOrChildren = [attrOrChildren]
  }

  // Second argument is children
  if (Array.isArray(attrOrChildren)) {
    el.replaceChildren(...attrOrChildren)
  }
  // Second argument is attributes or properties
  else if (typeof attrOrChildren === 'object' && attrOrChildren !== null) {
    const attrs = attrOrChildren
    Object.entries(attrs).forEach(([key, value]) => {
      if (typeof value === 'undefined') {
        el.removeAttribute(key)
        return
      }

      // CSS styles
      if (key === 'style') {
        if (typeof value === 'string') {
          el.style && (el.style.cssText = value)
        } else {
          el.$css(value)
        }
      }
      // class names
      else if (key === 'class') {
        el.$addClass(value)
      }
      // event listeners
      else if (key.startsWith('on')) {
        const event = key.slice(2).toLowerCase()
        el.$on(event as any, value)
      }
      // default attributes
      else {
        el.setAttribute(key, value)
      }
    })
  }

  // Check if the third argument is children
  if (typeof children === 'string' || children instanceof Element) {
    children = [children]
  }
  if (Array.isArray(children)) {
    el.replaceChildren(...children)
  }

  return el as DOMPlus<
    K extends keyof FullElementTagNameMap ? FullElementTagNameMap[K] : K
  >
}

// Query selector
export const querySelector: Document['querySelector'] =
  document.querySelector.bind(document)
export const querySelectorAll: Document['querySelectorAll'] =
  document.querySelectorAll.bind(document)

// Alias
export { createElement as h, querySelector as q, querySelectorAll as qq }
