import React, { useEffect, useRef, useState } from 'react'
import { MessageItem } from '../messageItem'
import './conversation.css'

export default function Conversation({
	target,
	messages,
	sendMessage,
}: {
	target: string
	messages: MessageItem[]
	sendMessage: (value: string) => void
}) {
	const [message, setMessage] = useState<string>('')
	const messagesEndRef = useRef<null | HTMLDivElement>(null)

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	useEffect(() => {
		scrollToBottom()
	})

	const messagesGroupedBySender = messages.reduce((prev, curr) => {
		if (prev.length > 0 && curr.sender === prev[prev.length - 1].sender) {
			prev[prev.length - 1].messages.push(curr.message)
			return prev
		} else {
			return [
				...prev,
				{
					sender: curr.sender,
					messages: [curr.message],
				},
			]
		}
	}, [] as { sender: string; messages: string[] }[])

	const submit = () => {
		setMessage('')
		sendMessage(message)
		scrollToBottom()
	}

	return (
		<div className='flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen'>
			<div className='flex sm:items-center justify-between py-3 border-b-2 border-gray-200'>
				<div className='flex items-center space-x-4'>
					<img
						src={`avatar/nickname.avif`}
						alt=''
						className='w-10 sm:w-16 h-10 sm:h-16 rounded-full'
					/>
					<div className='flex flex-col leading-tight'>
						<div className='text-2xl mt-1 flex items-center'>
							<span className='text-gray-700 mr-3'>{target}</span>
							<span className='text-green-500'>
								<svg width='10' height='10'>
									<circle cx='5' cy='5' r='5' fill='currentColor'></circle>
								</svg>
							</span>
						</div>
					</div>
				</div>
			</div>
			<div
				id='messages'
				className='flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch h-screen'
			>
				{messages.length > 0 ? (
					<>
						{messagesGroupedBySender.map((group, key) => (
							<div key={key} className='chat-message'>
								<div
									className={`flex items-end${
										group.sender === target ? '' : ' justify-end'
									}`}
								>
									<div
										className={`flex flex-col space-y-2 text-xs max-w-xs mx-2 ${
											group.sender === target
												? 'order-2 items-start'
												: 'order-1 items-end'
										}`}
									>
										{group.messages.map((message, key) => (
											<div key={key}>
												<span
													className={`px-4 py-2 rounded-lg inline-block ${
														group.sender === target
															? 'rounded-bl-none bg-gray-300 text-gray-600'
															: 'rounded-br-none bg-blue-600 text-white'
													}`}
												>
													{message}
												</span>
											</div>
										))}
									</div>
									<img
										src={`avatar/nickname.avif`}
										alt='My profile'
										className={`w-6 h-6 rounded-full order-${
											group.sender === target ? 1 : 2
										}`}
									/>
								</div>
							</div>
						))}
						<div ref={messagesEndRef}></div>
					</>
				) : (
					<div className='chat-message flex justify-center'>
						<span className='px-4 py-2 inline-block'>
							Сообщений пока нет 🧐
						</span>
					</div>
				)}
			</div>
			<div className='border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0'>
				<div className='relative flex'>
					<span className='absolute inset-y-0 flex items-center'>
						<button
							type='button'
							className='inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								className='h-6 w-6 text-gray-600'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z'
								></path>
							</svg>
						</button>
					</span>
					<input
						type='text'
						placeholder='Напишите что-нибудь'
						value={message}
						onChange={e => setMessage(e.target.value)}
						onKeyPress={e => (e.key === 'Enter' ? submit() : null)}
						className='w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-full py-3'
					/>
					<div className='absolute right-0 items-center inset-y-0 hidden sm:flex'>
						<button
							type='button'
							className='inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none'
							onClick={() => submit()}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 20 20'
								fill='currentColor'
								className='h-6 w-6 transform rotate-90'
							>
								<path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z'></path>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
