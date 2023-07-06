import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getSensorAir } from '../api/transporter'

export const useAirsStore = defineStore('airs', () => {
  const all = ref([])
  const latest = ref({})

  const setAll = async (deviceId) => {
    all.value = await getSensorAir(deviceId)
    console.log(all.value)
  }
  const setLatest = (data) => {
    latest.value = data
    console.log(latest.value)
  }
  return { all, latest, setAll, setLatest }
})
