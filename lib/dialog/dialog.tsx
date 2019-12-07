import React, { Fragment, ReactNode, ReactElement } from 'react'
import './dialog.scss'
import Icon from '../icon/icon'
import ReactDOM from 'react-dom'
import { prefixFunctionMaker } from '../helpers/classes'
interface IProps {
  visible: boolean
  buttons?: Array<ReactElement>
  onClose: React.MouseEventHandler
  closeOnClickMask?: boolean
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
  const component = props.visible ?
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
    ReactDOM.createPortal(component, document.body)
  )
}
Dialog.defaultProps = {
  closeOnClickMask: false
}

const modal = (content: ReactNode, buttons?: Array<ReactElement>, afterClose?: () => void) => {
  const onClose = () => {
    ReactDOM.render(React.cloneElement(component, { visible: false }), div)
    ReactDOM.unmountComponentAtNode(div)
    div.remove()
  }
  const component = <Dialog visible={true} onClose={() => { onClose(); afterClose && afterClose() }} buttons={buttons} >{content}</Dialog>
  const div = document.createElement('div')
  document.body.append(div)
  ReactDOM.render(component, div)
  return onClose
}
const alert = (content: string) => {
  const button = <button onClick={() => { close() }}>ok</button>
  const close = modal(content, [button])
}

const confirm = (content: string, yes?: () => void, no?: () => void) => {
  const onYes = () => {
    close()
    yes && yes()
  }
  const onNo = () => {
    close()
    no && no()
  }
  const buttons = [<button onClick={onYes}>yes</button>, <button onClick={onNo}>no</button>]
  const close = modal(content, buttons, no)
}
export { alert, confirm, modal }
export default Dialog