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
                    <tr v-for="device in  devices " :key="device.device_id">
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
</script>