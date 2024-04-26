/**
 * DOM generator
 * @author Dragon-Fish
 * @license MIT
 */

import type {
  FullElementTagNameMap,
  ElementChildren,
  ElementAttributes,
} from './types/Element.js'
import { type DOMPlus, createDOMPlus } from './DOMPlus.js'

export function createElement<K extends keyof FullElementTagNameMap>(
  tagName: K,
  children?: ElementChildren
): DOMPlus<FullElementTagNameMap[K]>
export function createElement<K extends keyof FullElementTagNameMap>(
  tagName: K,
  attr?: ElementAttributes,
  children?: ElementChildren
): DOMPlus<FullElementTagNameMap[K]>
export function createElement<K extends HTMLElement | SVGElement>(
  element: K,
  children?: ElementChildren
): DOMPlus<K>
export function createElement<K extends HTMLElement | SVGElement>(
  element: K,
  attr?: ElementAttributes,
  children?: ElementChildren
): DOMPlus<K>
export function createElement<
  K extends keyof FullElementTagNameMap | HTMLElement | SVGElement
>(
  tagNameOrElement: K,
  attrOrChildren?: ElementChildren | ElementAttributes,
  children?: ElementChildren
) {
  // Create element
  let initialElement: HTMLElement | SVGElement
  if (typeof tagNameOrElement === 'string') {
    initialElement = document.createElement(tagNameOrElement as string)
  } else if (
    typeof tagNameOrElement === 'object' &&
    (tagNameOrElement instanceof Element ||
      tagNameOrElement instanceof SVGElement)
  ) {
    initialElement = tagNameOrElement
  } else {
    throw new Error('Invalid tag name')
  }

  const el = createDOMPlus(initialElement)

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

// Alias
export { createElement as h }

// Utils
export * from './utils'
export * from './plugins'
