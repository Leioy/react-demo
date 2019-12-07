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
  return function (name?: string | ClassToggles, options?: Options) {
    let name2
    let result
    if (typeof name === 'string' || typeof name === 'undefined') {
      name2 = name
      result = [prefix, name2].filter(Boolean).join('-')
    } else {
      name2 = Object.entries(name).filter(kv => kv[1]).map(kv => kv[0])
      result = name2.map(n => {
        return [prefix, n].filter(Boolean).join('-')
      }).join(' ')
    }
    if (options) {
      return [result, options.extra].filter(Boolean).join(' ')
    } else {
      return result
    }
  }
}