<template>
    <div class="bg-base-300 p-4 rounded">
        <h1 class="text-4xl leading-loose">{{ dayjs(new Date(item.time)).format('HH mm ss') }}</h1>
        <h1 class="text-3xl leading-relaxed">{{ item.device_id }}</h1>
        <div class="flex flex-row justify-between text-xl leading-relaxed gap-4">
            <p>Temperature:</p>
            <h1 class="text-base-content">{{ item.temperature }}</h1>
        </div>
        <div class="flex flex-row justify-between text-xl leading-relaxed gap-4">
            <p>Co2:</p>
            <h1 class="text-base-content">{{ item.co2 }}</h1>
        </div>
        <div class="flex flex-row justify-between text-xl leading-relaxed gap-4">
            <p>Humidity:</p>
            <h1 class="text-base-content">{{ item.humidity }}</h1>
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