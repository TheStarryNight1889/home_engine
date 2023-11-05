import { Server } from "bun"

class Wss {
    private static instance: Wss
    private wss: Server
    private port: number

    private constructor() {
        this.port = 3001
        this.wss = Bun.serve({
            port: this.port,
            fetch(req, server) {
                // upgrade the request to a WebSocket
                const url = new URL(req.url)
                if (url.pathname === '/ws') {
                    if (server.upgrade(req)) {
                        return new Response("Welcome", { status: 101 });
                        
                    }
                    return new Response('Upgrade failed :(', { status: 500 })
                }
            },
            websocket: {
                open(ws) {
                    console.log('Client connected')
                    ws.subscribe('live-data');
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
        this.wss.publish('live-data', JSON.stringify(data))
    }

    public static getInstance(): Wss {
        if (!Wss.instance) {
            console.log('Creating new WSS instance')
            Wss.instance = new Wss()
            console.log('WSS instance created')
        }
        return Wss.instance
    }
}

export { Wss }
