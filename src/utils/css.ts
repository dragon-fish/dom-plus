import type { Properties } from 'csstype'
import { kebabCase } from './string.js'

declare module 'csstype' {
  interface Properties {
    // Allow any CSS Custom Properties
    [index: `--${string}`]: any
  }
}

export function cssText(styles?: Properties): string {
  return styles
    ? Object.entries(styles)
        .reduce((acc: string, [key, value]) => {
          return `${acc} ${kebabCase(key)}: ${value};`
        }, '')
        .trim()
    : ''
}

export function computedStyleValue(
  el: HTMLElement,
  prop: keyof Properties
): string {
  return window.getComputedStyle(el).getPropertyValue(prop)
}
export function setStyle(
  el: HTMLElement,
  prop: keyof Properties,
  value: string
) {
  el.style.setProperty(prop, value)
  return el
}
export function setStyles(el: HTMLElement, styles: Properties) {
  if (!el || !styles) return el
  if (!('style' in el)) return el
  Object.entries(styles).forEach(([key, value]) => {
    el.style.setProperty(key, value)
  })
  return el
}
