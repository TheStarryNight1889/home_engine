import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getSensorAir } from '../api/bengine'

export const useAirsStore = defineStore('airs', () => {
  const all = ref([])
  const latest = ref({})

  const setAll = async (deviceId, startTime) => {
    all.value = await getSensorAir(deviceId, startTime)
  }
  const setLatest = (data) => {
    latest.value[data.device_id] = data
    console.log(latest.value)
  }
  const getLatestAirs = () => {
    return latest.value
  }
  return { all, latest, setAll, setLatest, getLatestAirs }
})
