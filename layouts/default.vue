<script setup lang="ts">

</script>

<template>
  <div>
    <Sidebar/>
    <div class=" sm:ml-64">
      <Nav/>
      <div class="p-3">
        <slot/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>