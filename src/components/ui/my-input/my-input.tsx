import { FC } from 'react'
import { InputProps } from './input-props'

export const MyInput: FC<InputProps> = ({
	type,
	placeholder,
	value,
	...props
}: InputProps) => {
	return (
		<div className='divide-y divide-gray-200'>
			<div className='py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7'>
				<div className='relative'>
					<input
						autoComplete='off'
						id='email'
						name='email'
						value={value}
						type={type}
						placeholder={placeholder}
						{...props}
					/>
					<label
						htmlFor='email'
						className='absolute left-0 bottom-14 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'
					>
						Ваше имя
					</label>
				</div>
				{/* Button */}
			</div>
		</div>
	)
}
