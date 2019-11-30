import React, { Fragment } from 'react'
import './dialog.scss'
import Icon from '../icon/icon'
import ReactDOM from 'react-dom'
interface IProps {
  visible: boolean
  buttons?: Array<React.ReactElement>
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
  const x = props.visible ?
    <Fragment>
      <div className={prefixAdder('mask')} onClick={onClickMask}></div>
      <div className={prefixAdder()}>
        <div className={prefixAdder('close')} onClick={onClickClose}>
          <Icon name="close" />
        </div>
        <header className={prefixAdder('header')}>提示</header>
        <main className={prefixAdder('main')}>{props.children}</main>
        {props.buttons && props.buttons.length > 1 &&
          <footer className={prefixAdder('footer')}>
            {props.buttons && props.buttons.map((button, index) => React.cloneElement(button, { key: index }))}
          </footer>
        }

      </div>
    </Fragment>
    :
    null
  return (
    ReactDOM.createPortal(x, document.body)
  )
}
Dialog.defaultProps = {
  closeOnClickMask: false
}

const alert = (content: string) => {
  const onClose = () => {
    ReactDOM.render(React.cloneElement(component, { visible: false }), div)
    ReactDOM.unmountComponentAtNode(div)
    div.remove()
  }
  const component = <Dialog visible={true} onClose={onClose} buttons={[<button onClick={onClose}>ok</button>]} >{content}</Dialog>
  const div = document.createElement('div')
  document.body.append(div)
  ReactDOM.render(component, div)
}

const confirm = (content: string, yes?: () => void, no?: () => void) => {
  const onYes = () => {
    ReactDOM.render(React.cloneElement(component, { visible: false }), div)
    ReactDOM.unmountComponentAtNode(div)
    div.remove()
    yes && yes()
  }
  const onNo = () => {
    ReactDOM.render(React.cloneElement(component, { visible: false }), div)
    ReactDOM.unmountComponentAtNode(div)
    div.remove()
    no && no()
  }
  const component = (
    <Dialog visible={true}
      onClose={onNo}
      buttons={[<button onClick={onYes}>yes</button>, <button onClick={onNo}>no</button>]}
    >
      {content}
    </Dialog>
  )
  const div = document.createElement('div')
  document.body.append(div)
  ReactDOM.render(component, div)
}
const modal = (content: React.ReactNode | React.ReactFragment) => {
  const onClose = () => {
    ReactDOM.render(React.cloneElement(component, { visible: false }), div)
    ReactDOM.unmountComponentAtNode(div)
    div.remove()
  }
  const component = (
    <Dialog visible={true} onClose={onClose}>{content}</Dialog>
  )
  const div = document.createElement('div')
  document.body.append(div)
  ReactDOM.render(component, div)
  return onClose
}
export { alert, confirm, modal }
export default Dialog