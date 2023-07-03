import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getSensorAir } from '../api/transporter'

export const useAirsStore = defineStore('airs', () => {
  const list = ref([])
  const latest = ref({})

  const setList = async (deviceId) => {
    list.value = await getSensorAir(deviceId)
    console.log(list.value)
  }
  const setLatest = (data) => {
    latest.value = data
    console.log(latest.value)
  }
  return { list, latest, setList, setLatest }
})
