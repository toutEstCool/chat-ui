import { useEffect, useRef, useState } from 'react'
import { DialogBox } from './components/dialog-box/dialog-box'
import { SideBar } from './components/sidebar/sidebar'
import { LogIn } from './page/log-in/log-in'
import WebSocketConnector from './web-socket-connector'

export type Client = {
	connectionId: string
	nickname: string
}

const webSocketConnector = new WebSocketConnector()

function App() {
	const [nickname, setNickname] = useState(
		window.localStorage.getItem('nickname') || ''
	)

	const [clients, setClients] = useState<Client[]>([])
	const [targetNicknameValue, setTargetNicknameValue] = useState('')

	useEffect(() => {
		window.localStorage.setItem('nickname', nickname)
	})

	const webSocketConnectorRef = useRef(webSocketConnector)

	if (nickname === '') {
		return <LogIn setNickname={setNickname} />
	}

	const url = `wss://8fhov3ofhi.execute-api.us-east-1.amazonaws.com/dev?nickname=${nickname}`
	const ws = webSocketConnectorRef.current.getConnection(url)

	ws.onopen = () => {
		ws.send(
			JSON.stringify({
				action: 'getClients',
			})
		)
	}

	ws.onmessage = e => {
		const message = JSON.parse(e.data) as {
			type: string
			value: unknown
		}

		console.log(message)

		if (message.type === 'clients') {
			setClients((message.value as { clients: Client[] }).clients)
		}
	}

	const setTargetNickname = (nickname: string) => {
		ws.send(
			JSON.stringify({
				action: 'getMessages',
				targetNickname: nickname,
				limit: 1000,
			})
		)
		setTargetNicknameValue(nickname)
	}

	return (
		<div className='flex'>
			<div className='flex-none w-20 md:w-40 border-r-2'>
				<SideBar clients={clients} setTargetNickname={setTargetNickname} />
			</div>
			<div className='flex-auto'>
				<DialogBox />
			</div>
		</div>
	)
}

export default App
