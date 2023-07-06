<template>
    <apexchart width="900" height="300" type="line" :options="options" :series="series"></apexchart>
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