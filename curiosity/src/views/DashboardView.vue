<template>
  <div class="h-screen w-screen flex flex-row justify-center items-center">
    <div class="">
      <h1 class="text-4xl leading-loose">{{ dayjs(new Date(airStore.data.time)).format('HH mm ss') }}</h1>
      <h1 class="text-3xl leading-relaxed">{{ airStore.data.device_id }} ({{ airStore.data.location_id }})</h1>
      <div class="flex flex-row text-xl leading-relaxed gap-4">
        <p>Temp.</p>
        <h1 class="">{{ airStore.data.data.temperature }}</h1>
      </div>
      <div class="flex flex-row text-xl leading-relaxed gap-4">
        <p>CO2.</p>
        <h1 class="">{{ airStore.data.data.co2 }}</h1>
      </div>
      <div class="flex flex-row text-xl leading-relaxed gap-4">
        <p>Hum.</p>
        <h1 class="">{{ airStore.data.data.humidity }}</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
import { useAirsStore } from '@/stores/airs'

const airStore = useAirsStore();

</script>
