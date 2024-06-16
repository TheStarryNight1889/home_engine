<template>
    <div class="">
        <div class="overflow-x-auto">
            <table class="table">
                <!-- head -->
                <thead>
                    <tr>
                        <th>Device</th>
                        <th>Type</th>
                        <th>Version</th>
                        <th>Co2</th>
                        <th>Temperature</th>
                        <th>Humidity</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- body -->
                    <tr v-for="device in  devices " :key="device.device_id" class="hover"
                        @click="setActiveDevice(device.device_id)"
                        :class="{ 'bg-base-200': device.device_id === activeDevice }">
                        <td class="border-l-4"
                            :class="{ 'border-green-400': device.connection_status, 'border-red-400': !device.connection_status }">
                            {{ device.device_id }}
                        </td>
                        <td>{{ device.device_type }}</td>
                        <td>{{ device.device_version }}</td>
                        <td>{{ latestAirs[device.device_id] ? latestAirs[device.device_id].co2 + ' PPM' : '' }}</td>
                        <td>{{ latestAirs[device.device_id] ? latestAirs[device.device_id].temperature + '°C' : '' }}</td>
                        <td>{{ latestAirs[device.device_id] ? latestAirs[device.device_id].humidity + '%' : '' }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
const props = defineProps({
    devices: {
        type: Array,
        required: true
    },
    latestAirs: {
        type: Object,
        required: true
    }
})

let activeDevice = ref('')

const setActiveDevice = (deviceId) => {
    activeDevice.value = deviceId
    emit('selectedDevive', deviceId)
}
</script>