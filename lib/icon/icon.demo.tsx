import React from 'react'
import Demo from '../../demo'
import IconExample from './icon.example'

export default () => {
  return (
    <Demo code={require('!!raw-loader!./icon.example.tsx').default}>
      <IconExample></IconExample>
    </Demo>
  )
}