/**
 * DOM generator
 * @author Dragon-Fish
 * @license MIT
 */

export function createElement<K extends keyof ElementTagNameMap>(
  tagName: K,
  children?: ElementChildren
): ElementTagNameMap[K]
export function createElement<K extends keyof ElementTagNameMap>(
  tagName: K,
  attr?: ElementAttributes,
  children?: ElementChildren
): ElementTagNameMap[K]
export function createElement<K extends keyof ElementTagNameMap>(
  tagName: K,
  attrOrChildren?: ElementChildren | ElementAttributes,
  children?: ElementChildren
): ElementTagNameMap[K] {
  const el = document.createElement(tagName) as ElementTagNameMap[K]

  if (attrOrChildren instanceof Element || typeof attrOrChildren === 'string') {
    attrOrChildren = [attrOrChildren]
  }
  if (Array.isArray(attrOrChildren)) {
    el.append(...attrOrChildren)
  } else if (attrOrChildren) {
    const attrs = attrOrChildren
    Object.keys(attrs).forEach((k) => {
      typeof k !== 'undefined' && el.setAttribute(k, '' + attrs[k])
    })
  }

  if (children instanceof Element || typeof children === 'string') {
    children = [children]
  }
  if (Array.isArray(children)) {
    el.append(...children)
  }
  return el
}

type ElementTagNameMap = HTMLElementTagNameMap &
  Pick<
    SVGElementTagNameMap,
    Exclude<keyof SVGElementTagNameMap, keyof HTMLElementTagNameMap>
  >
type ElementChildren = string | Element | (Element | string)[]
type ElementAttributes = Record<string, string | boolean | number | undefined>
export { createElement as h }
