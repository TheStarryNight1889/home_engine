import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAirsStore = defineStore('airs', () => {
  const data = ref({
    "time": 1634567890000,
    "device_id": "device123",
    "location_id": "location456",
    "data": {
      "temperature": 21.5,
      "humidity": 55.3,
      "co2": 400.2
    }
  })

  return { data }
})
