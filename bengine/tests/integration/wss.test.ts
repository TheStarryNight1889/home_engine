import { expect, test } from 'bun:test'

test('A client can connect to the server', async () => {
    const client = await new WebSocket('ws://localhost:3001/ws')
    // should receive a welcome message
    const message = await new Promise((resolve) => {
        client.onmessage = (event) => {
            resolve(event.data)
        }
    })
    expect(message).toBe('Welcome!')
    client.close()
})