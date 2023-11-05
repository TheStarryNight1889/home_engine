import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getDevices } from '../api/transporter'

export const useDevicesStore = defineStore('devices', () => {
  const all = ref([])

  const setAll = async () => {
    all.value = await getDevices()
  }

  // getters
  const getDeviceById = (id) => {
    return all.value.find(device => device.device_id === id)
  }

  return { all, setAll, getDeviceById }
})
