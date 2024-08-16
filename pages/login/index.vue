<script setup>
const supabase = useSupabaseClient()
const router = useRouter()

const loading = ref(false)
const email = ref('')
const password = ref('')
const errorLogin = ref(null)
definePageMeta({
  layout: 'full-layout'
})
const handleLogin = async () => {
  try {
    loading.value = true
    const {data, error} = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    if (error) throw error

    if (data) {
      router.push('/manage-question').catch(() => {
      })
    }
  } catch (error) {
    errorLogin.value = 'อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาเข้าสู่ระบบอีกครั้งค่ะ'
  } finally {
    loading.value = false
  }
}
watch(email, value => {
  if (value) errorLogin.value = null
}, {deep: true, immediate: true})

watch(password, value => {
  if (value) errorLogin.value = null
}, {deep: true, immediate: true})
</script>

<template>
  <div class="main">
    <p class="sign" align="center">เข้าสู่ระบบ</p>
    <div class="p-5">
      <div class="mt-2">
        <label>อีเมล</label>
        <input class="form-control form-control-sm" v-model="email">
      </div>
      <div class="mt-2">
        <label>รหัสผ่าน</label>
        <input class="form-control form-control-sm" type="password" v-model="password">
      </div>
      <div class="mt-3">
        <button type="button" class="btn btn-primary btn-sm w-100" @click="handleLogin"
                :disabled="loading || email === '' || password === ''">{{ !loading ? 'เข้าสู่ระบบ' : 'กำลังโหลด' }}
        </button>
      </div>
      <small v-if="errorLogin" class="text-red-600">
        {{ errorLogin }}
      </small>
    </div>

  </div>
</template>

<style>
body {
  background-color: #86b7fe36;
  font-family: 'Ubuntu', sans-serif;
}

.main {
  background-color: #FFFFFF;
  width: 400px;
  height: 400px;
  margin: 10em auto;
  border-radius: 1.5em;
  box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.14);
}

.sign {
  padding-top: 40px;
  color: #2563eb;
  font-family: 'Ubuntu', sans-serif;
  font-weight: bold;
  font-size: 23px;
}

a {
  text-shadow: 0px 0px 3px rgba(117, 117, 117, 0.12);
  color: #E1BEE7;
  text-decoration: none
}

@media (max-width: 600px) {
  .main {
    border-radius: 0px;
  }
}
</style>