import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

export interface InputProps
	extends DetailedHTMLProps<
		InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	value: string
	type: string
	placeholder: string
}
