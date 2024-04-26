import type { AnyElement } from '../types/Element.js'

export function removableListener<T extends Element>(
  target: T,
  type: string,
  listener: (this: T, ev: Event) => any,
  options?: boolean | AddEventListenerOptions
): () => void
export function removableListener<
  T extends AnyElement,
  K extends T extends HTMLElement
    ? keyof HTMLElementEventMap
    : keyof SVGElementEventMap
>(
  target: T,
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
): () => void {
  target.addEventListener(type, listener as EventListener, options)
  return () => {
    target.removeEventListener(type, listener as EventListener, options)
  }
}
