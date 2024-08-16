<script setup lang="ts">
const supabase = useSupabaseClient()
const router = useRouter()
const email = ref('')
onMounted(async () => {
  const {data: {user}} = await supabase.auth.getUser()
  email.value = user?.email
})
const logout = async () => {
  await supabase.auth.signOut().then(() => {
    router.push('/login')
  })
}
</script>

<template>
  <nav class="nav-box">
    <div class="flex flex-row">
      <div class="mr-2 mt-1">
        <div>
          {{email}}
        </div>
      </div>
      <div class="action-icon action-icon-delete mr-1" @click="logout">
        <mdi-icon icon="mdiLogout"/>
      </div>
    </div>
  </nav>

</template>

<style scoped>
.nav-box {
  background: #ffffff;
  position: relative;
  display: flex;
  padding: 1rem;
  margin: 1rem;
  border-radius: 10px;
  justify-content: end;
}
</style>