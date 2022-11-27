import React, { useState } from 'react'
import { MyButton } from '../ui/my-button/my-button'
import { MyInput } from '../ui/my-input/my-input'

export default function Welcome({
	setNickname,
}: {
	setNickname: (nickname: string) => void
}) {
	const [nicknameValue, setNicknameValue] = useState('')
	const [error, setError] = useState('')

	return (
		<section className='flex justify-center items-center h-screen bg-gray-100'>
			<div className='max-w-md w-full bg-white rounded p-6 space-y-4'>
				<div className='mb-4'>
					<p className='text-gray-600'>Войдите в систему</p>
					<h2 className='text-xl font-bold'>Присоединиться к Чату</h2>
				</div>
				<div>
					<MyInput
						className={`w-full p-4 text-sm bg-gray-50 focus:outline-none border rounded text-gray-600 ${
							error !== '' ? 'border-red-500' : 'border-gray-200'
						}`}
						type='text'
						placeholder='Псевдоним'
						value={nicknameValue}
						onChange={e => setNicknameValue(e.target.value)}
					/>

					{error !== '' ? (
						<span className='font-medium tracking-wide text-red-500 text-xs mt-1 ml-1'>
							{error}
						</span>
					) : (
						''
					)}
				</div>
				<div>
					<MyButton
						onClick={() => {
							if (nicknameValue === '') {
								setError('Заполните ваш псевдоним')
								return
							}
							setNickname(nicknameValue)
						}}
						className='w-full py-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200'
					>
						Войти
					</MyButton>
				</div>
			</div>
		</section>
	)
}
