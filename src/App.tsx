import { useEffect, useRef, useState } from 'react'
import { DialogBox } from './components/dialog-box/dialog-box'
import { SideBar } from './components/sidebar/sidebar'
import { LogIn } from './page/log-in/log-in'
import WebSocketConnector from './web-socket-connector'

type Client = {
	connectionId: string
	nickname: string
}

const webSocketConnector = new WebSocketConnector()

function App() {
	const [nickname, setNickname] = useState(
		window.localStorage.getItem('nickname') || ''
	)

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
			value: {
				clients: Client[]
			}
		}
	}

	return (
		<div className='flex'>
			<div className='flex-none w-16 md:w-20 border-r-2'>
				<SideBar />
			</div>
			<div className='flex-auto'>
				<DialogBox />
			</div>
		</div>
	)
}

export default App
