import type { Properties } from 'csstype'
import { kebabCase } from './string.js'
import type { AnyElement } from '../types/Element.js'

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

export function computedStyleValue<T extends AnyElement>(
  el: T,
  prop: keyof Properties
): string {
  return window.getComputedStyle(el).getPropertyValue(kebabCase(prop))
}
export function setStyle<T extends AnyElement>(
  el: T,
  prop: keyof Properties,
  value: string
) {
  if (!el || !prop || !value) return el
  if (!('style' in el)) return el

  let priority = ''
  if (typeof value === 'string' && value.endsWith('!important')) {
    priority = 'important'
    value = value.slice(0, -10).trim()
  }

  el.style.setProperty(kebabCase(prop), value, priority)
  return el
}
export function setStyles<T extends AnyElement>(el: T, styles: Properties) {
  Object.entries(styles).forEach(([key, value]) => {
    setStyle(el, key as keyof Properties, value as string)
  })
  return el
}

export function handleCSS<T extends AnyElement>(
  el: T,
  prop: keyof Properties
): string
export function handleCSS<T extends AnyElement>(
  el: T,
  prop: keyof Properties,
  value: string
): T
export function handleCSS<T extends AnyElement>(el: T, props: Properties): T
export function handleCSS<T extends AnyElement>(
  el: T,
  prop: keyof Properties | Properties,
  value?: string
): T | string {
  if (typeof prop === 'string') {
    if (value) {
      return setStyle(el, prop, value)
    }
    return computedStyleValue(el, prop)
  }
  return setStyles(el, prop)
}
