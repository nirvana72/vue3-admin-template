<template>
  <div class="h-full w-100 mx-auto pt-100">
    <el-input v-model="form.pwdOld" placeholder="原始密码" show-password class="mt-5">
      <template #prepend>
        <i class="el-icon-lock"></i>
      </template>
    </el-input>
    <el-input v-model="form.pwdNew" placeholder="新的密码" show-password class="mt-5">
      <template #prepend>
        <i class="el-icon-lock"></i>
      </template>
    </el-input>
    <el-input v-model="form.pwdConfirm" placeholder="确认密码" show-password class="mt-5">
      <template #prepend>
        <i class="el-icon-lock"></i>
      </template>
    </el-input>
    <el-button type="primary" class="mt-5 w-full" @click="savePwd">确定</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { ElMessageBox } from 'element-plus'
import { changePasswordApi } from '@/api/sys/admin'
import { useRouter } from 'vue-router'
import { useTabsStore } from '@/store/modules/tabs'

export default defineComponent({
  name: 'ProfileChangePassword',
  setup() {
    const router = useRouter()
    const tabStroe = useTabsStore()

    const form = reactive({
      pwdOld: '',
      pwdNew: '',
      pwdConfirm: '',
    })

    function savePwd() {
      if (form.pwdOld.trim() === '' || form.pwdNew.trim() === '' || form.pwdNew !== form.pwdConfirm) {
        ElMessageBox.alert('两次新密码输入不正确', { type: 'error' })
        return
      }

      changePasswordApi(form.pwdOld, form.pwdNew).then(() => {
        ElMessageBox.alert('密码修改成功', {
          type: 'success',
          callback: () => {
            tabStroe.closeTabByRouter(router)
          },
        })
      })
    }

    return {
      form,
      savePwd,
    }
  },
})
</script>
