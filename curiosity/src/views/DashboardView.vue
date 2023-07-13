<template>
  <div class="h-screen w-screen flex flex-col gap-8 px-4 py-8">
    <div class="flex gap-2 bg-base-300 p-4 rounded w-full">
      <device-card v-for="device in allDevice" :device="device"
        :class="{ 'bg-primary-focus': device.device_id === selectedDevice }"
        @click="setSelectedDevice(device.device_id)"></device-card>
    </div>
    <div class="flex flex-col gap-8 w-1/2 h-full">
      <div class="flex flex-row gap-4">
        <live-summary class="w-1/2" :item="latestAir"></live-summary>
        <device-info class="w-1/2" :device="getDevice" :deviceConnection="getConnectionInfo"></device-info>
      </div>
      <timeseries-chart @graphStartTime="setGraphStartTime" class="h-full" :series="series"></timeseries-chart>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useAirsStore } from '@/stores/airs'
import { useDevicesStore } from '@/stores/devices'
import { storeToRefs } from 'pinia';
import LiveSummary from '@/components/LiveSummary.vue'
import TimeseriesChart from '@/components/TimeseriesChart.vue'
import DeviceCard from '@/components/DeviceCard.vue'
import DeviceInfo from '@/components/DeviceInfo.vue'

const airStore = useAirsStore();
const deviceStore = useDevicesStore();

let selectedDevice = ref('Super Air');

const { all: allAir, latest: latestAir } = storeToRefs(airStore);
const { all: allDevice } = storeToRefs(deviceStore);

onMounted(async () => {
  await deviceStore.setAll();
  await deviceStore.setConnectionInfo()
});

const setSelectedDevice = (deviceId) => {
  selectedDevice.value = deviceId
}

const setGraphStartTime = async (startTime) => {
  console.log(startTime)
  await airStore.setAll(selectedDevice.value, startTime);
}

const getDevice = computed(() => deviceStore.getDeviceById(selectedDevice.value))
const getConnectionInfo = computed(() => deviceStore.getConnectionInfoByDeviceId(selectedDevice.value))

const series = computed(() => {
  const data = allAir.value.map((item) => {
    return {
      x: new Date(item.time_bucket).toUTCString(),
      y: item.co2,
    }
  })
  console.log(data)
  return [
    {
      name: 'CO2',
      data,
    },
  ]
})

</script>
