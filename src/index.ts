/**
 * DOM generator
 * @author Dragon-Fish
 * @license MIT
 */

import type {
  FullElementTagNameMap,
  ElementChildren,
  ElementAttributes,
} from './types/Element'
import { setStyles } from './utils/css.js'

export function createElement<K extends keyof FullElementTagNameMap>(
  tagName: K,
  children?: ElementChildren
): FullElementTagNameMap[K]
export function createElement<K extends keyof FullElementTagNameMap>(
  tagName: K,
  attr?: ElementAttributes,
  children?: ElementChildren
): FullElementTagNameMap[K]
export function createElement<K extends HTMLElement>(
  element: K,
  children?: ElementChildren
): K
export function createElement<K extends HTMLElement>(
  element: K,
  attr?: ElementAttributes,
  children?: ElementChildren
): K
export function createElement<
  K extends keyof FullElementTagNameMap | HTMLElement
>(
  tagNameOrElement: K,
  attrOrChildren?: ElementChildren | ElementAttributes,
  children?: ElementChildren
): K extends keyof FullElementTagNameMap ? FullElementTagNameMap[K] : K {
  // Create element
  let el: HTMLElement
  if (typeof tagNameOrElement === 'string') {
    el = document.createElement(tagNameOrElement as string)
  } else if (
    typeof tagNameOrElement === 'object' &&
    tagNameOrElement instanceof HTMLElement
  ) {
    el = tagNameOrElement
  } else {
    throw new Error('Invalid tag name')
  }

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
          el.style.cssText = value
        } else {
          setStyles(el as HTMLElement, value)
        }
      }
      // class names
      else if (key === 'class') {
        if (typeof value === 'string') {
          el.classList.add(...value.split(' '))
        } else if (Array.isArray(value)) {
          el.classList.add(...value)
        }
      }
      // event listeners
      else if (key.startsWith('on')) {
        const event = key.slice(2).toLowerCase()
        el.addEventListener(event, value)
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

  return el as K extends keyof FullElementTagNameMap
    ? FullElementTagNameMap[K]
    : K
}

// Alias
export { createElement as h }

// Utils
export * from './utils/css'
export * from './utils/listener'
export * from './utils/string'
