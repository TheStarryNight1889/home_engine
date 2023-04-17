<template>
    <div class="grid grid-cols-3 gap-2 m-2">
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <div class="card-actions justify-end">
                    <div class="tooltip" data-tip="Connected">
                        <div class="badge badge-accent"></div>
                    </div>
                </div>
                <h2 class="card-title">Air Sensor 1</h2>
                <p class="text-gray-400 text-sm">Bedroom . Sensor/Air . XmQ22y3d</p>
                <p>3000PPM co2</p>
                <p>37% Hum.</p>
                <p>22.5°c Temp.</p>
            </div>
        </div>
    </div>
</template>

<script>

// import websocket
import WebSocket from 'ws'
// subscribe to ws server on localhost:3000
const ws = new WebSocket('ws://localhost:3000/ws')
ws.onopen = () => {
    console.log('connected')
}
ws.onmessage = (msg) => {
    console.log(msg)
}
ws.onclose = () => {
    console.log('disconnected')
}

export default {
    name: 'Index',
    data() {
        return {
            ws: ws
        }
    }
}
</script>