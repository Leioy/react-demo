import { FormValue } from './form';

interface FormRule {
	key: string
	required?: boolean
	minLength?: number
	maxLength?: number
	pattern?: RegExp
	validator?: { name: string, validate: (value: string) => Promise<void> }
}

interface OneError {
	message: string
	promise?: Promise<any>
}

type FormRules = Array<FormRule>

function isEmpty (value: any) {
	return value === undefined || value === null || value === ''
}

const Validator = (formValue: FormValue, rules: FormRules, callback: (errors: any) => void) => {
	const errors: any = {}
	const addErrors = (key: string, error: OneError) => {
		if (errors[key] === undefined) {
			errors[key] = []
		}
		errors[key].push(error)
	}
	rules.map(rule => {
		const value = formValue[rule.key]
		if (rule.validator) {
			const promise = rule.validator.validate(value)
			addErrors(rule.key, { message: rule.validator.name, promise })
		}
		if (rule.required && isEmpty(value)) {
			addErrors(rule.key, { message: 'required' })
		}
		if (rule.minLength && (!isEmpty(value) && value!.length < rule.minLength)) {
			addErrors(rule.key, { message: 'minLength' })
		}
		if (rule.maxLength && (!isEmpty(value) && value!.length > rule.maxLength)) {
			addErrors(rule.key, { message: 'maxLength' })
		}
		if (rule.pattern && !(rule.pattern.test(value))) {
			addErrors(rule.key, { message: 'pattern' })
		}
	})
	const x = () => {
		callback(
			fromEntries(
				Object.keys(errors)
					.map(key => [key, errors[key].map((item: OneError) => item.message)])
			)
		)
	}
	Promise.all(
		flat(Object.values(errors))
			.filter(item => item.promise)
			.map(item => item.promise)
	).then(x, x).catch(err => console.log(err))

//	这种写法捕获不了错误
// finally
// 	(() => {
// 		callback(
// 			fromEntries(
// 				Object.keys(errors)
// 					.map(key => [key, errors[key].map((item: OneError) => item.message)])
// 			)
// 		)
// 	})
// }
}
export default Validator

function flat (array: Array<any>) {
	const result = []
	for (let i = 0; i < array.length; i++) {
		if (array[i] instanceof Array) {
			result.push(...array[i])
		} else {
			result.push(array[i])
		}
	}
	return result
}

function fromEntries (array: Array<[string, string[]]>) {
	const result: { [K: string]: string[] } = {}
	for (let i = 0; i < array.length; i++) {
		result[array[i][0]] = array[i][1]
	}
	return result
}
