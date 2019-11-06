import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import React from 'react'
import Icon from '../icon'
describe('icon', () => {
  it('render successfully', () => {
    const json = renderer.create(<Icon name="alipay" />).toJSON()
    expect(json).toMatchSnapshot()
  })
  it('click', () => {
    const fn = jest.fn()
    const c = mount(<Icon name="alipay" onClick={fn} />)
    c.find('svg').simulate('click')
    expect(fn).toBeCalled()
  })
})