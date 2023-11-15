<template>
    <div class="bg-primary text-primary-content p-2">
        <h1 class="text-l">{{ device.device_id }}</h1>
        <p class="text-sm">{{ device.device_type }}</p>
    </div>
</template>
<script setup>
const props = defineProps({
    device: {
        type: Object,
        required: true
    }
})
</script>