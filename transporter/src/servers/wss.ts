import * as WebSocket from "ws";
class Wss {
    private static instance: Wss;
    private wss: WebSocket.Server;
    private port: number;
    private clients: WebSocket[] = [];
    constructor(port: number) {
        this.port = port;
        this.wss = new WebSocket.Server({ port: this.port, path: "/ws" });
        console.log("WSS started on port", this.port);
    }
    public send(data: any) {
        this.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    }
    public start(){
        try {
            console.log("Starting WSS");
            this.acceptConnections();
        } catch (err) {
            console.error('Error starting WSS',err);
        }
    }
    private acceptConnections() {
        this.wss.on("connection", (ws: WebSocket) => {
            this.clients.push(ws);
            console.log("Client connected");
            ws.on("close", () => {
                console.log("Client disconnected");
            });
        });
    }
    public static getInstance(): Wss {
        return Wss.instance;
    }
}

export { Wss };