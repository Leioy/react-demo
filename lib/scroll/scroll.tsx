import * as React from 'react';
import { HTMLAttributes } from 'react';
import './scroll.scss'

interface Props extends HTMLAttributes<HTMLDivElement> {

}

const Scroll: React.FC<Props> = (props) => {
	const { children, ...rest } = props
	return (
		<div className="rui-scroll" {...rest}>
			<div className="rui-scroll-inner">
				{children}
			</div>
		</div>
	)
}
export default Scroll
