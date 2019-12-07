export function prefixFunctionMaker (prefix = '') {
  return function (name?: string) {
    return [prefix, name].filter(Boolean).join('-')
  }
}