<script setup lang="ts">
const supabase = useSupabaseClient()
const router = useRouter()
const dayjs = useDayjs()
let group = ref([])
const datetime = ref(null)
onMounted(() => {
  getGroupList()
})
const getGroupList = async () => {
  try {
    const startDate = dayjs(datetime.value).format('YYYY-MM-DDT00:00:00')
    const endDate = dayjs(datetime.value).format('YYYY-MM-DDT23:59:59')
    if (datetime.value) {
      const {data, error} = await supabase
          .from('group')
          .select("*")
          .gte('created_at', startDate || null)
          .lte('created_at', endDate || null)
      if (data) {
        group.value = data
      }
    }else {
      const {data, error} = await supabase
          .from('group')
          .select("*")
      if (data) {
        group.value = data
      }
    }

  } catch (error) {
    if (error) {
      console.log('id error', error.message)
    }
  }
}

const handleCreateQuestion = () => {
  router.push('/manage-question/create-question').catch(() => {})
}
const changeFormatDate = (date: string) => {
  return dayjs(date).format("D/MM/YYYY HH:mm")
}

const action = (data: string, group_id: string) => {
  if (data === 'view') {
    console.log('view')
  } else if (data === 'edit') {
    router.push(`/manage-question/edit-question?group=${group_id}`).catch(() => {})
  } else if ('delete') {
    deleteGroupQuestion(group_id)
  } else {
    return;
  }
}

const deleteGroupQuestion = async (id:string) => {
  try {
    const {errorQuestion} = await supabase
        .from('question')
        .delete()
        .eq('group_id', id)
    if (errorQuestion) throw errorQuestion
    const {errorGroup} = await supabase
        .from('group')
        .delete()
        .eq('id', id)
    if (errorGroup) throw errorGroup
  } catch (err) {
    if (err) {
      console.log('delete failed')
    }
  } finally {
    getGroupList()
  }
}
const clearFilterGroupList = () => {
  datetime.value = null
  getGroupList()
}
</script>

<template>
  <div class="h-full">
    <Breadcrumb :topic="'จัดการแบบทดสอบ'"/>
    <div class="card">
      <div class="card-body">
        <label>วันที่</label>
        <div class="row">
          <div class="col-4">
            <input class="form-control form-control-sm" type="date" v-model="datetime">
          </div>
         <div class="col-auto action-icon action-icon-filter" @click="getGroupList">
           <mdi-icon icon="mdiMagnify"/>
         </div>
          <div class="col-auto action-icon action-icon-filter ml-1" @click="clearFilterGroupList">
            <mdi-icon icon="mdiRestore"/>
          </div>
        </div>
        <div class="text-right mt-3 mb-3">
          <button type="button" class="btn btn-primary btn-sm" @click="handleCreateQuestion">
       <span class="flex">
         <mdi-icon icon="mdiPlus" class="mt-1 mr-1"/>
         <span>สร้างชุดแบบทดสอบ</span>
       </span>
          </button>
        </div>
        <div class="relative overflow-x-auto sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                ชื่อแบบทดสอบ
              </th>
              <th scope="col" class="px-6 py-3">
                วันที่สร้าง
              </th>
              <th scope="col" class="px-6 py-3 text-right">
                ตัวเลือก
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in group" :key="index" v-if="group.length > 0"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {{ item.title || '-' }}
              </td>
              <td class="px-6 py-4">
                {{ changeFormatDate(item.created_at) || '-' }}
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex flex-row justify-end">
                  <div class="action-icon action-icon-edit mr-1" @click="action('edit', item.id)">
                    <mdi-icon icon="mdiFileDocumentEditOutline"/>
                  </div>
                  <div class="action-icon action-icon-delete mr-1" @click="action('delete', item.id)">
                    <mdi-icon icon="mdiDeleteOutline"/>
                  </div>
                </div>
              </td>
            </tr>
            <th v-else colspan="3" class="text-center justify-center p-5">ไม่มีข้อมูลในตาราง</th>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
</style>