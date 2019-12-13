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
	transformError?: (message: string) => string
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
	const transformError = (message: string) => {
		const map: any = {
			required: '必填',
			minLength: '太短',
			maxLength: '太长'
		}
		return props.transformError && props.transformError(message) || map[message] || '未知错误'
	}
	return (
		<form onSubmit={onSubmit}>
			<table className="rui-form-table">
				<tbody>
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
									(props.errorsMode === 'first' ?
										transformError(props.errors[f.name][0]) :
										props.errors[f.name].map(transformError).join('，')) :
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
				</tbody>
			</table>
		</form>
	)
}
Form.defaultProps = {
	errorsMode: 'first'
}

export default Form
