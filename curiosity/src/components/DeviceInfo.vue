<template>
    <div class="bg-base-300 p-4 rounded flex flex-col gap-2">
        <h1 class="text-4xl px-2 py-0 my-2 rounded leading-relaxed text-center"
            :class="{ 'text-success-content bg-success': deviceConnection?.status, 'text-error-content bg-error': !deviceConnection?.status }">
            {{
                deviceConnection?.status ? 'Connected' : 'Disconnected' }}</h1>
        <div class=" flex flex-row justify-between text-xl leading-relaxed">
            <p>Device Type:</p>
            <h1 class="text-info-content bg-info px-2 py-0 rounded">{{ device?.device_type }}</h1>
        </div>
        <div class="flex flex-row justify-between text-xl leading-relaxed">
            <p>Device Version:</p>
            <h1 class="text-info-content bg-info px-2 py-0 rounded">{{ device?.device_version }}</h1>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    device: {
        type: Object,
        required: true
    },
    deviceConnection: {
        type: Object,
        required: true
    }
})

</script>