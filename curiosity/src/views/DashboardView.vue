<template>
  <div>
    <p>hello</p>
  </div>
</template>

<script setup>

import { useAirsStore } from '@/stores/airs'
import { watch } from 'vue';

const airStore = useAirsStore();

watch(() => airStore.data, (newVal, oldVal) => {
  console.log(newVal);
  console.log(oldVal);
})

</script>
