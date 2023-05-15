import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAirsStore = defineStore('airs', () => {
  const data = ref({})

  return { data }
})
