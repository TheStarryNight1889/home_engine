import { expect, test } from 'bun:test'

test('[INTEGRATION] [CONTROLLER] GET /airs no device id', async () => {
    const res = await fetch('http://localhost:3000/airs')
    expect(res.status).toBe(400)
})

test('[INTEGRATION] [CONTROLLER] GET /airs with device id', async () => {
    const res = await fetch('http://localhost:3000/airs?deviceId=1b')
    expect(res.status).toBe(200)
    const airs = await res.json()
    expect(airs).toEqual([])
})

