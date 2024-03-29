// useWebSocket.js
import { ref, watchEffect } from 'vue'
import { useAirsStore } from '@/stores/airs'
import { useDevicesStore } from '@/stores/devices'

export function useWs(url) {
  const socket = ref(null)
  const error = ref(null)
  const airStore = useAirsStore();
  const deviceStore = useDevicesStore();

  watchEffect(() => {
    socket.value = new WebSocket(url)

    //////// definetly need to refactor this ////////
    socket.value.onmessage = (event) => {
      const message = JSON.parse(event.data)

      if (message.topic === 'sensor-air') {
        airStore.setLatest(message.data)
      } else if (message.topic === 'device') {
        console.log('device', message.data)
        deviceStore.updateDevice(message.data)
      }
      else{
        console.log(`[useWs] message type not found: ${message.type}`)
      }
    }

    socket.value.onerror = (event) => {
      error.value = event
    }
  })

  return {
    error,
  }
}
