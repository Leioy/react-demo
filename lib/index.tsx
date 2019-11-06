import React from 'react'
import ReactDOM from 'react-dom'
import Icon from './icon/icon'

const fn: React.MouseEventHandler = (e) => {
  console.log(e.target)
}
ReactDOM.render(<div>
  <Icon className="icon" name="wechat" onClick={fn} onMouseEnter={() => console.log('enter')} />
</div>, document.querySelector('#root'))