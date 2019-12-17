import * as React from 'react';
import { HTMLAttributes, UIEventHandler, useEffect, useRef, useState } from 'react';
import './scroll.scss'
import scrollbarWidth from './scrollbar-width';

interface Props extends HTMLAttributes<HTMLDivElement> {

}

const Scroll: React.FC<Props> = (props) => {
	const { children, ...rest } = props
	const [barHeight, setBarHeight] = useState(0)
	const containerRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		const scrollHeight = containerRef.current!.scrollHeight
		const viewHeight = containerRef.current!.getBoundingClientRect().height
		setBarHeight(viewHeight * viewHeight / scrollHeight)
	}, [])
	const onScroll: UIEventHandler = (e) => {
	}
	return (
		<div className="rui-scroll" {...rest}>
			<div className="rui-scroll-inner" style={{ right: -scrollbarWidth() }}
			     ref={containerRef}
			     onScroll={onScroll}>
				{children}
			</div>
			<div className="rui-scroll-track">
				<div className="rui-scroll-bar" style={{ height: barHeight }}/>
			</div>
		</div>
	)
}
export default Scroll
