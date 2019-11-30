import React, { Fragment } from 'react'
import './dialog.scss'
import Icon from '../icon/icon'
interface IProps {
  visible: boolean
  buttons: Array<React.ReactElement>
  onClose: React.MouseEventHandler
  closeOnClickMask?: boolean
}
function prefixFunctionMaker (prefix = '') {
  return function x (name?: string) {
    return [prefix, name].filter(Boolean).join('-')
  }
}
const prefixAdder = prefixFunctionMaker('rui-dialog')
const Dialog: React.FunctionComponent<IProps> = (props) => {
  const onClickClose: React.MouseEventHandler = (e) => {
    props.onClose(e)
  }
  const onClickMask: React.MouseEventHandler = (e) => {
    if (props.closeOnClickMask) {
      props.onClose(e)
    }
  }
  return (
    props.visible ?
      <Fragment>
        <div className={prefixAdder('mask')} onClick={onClickMask}></div>
        <div className={prefixAdder()}>
          <div className={prefixAdder('close')} onClick={onClickClose}>
            <Icon name="close" />
          </div>
          <header className={prefixAdder('header')}>提示</header>
          <main className={prefixAdder('main')}>{props.children}</main>
          <footer className={prefixAdder('footer')}>
            {props.buttons.map((button, index) => React.cloneElement(button, { key: index }))}
          </footer>
        </div>
      </Fragment>
      :
      null
  )
}
Dialog.defaultProps = {
  closeOnClickMask: false
}
export default Dialog