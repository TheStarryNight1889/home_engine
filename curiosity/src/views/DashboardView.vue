<template>
  <div class="h-screen w-screen flex flex-col justify-center items-center gap-8">
    <live-summary :item="latest"></live-summary>
    <timeseries-chart :series="series"></timeseries-chart>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useAirsStore } from '@/stores/airs'
import { storeToRefs } from 'pinia';
import LiveSummary from '@/components/LiveSummary.vue'
import TimeseriesChart from '@/components/TimeseriesChart.vue'

const airStore = useAirsStore();
const selectedDevice = 'airsensor1'
const { all, latest } = storeToRefs(airStore);
onMounted(async () => {
  await airStore.setAll(selectedDevice);
});

const series = computed(() => {
  const data = all.value.map((item) => {
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
