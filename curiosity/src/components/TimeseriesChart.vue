<template>
    <div class="bg-base-300 p-2 rounded ">
        <div class="flex flex-row gap-2 w-full justify-end">
            <button @click="emitPeriod('7d')" class="btn btn-primary">7d</button>
            <button @click="emitPeriod('1d')" class="btn btn-primary">1d</button>
            <button @click="emitPeriod('12h')" class="btn btn-primary">12h</button>
            <button @click="emitPeriod('60m')" class="btn btn-primary">60m</button>
            <button @click="emitPeriod('5m')" class="btn btn-primary">5m</button>
        </div>
        <apexchart v-if="series[0].data.length > 0" width="100%" type="line" :options="options" :series="series">
        </apexchart>
        <div v-else class="flex items-center justify-center h-full">
            <h1 class="text-2xl"> No Data Found</h1>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
const emit = defineEmits(['graphStartTime'])
const props = defineProps({
    series: {
        type: Array,
        required: true
    }
})
onMounted(() => {
    emitPeriod('5m')
})
function emitPeriod(period) {
    switch (period) {
        case '7d':
            emit('graphStartTime', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());
            break;
        case '1d':
            emit('graphStartTime', new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString());
            break;
        case '12h':
            emit('graphStartTime', new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString());
            break;
        case '60m':
            emit('graphStartTime', new Date(Date.now() - 60 * 60 * 1000).toISOString());
            break;
        case '5m':
            emit('graphStartTime', new Date(Date.now() - 5 * 60 * 1000).toISOString());
            break;
        default:
            break;
    }
}
const options = {
    chart: {
        id: 'co2-chart',
        toolbar: {
            show: true,
        },
    },
    grid: {
        show: false,
    },
    stroke: {
        curve: 'smooth',
    },
    xaxis: {
        type: 'datetime',
        labels: {
            datetimeUTC: false,
            style: {
                cssClass: 'fill-base-content',
            }
        }
    },
    yaxis: {
        labels: {
            style: {
                cssClass: 'fill-base-content',
            }
        }
    },
    dataLabels: {
        enabled: false,
    },
    // tooltip should be full date time and value
    tooltip: {
        x: {
            format: 'yyyy/MM/dd HH:mm:ss',
        },
    },

}
</script>