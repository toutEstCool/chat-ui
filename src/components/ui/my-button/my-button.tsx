import { FC } from 'react'
import { ButtonProps } from './button-props'

export const MyButton: FC<ButtonProps> = ({
	children,
	...props
}: ButtonProps) => {
	return (
		<div className='relative'>
			<button
				{...props}
				className='bg-blue-500 text-white rounded-md px-2 py-1'
			>
				{children}
			</button>
		</div>
	)
}
