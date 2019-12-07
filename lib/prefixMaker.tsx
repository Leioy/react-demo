interface Options {
  extra: string | undefined
}
export function prefixFunctionMaker (prefix = '') {
  return function (name?: string, options?: Options) {
    const result = [prefix, name].filter(Boolean).join('-')
    if (options) {
      return [result, options.extra].filter(Boolean).join(' ')
    } else {
      return result
    }
  }
}