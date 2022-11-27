import { Client } from '../../App'

export const SideBar = ({
	clients,
}: {
	clients: Client[]
	setTargetNickname: (nickname: string) => void
}) => {
	return (
		<div className='flex flex-col'>
			<div className='flex justify-center mt-7 mb-5'>
				<img
					src='https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144'
					alt=''
					className='w-7 sm:w-6 h-7 sm:h-6 rounded-full mr-2'
				/>
				<span className='font-medium invisible md:visible w-0 md:w-auto'>
					Чат
				</span>
			</div>
			{clients.map(client => (
				<button onClick={() => setTargetNickname(client.nickname)}>
					<div className='flex flex-col items-center md:items-start m-3'>
						<div className='flex items-center mb-3'>
							<img
								src='https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144'
								alt=''
								className='w-8 sm:w-10 h-8 sm:h-10 rounded-full mr-1.5'
							/>
							<span className='text-sm leading-8 invisible md:visible w-0 md:w-auto'>
								{client.nickname}
							</span>
						</div>
					</div>
				</button>
			))}
		</div>
	)
}
function setTargetNickname(nickname: string): void {
	throw new Error('Function not implemented.')
}
