import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getDevices } from '../api/devices'

export const useDevicesStore = defineStore('airs', () => {
  const all = ref([])

  const setAll = async () => {
    all.value = await getDevices()
  }
  return { all, setAll }
})
