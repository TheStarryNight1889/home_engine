<template>
  <div class="h-screen w-screen flex flex-col gap-4 px-4 py-4">
    <div class="flex gap-2 bg-base-300 p-2 w-full">
      <device-table :devices="allDevice" :latestAirs="getLatestAirs" @selectedDevice="setSelectedDevice"></device-table>
    </div>
    <div class="flex flex-col gap-8 h-full">
      <timeseries-chart @graphStartTime="setGraphStartTime" class="h-full" :series="series"></timeseries-chart>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useAirsStore } from '@/stores/airs'
import { useDevicesStore } from '@/stores/devices'
import { storeToRefs } from 'pinia';
import DeviceTable from '../components/DeviceTable.vue';
import TimeseriesChart from '@/components/TimeseriesChart.vue'

const airStore = useAirsStore();
const deviceStore = useDevicesStore();

let selectedDevice = ref('airsensor1');

const { all: allAir } = storeToRefs(airStore);
const { all: allDevice } = storeToRefs(deviceStore);


onMounted(async () => {
  await deviceStore.setAll();
});

const setSelectedDevice = (deviceId) => {
  selectedDevice.value = deviceId
  setGraphStartTime(new Date(Date.now() - 5 * 60 * 1000).toISOString())
}

const setGraphStartTime = async (startTime) => {
  await airStore.setAll(selectedDevice.value, startTime);
}

const getDevice = computed(() => deviceStore.getDeviceById(selectedDevice.value))
const getLatestAirs = computed(() => airStore.getLatestAirs())

const series = computed(() => {
  const data = allAir.value.map((item) => {
    return {
      x: new Date(item.time_bucket).toUTCString(),
      y: item.co2,
    }
  })
  return [
    {
      name: 'CO2',
      data,
    },
  ]
})

</script>
