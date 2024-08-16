<script setup lang="ts">
const supabase = useSupabaseClient()
const router = useRouter()
const route = useRoute()
const loading = ref(false)
let questionArray = ref(Array)
const title = ref('')
const addQuestion = () => {
  questionArray.value.push({
    question: '',
    answer_1: '',
    answer_2: '',
    answer_3: '',
    answer_4: '',
    correct_answer: null,
  })
}
const removeQuestion = (index: number) => {
  questionArray.value.splice(index, 1)
}

onMounted(() => {
  getQuestionById()
})
const group_id = route.query.group
const getQuestionById = async () => {
  if (group_id) {
    try {
      let {data: group, error: errorGroup} = await supabase
          .from('group')
          .select('*')
          .eq('id', group_id)
          .single()
      if (errorGroup) throw errorGroup
      title.value = group?.title

      let {data, error} = await supabase
          .from('question')
          .select('*')
          .eq('group_id', group_id)

      if (error) throw error
      questionArray.value = data
    } catch (err) {
      throw err
    }

  }
}
const updateGroupQuestion = async () => {
  loading.value = true
  try {
    const {data: groupData, error: userError} = await supabase
        .from('group')
        .update({title: title.value})
        .eq('id', group_id)
        .select()
    if (userError) throw userError

    questionArray.value.forEach(question => {
      question.group_id = group_id
    })

    const withId = questionArray.value.filter(item => item.id);
    const withoutId = questionArray.value.filter(item => !item.id);
    const {data: questionData, error: dataError} = await supabase
        .from('question')
        .upsert(withId, {
          onConflict: ['id']
        })
    if (dataError) throw dataError

    const {data: questionDataWithOutId, error: dataErrorWithOutId} = await supabase
        .from('question')
        .insert(withoutId)
    if (dataErrorWithOutId) throw dataErrorWithOutId
  } catch (error) {
    if (error) {
      console.log('id error', error.message)
    }
  } finally {
    loading.value = false
    router.push('/manage-question').catch(() => {})
  }
}
const cancelUpdateQuestion = () => {
  router.push('/manage-question').catch(() => {
  })
}
</script>

<template>
  <div class="h-full">
    <Breadcrumb :topic="'จัดการแบบทดสอบ'" :sub-topic="'แก้ไขข้อมูล'"/>
    <div class="card">
      <div class="m-2">
        <div class="p-4">
          <div class="mt-2">
            <label class="form-label">ชื่อแบบทดสอบ</label>
            <input class="form-control form-control-sm" type="text" v-model="title">
          </div>

        </div>
      </div>
    </div>
    <div>
      <div v-for="(question, index) in questionArray" :key="index" class="card p-3 mt-2">
        <div class="mt-2">
          <div class="mb-3">
            <div class="row">
              <div class="col text-left">
                <label for="exampleFormControlTextarea1" class="form-label">คำถามข้อที่ {{ index + 1 }}</label>
              </div>
              <div class="col-auto text-end mb-2" v-if="questionArray.length > 1">
                <div class="action-icon action-icon-delete">
                  <mdi-icon icon="mdiDeleteOutline" @click="removeQuestion(index)" />
                </div>
              </div>
            </div>
            <textarea class="form-control form-control-sm" id="exampleFormControlTextarea1" rows="3"
                      v-model="question.question"></textarea>
          </div>
          <div class="row">
            <div class="col">
              <div>
                <label class="form-label">คำตอบที่1</label>
                <input class="form-control form-control-sm" type="text" v-model="question.answer_1">
              </div>
            </div>
            <div class="col">
              <div>
                <label class="form-label">คำตอบที่2</label>
                <input class="form-control form-control-sm" type="text" v-model="question.answer_2">
              </div>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col">
              <div>
                <label class="form-label">คำตอบที่3</label>
                <input class="form-control form-control-sm" type="text" v-model="question.answer_3">
              </div>
            </div>
            <div class="col">
              <div>
                <label class="form-label">คำตอบที่4</label>
                <input class="form-control form-control-sm" type="text" v-model="question.answer_4">
              </div>
            </div>
          </div>
          <div class="mt-2">
            <label class="form-label">เฉลย (ใส่เป็นตัวเลขข้อ 1-4)</label>
            <input class="form-control form-control-sm" type="number" v-model="question.correct_answer">
          </div>
        </div>
      </div>
      <div class="card p-2 mt-2">
        <button type="button" class="btn btn-light btn-sm block w-100" @click="addQuestion">
          <label class="flex flex-row justify-center cursor-pointer">
            <mdi-icon icon="mdiPlus" class="mt-1 mr-1"/>
            เพิ่มคำถาม
          </label>
        </button>
      </div>
    </div>
    <div class="text-right mt-3">
      <button type="button" class="btn btn-secondary btn-sm mr-1 " @click="cancelUpdateQuestion" :disabled="loading">
        ยกเลิก
      </button>
      <button type="button" class="btn btn-primary btn-sm ml-1" @click="updateGroupQuestion" :disabled="loading">
        บันทึก
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>