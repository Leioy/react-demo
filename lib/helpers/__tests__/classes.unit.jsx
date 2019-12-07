import classes,{prefixFunctionMaker} from '../classes'
describe('icon', () => {
	it('接受一个className', () => {
    const result = classes('a')
    expect(result).toEqual('a')
  })
  it('接受两个className',() => {
    const result = classes('a','b')
    expect(result).toEqual('a b')
  })
  it('接受undefined',() => {
    const result = classes('a',undefined)
    expect(result).toEqual('a')
  })
  it('接受其他的值',() => {
    const result = classes('a',undefined,'中文',null,false)
    expect(result).toEqual('a 中文')
  })
  it('接受0个参数',() => {
    const result = classes()
    expect(result).toEqual('')
  })
})
describe('prefixFunctionMaker',() => {
  it('接受字符串或对象',() => {
    const prefixAdder = prefixFunctionMaker('rui-layout')
    expect(prefixAdder('')).toEqual('rui-layout')
    expect(prefixAdder('x')).toEqual('rui-layout-x')
    expect(prefixAdder({y:true,z:false})).toEqual('rui-layout-y')
    expect(prefixAdder({y:true,z:true})).toEqual('rui-layout-y rui-layout-z')
    expect(prefixAdder({y:true,z:true},{extra:'red'})).toEqual('rui-layout-y rui-layout-z red')
  })
})
