<template>
    <div class="bg-base-300 p-2 rounded ">
        <apexchart v-if="series[0].data.length > 0" width="100%" type="line" :options="options" :series="series">
        </apexchart>
        <div v-else class="flex items-center justify-center h-full">
            <h1 class="text-2xl"> No Data Found</h1>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    series: {
        type: Array,
        required: true
    }
})
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