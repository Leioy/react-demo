import React, { useState } from 'react'
import Form, { FormValue } from './form'
import Validator from './validator'
import Button from '../button/button'

const usernames = ['jack','frankfrank', 'alice', 'bob']
const checkUserName = (username: string, succeed: () => void, fail: () => void) => {
	setTimeout(() => {
		if (usernames.indexOf(username) >= 0) {
			succeed()
		} else {
			fail()
		}
	}, 3000)
}
const FormExample = () => {
	const [formData, setFormData] = useState<FormValue>({
		username: 'frank',
		password: ''
	});
	const [fields] = useState([
		{ name: 'username', label: '用户名', input: { type: 'text' } },
		{ name: 'password', label: '密码', input: { type: 'password' } }
	])
	const [errors, setErrors] = useState({});
	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		const rules = [
			{ key: 'username', required: true },
			{ key: 'username', minLength: 8, maxLength: 16 },
			{
				key: 'username', validator: {
					name:'unique',
					validate (username: string) {
						return new Promise<void>(
							(resolve, reject) => {
							checkUserName(username, resolve, reject)
						})
					}
				}
			},
			{ key: 'username', pattern: /^[A-Za-z0-9]+$/ },
			{ key: 'password', required: true }
		];
		Validator(formData, rules, (errors) => {
			console.log('errors', errors)
			setErrors(errors)
		})
	}
	const transformError = (message:string) => {
		const map: any = {
			unique: '用户名已存在',
		}
		return map[message]
	}
	return (
		<Form value={formData} fields={fields} onSubmit={onSubmit} onChange={(newVal) => setFormData(newVal)}
		      errors={errors}
		      transformError={transformError}
		      buttons={
			      <>
				      <Button type="submit" level="important">提交</Button>
				      <Button type="button">取消</Button>
			      </>
		      }
		/>
	)
}

export default FormExample
