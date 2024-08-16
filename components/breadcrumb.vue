<script setup lang="ts">
const props = defineProps(['topic', 'subTopic'])
</script>
<template>
  <div>
    <div class="relative overflow-x-auto  sm:rounded-lg mb-3 p-3">
      <div>
        {{props.topic}} <span class="text-gray-500">{{props.subTopic ? '/ ' + props.subTopic : ''}}</span>
      </div>
    </div>
  </div>
</template>
<style scoped>

</style>