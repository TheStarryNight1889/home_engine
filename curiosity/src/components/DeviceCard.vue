<template>
    <div class="bg-primary hover:text-primary-content p-4 rounded">
        <h1 class="text-xl">{{ device.device_id }}</h1>
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