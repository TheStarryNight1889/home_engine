<template>
    <div class="bg-primary p-4 rounded hover:bg-primary-focus">
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