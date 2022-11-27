import { useState } from 'react'
import { MyButton } from '../../components/ui/my-button/my-button'
import { MyInput } from '../../components/ui/my-input/my-input'

export const LogIn = ({
	setNickname,
}: {
	setNickname: (nickname: string) => void
}) => {
	const [errorMessage, setErrorMessage] = useState('')
	const [nicknameValue, setNicknameValue] = useState('')

	return (
		<div className='p-5 min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12'>
			<div className='relative py-3 sm:max-w-xl sm:mx-auto'>
				<div className='absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl'></div>
				<div className='relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20'>
					<div className='max-w-md mx-auto'>
						<div>
							<h1 className='text-2xl font-semibold'>
								Присоединяйтесь и общайтесь в чате
							</h1>
						</div>
						{/* Input */}
						<MyInput
							type='text'
							value={nicknameValue}
							placeholder='Введите ваш псевдоним'
							onChange={e => setNicknameValue(e.target.value)}
						/>
						{errorMessage !== '' ? (
							<span className='animate-bounce mb-5 block text-red-500 font-medium text-xs'>
								{errorMessage} 🥺
							</span>
						) : (
							''
						)}
						<MyButton
							onClick={() =>
								nicknameValue === ''
									? setErrorMessage('Псевдоним должен быть заполнен')
									: setNickname(nicknameValue)
							}
						>
							Присоединяйтесь
						</MyButton>
					</div>
				</div>
			</div>
		</div>
	)
}
