/**
 * @refer https://github.com/shigma/cosmokit/blob/2da9c0c7f7a8d3a4a149c357dce03d543cbc4632/src/string.ts
 */

export function capitalize(source: string) {
  return source.charAt(0).toUpperCase() + source.slice(1)
}

export function uncapitalize(source: string) {
  return source.charAt(0).toLowerCase() + source.slice(1)
}

export function camelCase(source: string) {
  return source.replace(/[_-][a-z]/g, (str) => str.slice(1).toUpperCase())
}
export function capitalizeCamelCase(source: string) {
  return capitalize(camelCase(source))
}

export function paramCase(source: string) {
  // do not use lookbehind assertion for Safari compatibility
  return uncapitalize(source)
    .replace(/_/g, '-')
    .replace(/.[A-Z]+/g, (str) => str[0] + '-' + str.slice(1).toLowerCase())
}
export { paramCase as kebabCase }

export function snakeCase(source: string) {
  // do not use lookbehind assertion for Safari compatibility
  return uncapitalize(source)
    .replace(/-/g, '_')
    .replace(/.[A-Z]+/g, (str) => str[0] + '_' + str.slice(1).toLowerCase())
}
