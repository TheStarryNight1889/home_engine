import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getSensorAir } from '../api/bengine'

export const useAirsStore = defineStore('airs', () => {
  const all = ref([])
  const latest = ref({})

  const setAll = async (deviceId, startTime) => {
    all.value = await getSensorAir(deviceId, startTime)
    console.log(all.value)
  }
  const setLatest = (data) => {
    latest.value = data
    console.log(latest.value)
  }
  return { all, latest, setAll, setLatest }
})
