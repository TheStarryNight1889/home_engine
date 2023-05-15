// useWebSocket.js
import { ref, watchEffect } from 'vue'
import { useAirsStore } from '@/stores/airs'

export function useWs(url) {
  const socket = ref(null)
  const error = ref(null)
  const airStore = useAirsStore();

  watchEffect(() => {
    socket.value = new WebSocket(url)

    socket.value.onmessage = (event) => {
      const message = JSON.parse(event.data)

      // Dispatch a Vuex action or commit a mutation depending on the message type
      if (message.type === 'messageType1') {
        airStore.data = message.data
      } else{
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
