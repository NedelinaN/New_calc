import React from 'react'
import { Scrollbar } from 'react-scrollbars-custom'

const ScrollContainer = props => <Scrollbar style={{ width: '100%', height: '100%' }}>{props.children}</Scrollbar>

export default ScrollContainer
