const WebSocket = new require('ws')

function config(server) {
  const wss = new WebSocket.Server({ server })
  let connections = []
  
  wss.on('connection', (ws, request, client) => {
    ws.on('message', (message) => {
      const parsedMessage = JSON.parse(message)

      if (parsedMessage.type === "initial") {
        connections.push({
          id: parsedMessage.userID,
          socket: ws
        })
      }
      
      if (parsedMessage.type === "songRequest")  {
        const soundroom = connections.find(connection => (
          connection.id === parsedMessage.targetID)
        )
        soundroom.socket.send(JSON.stringify({ song: parsedMessage.song }))
      }
    })
    
    ws.on('close', () => {
      connections = connections.filter(connection => connection.socket !== ws)
    })
  })

  return wss
}

module.exports = {
  config
}