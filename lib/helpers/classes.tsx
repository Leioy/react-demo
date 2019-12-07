function classes (...names: (string | undefined)[]) {
  return names.filter(Boolean).join(' ')
}
export default classes

interface Options {
  extra: string | undefined
}
interface ClassToggles {
  [k: string]: boolean
}
export function prefixFunctionMaker (prefix = '') {
  return function (name: string | ClassToggles, options?: Options) {
    const name2 = (typeof name === 'string' || typeof name === 'undefined') ? { [name]: name } : name
    const scoped = Object
      .entries(name2)
      .filter(kv => kv[1] !== false)
      .map(kv => kv[0])
      .map(name => [prefix, name].filter(Boolean).join('-'))
      .join(' ')
    if (options) {
      return [scoped, options.extra].filter(Boolean).join(' ')
    } else {
      return scoped
    }
  }
}