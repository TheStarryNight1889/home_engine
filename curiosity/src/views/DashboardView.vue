<template>
  <div class="h-screen w-screen flex flex-col gap-8 px-4 py-8">
    <div class="flex gap-2 bg-base-300 p-4 rounded w-full">
      <device-card v-for="device in allDevice" :device="device"></device-card>
    </div>
    <div class="flex flex-row gap-4">
      <live-summary class="w-1/4" :item="latestAir"></live-summary>
      <device-info class="w-1/4" :device="allDevice[0]" :deviceConnection="{ status: true }"></device-info>
    </div>
    <timeseries-chart :series="series"></timeseries-chart>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useAirsStore } from '@/stores/airs'
import { useDevicesStore } from '@/stores/devices'
import { storeToRefs } from 'pinia';
import LiveSummary from '@/components/LiveSummary.vue'
import TimeseriesChart from '@/components/TimeseriesChart.vue'
import DeviceCard from '@/components/DeviceCard.vue'
import DeviceInfo from '@/components/DeviceInfo.vue'

const airStore = useAirsStore();
const deviceStore = useDevicesStore();

const selectedDevice = 'airsensor1'

const { all: allAir, latest: latestAir } = storeToRefs(airStore);
const { all: allDevice } = storeToRefs(deviceStore);
onMounted(async () => {
  await airStore.setAll(selectedDevice);
  await deviceStore.setAll();
});

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
