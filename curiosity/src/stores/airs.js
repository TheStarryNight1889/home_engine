import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getSensorAir } from '../api/transporter'

export const useAirsStore = defineStore('airs', () => {
  const list = ref([])
  const latest = ref({})

  const setList = async () => {
    list.value = await getSensorAir()
  }
  const setLatest = (data) => {
    latest.value = data
  }
  return { list, latest, setList, setLatest }
})
