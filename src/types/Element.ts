import { Properties } from 'csstype'

export type FullElementTagNameMap = HTMLElementTagNameMap &
  Pick<
    SVGElementTagNameMap,
    Exclude<keyof SVGElementTagNameMap, keyof HTMLElementTagNameMap>
  >
export type ElementChildren = string | Element | (Element | string)[]
export type ElementAttributes = {
  style?: string | Properties
  class?: string | string[]
  [key: string]: any
}
export type AnyElement = HTMLElement | SVGElement
