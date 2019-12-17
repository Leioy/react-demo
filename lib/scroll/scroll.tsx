import * as React from 'react';
import { HTMLAttributes, UIEventHandler, useEffect, useRef, useState } from 'react';
import './scroll.scss'
import scrollbarWidth from './scrollbar-width';
import { MouseEventHandler } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {

}

const Scroll: React.FC<Props> = (props) => {
	const { children, ...rest } = props
	const [barHeight, setBarHeight] = useState(0)
	const [barTop, _setBarTop] = useState(0)
	const setBarTop = (number: number) => {
		if (number < 0) {return}
		const scrollHeight = containerRef.current!.scrollHeight
		const viewHeight = containerRef.current!.getBoundingClientRect().height
		const maxBarTop = (scrollHeight - viewHeight) * viewHeight / scrollHeight
		if (number > maxBarTop) {return}
		_setBarTop(number)
	}
	const containerRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		const scrollHeight = containerRef.current!.scrollHeight
		const viewHeight = containerRef.current!.getBoundingClientRect().height
		setBarHeight(viewHeight * viewHeight / scrollHeight)
	}, [])
	const onScroll: UIEventHandler = () => {
		const scrollHeight = containerRef.current!.scrollHeight
		const viewHeight = containerRef.current!.getBoundingClientRect().height
		const scrollTop = containerRef.current!.scrollTop
		setBarTop(scrollTop * viewHeight / scrollHeight)
	}
	const draggingRef = useRef(false)
	const firstYRef = useRef(0)
	const firstBarTopRef = useRef(0)
	const onMouseDownBar: MouseEventHandler = (e) => {
		draggingRef.current = true
		firstYRef.current = e.clientY
		firstBarTopRef.current = barTop
		console.log(e.clientY)
	}
	const onMouseMoveBar = (e: MouseEvent) => {
		if (draggingRef.current) {
			const deltaY = e.clientY - firstYRef.current
			setBarTop(firstBarTopRef.current + deltaY)
		}
	}
	const onMouseUpBar = () => {
		draggingRef.current = false
	}
	useEffect(() => {
		document.addEventListener('mouseup', onMouseUpBar)
		document.addEventListener('mousemove', onMouseMoveBar)
		return () =>{
			document.removeEventListener('mouseup',onMouseUpBar)
			document.removeEventListener('mousemove',onMouseMoveBar)
		}
	}, [])
	return (
		<div className="rui-scroll" {...rest}>
			<div className="rui-scroll-inner" style={{ right: -scrollbarWidth() }}
			     ref={containerRef}
			     onScroll={onScroll}>
				{children}
			</div>
			<div className="rui-scroll-track">
				<div className="rui-scroll-bar" style={{ height: barHeight, transform: `translateY(${barTop}px)` }}
				     onMouseDown={onMouseDownBar}
				/>
			</div>
		</div>
	)
}
export default Scroll
