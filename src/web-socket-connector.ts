export default class WebSocketConnector {
	private connection?: WebSocket

	getConnection(url: string) {
		if (!this.connection) {
			this.connection = new WebSocket(url)
		}
		return this.connection as WebSocket
	}
}
