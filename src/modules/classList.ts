import type { AnyElement } from '../types/Element.js'

export function parseClassNames(
  classNames: string | string[],
  ...rest: string[]
): string[] {
  if (Array.isArray(classNames)) {
    return classNames.concat(rest)
  }
  return classNames.split(/\s+/).concat(rest)
}

export function addClass<T extends AnyElement>(
  el: T,
  classNames: string | string[],
  ...rest: string[]
): T {
  const list = parseClassNames(classNames, ...rest)
  el.classList.add(...list)
  return el
}

export function removeClass<T extends AnyElement>(
  el: T,
  classNames: string | string[],
  ...rest: string[]
): T {
  const list = parseClassNames(classNames, ...rest)
  el.classList.remove(...list)
  return el
}

export function toggleClass<T extends AnyElement>(
  el: T,
  className: string,
  force?: boolean
): T {
  el.classList.toggle(className, force)
  return el
}
