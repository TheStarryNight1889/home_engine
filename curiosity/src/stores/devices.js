import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getDevices, getDeviceConnections } from '../api/transporter'

export const useDevicesStore = defineStore('devices', () => {
  const all = ref([])
  const connectionInfo = ref([])


  const setAll = async () => {
    all.value = await getDevices()
  }

  const setConnectionInfo = async () => {
    connectionInfo.value = await getDeviceConnections()
  }

  // getters
  const getDeviceById = (id) => {
    return all.value.find(device => device.device_id === id)
  }

  const getConnectionInfoByDeviceId = (deviceId) => {
    return connectionInfo.value.find(connection => connection.device_id === deviceId)
  }

  return { all, setAll, setConnectionInfo, getDeviceById, getConnectionInfoByDeviceId }
})
