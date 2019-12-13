import React, { ChangeEvent, ReactFragment } from 'react'
import Input from './input/input';
import './form.scss'

export interface FormValue {
	[K: string]: any
}

interface Props {
	value: FormValue
	fields: Array<{ name: string, label: string, input: { type: string } }>
	buttons: ReactFragment
	onSubmit: React.FormEventHandler<HTMLFormElement>
	onChange: (value: FormValue) => void
	errors: { [K: string]: string[] }
	errorsMode?: 'first' | 'all'
}

const Form: React.FC<Props> = (props) => {
	const formData = props.value
	const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault()
		props.onSubmit(e)
	}
	const onInputChange = (name: string, e: ChangeEvent<HTMLInputElement>) => {
		const newFormData = { ...formData, [name]: e.target.value }
		props.onChange(newFormData)
	}
	return (
		<form onSubmit={onSubmit}>
			<table className="rui-form-table">
				{props.fields.map(f =>
					<tr className="rui-form-tr" key={f.name}>
						<td className="rui-form-td">
							<span className="rui-form-label">{f.label}</span>
						</td>
						<td className="rui-form-td">
							<Input type={f.input.type} value={formData[f.name]}
								//      onChange={(e) => onInputChange(f.name, e.target.value)}
								     onChange={onInputChange.bind(null, f.name)}
							/>
							<div className="rui-form-error">{
								props.errors[f.name] ?
									(props.errorsMode === 'first' ? props.errors[f.name][0] : props.errors[f.name].join('，')) :
									<span>&nbsp;</span>
							}</div>
						</td>
					</tr>
				)}
				<tr className="rui-form-tr">
					<td className="rui-form-td"/>
					<td className="rui-form-td">
						{props.buttons}
					</td>
				</tr>
			</table>
		</form>
	)
}
Form.defaultProps = {
	errorsMode: 'first'
}

export default Form
