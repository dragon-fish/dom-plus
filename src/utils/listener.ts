export function removableListener<
  T extends Element,
  K extends keyof ElementEventMap
>(
  target: T,
  type: K,
  listener: (this: Element, ev: ElementEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
) {
  target.addEventListener(type, listener, options)
  return () => target.removeEventListener(type, listener, options)
}
