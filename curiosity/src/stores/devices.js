import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getDevices } from '../api/bengine'

export const useDevicesStore = defineStore('devices', () => {
  const all = ref([])

  const setAll = async () => {
    all.value = await getDevices()
  }

  const updateDevice = (device) => {
    const index = all.value.findIndex(d => d.device_id === device.device_id)
    all.value[index] = device
  }

  // getters
  const getDeviceById = (id) => {
    return all.value.find(device => device.device_id === id)
  }

  return { all, setAll, getDeviceById , updateDevice}
})
