class Wss {
    private static instance: Wss
    private wss: any
    private port: number

    private constructor() {
        this.port = 3001
        this.wss = Bun.serve({
            port: this.port,
            fetch(req, server) {
                // upgrade the request to a WebSocket
                const url = new URL(req.url)
                if (url.pathname === '/chat') {
                    if (server.upgrade(req)) {
                        return new Response(null, { status: 101 });
                        
                    }
                    return new Response('Upgrade failed :(', { status: 500 })
                }
            },
            websocket: {
                open(ws) {
                    console.log('Client connected')
                },
                message(ws, message) {
                    console.log('Message received:', message)
                },
                close(ws) {
                    console.log('Client disconnected')
                },
            },
        })
    }
    public send(data: any) {
        this.wss.send(JSON.stringify(data))
    }

    public static getInstance(): Wss {
        if (!Wss.instance) {
            console.log('Creating new WSS instance')
            Wss.instance = new Wss()
        }
        return Wss.instance
    }
}

export { Wss }
