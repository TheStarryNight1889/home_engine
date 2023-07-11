<template>
    <div class="bg-base-300 p-4 rounded">
        <h1 class="text-4xl leading-loose"
            :class="{ 'text-success': deviceConnection?.status, 'text-error': !deviceConnection?.status }">{{
                deviceConnection?.status ? 'Connected' : 'Disconnected' }}</h1>
        <div class=" flex flex-row text-xl leading-relaxed gap-4">
            <p>Device Type</p>
            <h1 class="">{{ device?.device_type }}</h1>
        </div>
        <div class="flex flex-row text-xl leading-relaxed gap-4">
            <p>Device Version</p>
            <h1 class="">{{ device?.device_version }}</h1>
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