import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getDevices } from '../api/transporter'

export const useDevicesStore = defineStore('devices', () => {
  const all = ref([])

  const setAll = async () => {
    all.value = await getDevices()
  }
  return { all, setAll }
})
