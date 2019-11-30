import React, { Fragment } from 'react'
import './dialog.scss'
import Icon from '../icon/icon'
interface IProps {
  visible: boolean
}
function prefixFunctionMaker (prefix = '') {
  return function x (name?: string) {
    return [prefix, name].filter(Boolean).join('-')
  }
}
const prefixAdder = prefixFunctionMaker('rui-dialog')
const Dialog: React.FunctionComponent<IProps> = (props) => {
  return (
    props.visible ?
      <Fragment>
        <div className={prefixAdder('mask')}></div>
        <div className={prefixAdder()}>
          <div className={prefixAdder('close')}>
            <Icon name="close" />
          </div>
          <header className={prefixAdder('header')}>提示</header>
          <main className={prefixAdder('main')}>{props.children}</main>
          <footer className={prefixAdder('footer')}>
            <button>ok</button>
            <button>cancel</button>
          </footer>
        </div>
      </Fragment>
      :
      null
  )
}
export default Dialog