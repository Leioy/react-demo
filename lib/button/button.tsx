import * as React from 'react';
import {ButtonHTMLAttributes} from 'react';
import './button.scss'
import classes from '../helpers/classes';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	level?: 'important' | 'danger' | 'normal'
}

const Button: React.FC<Props> = (props) => {
	const {className, children, level, ...rest} = props
	return <button className={classes('rui-button', `rui-button-${level}`, className)} {...rest}>{children}</button>
}
Button.defaultProps = {
	level: 'normal'
}
export default Button
