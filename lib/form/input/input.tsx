import * as React from 'react';
import {InputHTMLAttributes} from 'react';
import {prefixFunctionMaker} from '../../helpers/classes';
import './input.scss'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
}

const prefixAdder = prefixFunctionMaker('rui-input')
const Input: React.FC<Props> = (props) => {
	const {className, ...rest} = props
	return (
		<input className={prefixAdder('', {extra: className})} {...rest}/>
	)
}
export default Input
