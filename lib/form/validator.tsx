import { FormValue } from './form';

interface FormRule {
	key: string
	required?: boolean
	minLength?: number
	maxLength?: number
	pattern?: RegExp
	validator?: (value: string) => Promise<string>
}

type  OneError = string | Promise<string>

type FormRules = Array<FormRule>

function isEmpty (value: any) {
	return value === undefined || value === null || value === ''
}

const Validator = (formValue: FormValue, rules: FormRules, callback: (errors: any) => void) => {
	const errors: { [K: string]: OneError[] } = {}
	const addErrors = (key: string, error: OneError) => {
		if (errors[key] === undefined) {
			errors[key] = []
		}
		errors[key].push(error)
	}
	rules.map(rule => {
		const value = formValue[rule.key]
		if (rule.validator) {
			const promise = rule.validator(value)
			addErrors(rule.key, promise)
		}
		if (rule.required && isEmpty(value)) {
			addErrors(rule.key, 'required')
		}
		if (rule.minLength && (!isEmpty(value) && value!.length < rule.minLength)) {
			addErrors(rule.key, 'minLength')
		}
		if (rule.maxLength && (!isEmpty(value) && value!.length > rule.maxLength)) {
			addErrors(rule.key, 'maxLength')
		}
		if (rule.pattern && !(rule.pattern.test(value))) {
			addErrors(rule.key, 'pattern')
		}
	})
	const flattenErrors = flat(Object.keys(errors).map(key => errors[key].map<[string, OneError]>(promiseOrString => [key, promiseOrString])))
	const newPromises = flattenErrors.map(([key, promiseOrString]) => (
			promiseOrString instanceof Promise ? promiseOrString : Promise.reject(promiseOrString)
		).then<[string, undefined], [string, string]>(() => [key, undefined], (reason) => [key, reason])
	)
	
	function hasError (item: [string, undefined] | [string, string]): item is [string, string] {
		return typeof item[1] === 'string'
	}
	
	Promise.all(newPromises).then(results => {
		callback(zip(results.filter<[string, string]>(hasError)))
	})
}
export default Validator

// kvList = [['username','e1'], ['username','e2 ']]
function zip (kvList: Array<[string, string]>) {
	const result: { [K: string]: string[] } = {}
	kvList.map(([key, value]) => {
		result[key] = result[key] || []
		result[key].push(value)
	})
	return result
}

function flat<T> (array: Array<T | T[]>) {
	const result: T[] = []
	for (let i = 0; i < array.length; i++) {
		if (array[i] instanceof Array) {
			result.push(...array[i] as T[])
		} else {
			result.push(array[i] as T)
		}
	}
	return result
}
