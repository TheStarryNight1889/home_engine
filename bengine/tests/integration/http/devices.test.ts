import { expect, test } from 'bun:test'

test('[INTEGRATION] [CONTROLLER] GET /devices', async () => {
    const res = await fetch('http://localhost:3000/devices')
    expect(res.status).toBe(200)
    const devices = await res.json()
    expect(devices).toEqual([])
})


