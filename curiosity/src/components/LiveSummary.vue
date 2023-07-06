<template>
    <div class="">
        <h1 class="text-4xl leading-loose">{{ dayjs(new Date(item.time)).format('HH mm ss') }}</h1>
        <h1 class="text-3xl leading-relaxed">{{ item.device_id }}</h1>
        <div class="flex flex-row text-xl leading-relaxed gap-4">
            <p>Temp.</p>
            <h1 class="">{{ item.temperature }}</h1>
        </div>
        <div class="flex flex-row text-xl leading-relaxed gap-4">
            <p>CO2.</p>
            <h1 class="">{{ item.co2 }}</h1>
        </div>
        <div class="flex flex-row text-xl leading-relaxed gap-4">
            <p>Hum.</p>
            <h1 class="">{{ item.humidity }}</h1>
        </div>
    </div>
</template>

<script setup>
import dayjs from 'dayjs'

const props = defineProps({
    item: {
        type: Object,
        required: true
    }
})

</script>