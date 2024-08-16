<script setup lang="ts">
const route = useRoute()
const sidebar = ref([
  {
    id: 1,
    name: "จัดการแบบทดสอบ",
    path: "/manage-question",
    icon: "mdiFileTableOutline"
  },
  // {
  //   id: 2,
  //   name: "จัดการผู้ใช้งาน",
  //   path: "/manage-users",
  //   icon: "mdiAccount"
  // }
])
</script>

<template>
  <div>
    <aside id="default-sidebar"
           class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
           aria-label="Sidebar">
      <div class="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul class="space-y-2 font-medium">
          <li v-for="(item, index) in sidebar" :key="index">
            <NuxtLink :to="item.path">
              <div :class="route.path.includes(item.path)  ? 'bg-blue-600 text-white': ''"
                   class="flex items-center p-2.5 text-gray-900 rounded-xl dark:text-white hover:bg-gray-300 hover:text-white dark:hover:bg-blue-950 group">
                <MdiIcon :icon="item.icon" class="ml-2"/>
                <span class="ms-3">{{ item.name }}</span>
              </div>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.active-sidebar {
  background: #0047e1;
}
</style>