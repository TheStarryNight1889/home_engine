<template>
  <div class="h-screen w-screen flex flex-col justify-center items-center gap-8">
    <div class="">
      <h1 class="text-4xl leading-loose">{{ dayjs(new Date(latest.time)).format('HH mm ss') }}</h1>
      <h1 class="text-3xl leading-relaxed">{{ airStore.latest.device_id }} ({{ latest.location_id }})</h1>
      <div class="flex flex-row text-xl leading-relaxed gap-4">
        <p>Temp.</p>
        <h1 class="">{{ latest.temperature }}</h1>
      </div>
      <div class="flex flex-row text-xl leading-relaxed gap-4">
        <p>CO2.</p>
        <h1 class="">{{ latest.co2 }}</h1>
      </div>
      <div class="flex flex-row text-xl leading-relaxed gap-4">
        <p>Hum.</p>
        <h1 class="">{{ latest.humidity }}</h1>
      </div>
    </div>
    <apexchart width="900" height="300" type="line" :options="options" :series="series"></apexchart>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import dayjs from 'dayjs'
import { useAirsStore } from '@/stores/airs'
import { storeToRefs } from 'pinia';

const airStore = useAirsStore();
const selectedDevice = 'airsensor1'
const { list, latest } = storeToRefs(airStore);
onMounted(async () => {
  await airStore.setList(selectedDevice);
});

const options = {
  chart: {
    id: 'co2-chart',
    toolbar: {
      show: true,
    },
  },
  grid: {
    show: false,
  },
  stroke: {
    curve: 'smooth',
  },
  xaxis: {
    type: 'datetime',
    labels: {
      datetimeUTC: false,
      style: {
        cssClass: 'fill-base-content',
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        cssClass: 'fill-base-content',
      }
    }
  },
  dataLabels: {
    enabled: false,
  },
  // tooltip should be full date time and value
  tooltip: {
    x: {
      format: 'yyyy/MM/dd HH:mm:ss',
    },
  },

}
const series = computed(() => {
  const data = list.value.map((item) => {
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
