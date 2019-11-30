import React, { useState } from 'react'
import Dialog, { alert, confirm, modal } from './dialog'
export default function () {
  const [x, setX] = useState(false)
  const [y, setY] = useState(false)
  const onClickModal = () => {
    const close = modal(
      <div>
        <h1>你好</h1>
        <button onClick={() => { close() }}>close</button>
      </div>
    )
  }
  return (
    <div>
      <div>
        example3
        <button onClick={() => { alert('1') }}>click</button>
        <button onClick={() => { confirm('1', () => { console.log('yes') }, () => { console.log('no') }) }}>click</button>
        <button onClick={onClickModal}>click</button>
      </div>
      <div>
        example1
        <button onClick={() => { setX(!x) }}>click</button>
        <Dialog visible={x} buttons={
          [
            <button onClick={() => { setX(false) }}>1</button>,
            <button onClick={() => { setX(false) }}>2</button>
          ]
        }
          onClose={() => { setX(false) }}
        >
          <div>hi</div>
        </Dialog>
      </div>
      <div>
        example2
        <button onClick={() => { setY(!y) }}>click</button>
        <Dialog closeOnClickMask={true} visible={y} buttons={
          [
            <button onClick={() => { setY(false) }}>1</button>,
            <button onClick={() => { setY(false) }}>2</button>
          ]
        }
          onClose={() => { setY(false) }}
        >
          <div>hi</div>
        </Dialog>
      </div>
    </div>
  )
}