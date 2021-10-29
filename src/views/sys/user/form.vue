<template>
  <el-dialog v-model="state.visible" title="系统用户" width="360px">
    <div class="mx-5">
      <el-form ref="formRef" :model="form" label-width="60px">
        <el-form-item label="账号" prop="account" :rules="makeRule({ rule: 'require|phone' })">
          <el-input v-model="form.account" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="实名" prop="realName" :rules="makeRule({ rule: 'require' })">
          <el-input v-model="form.realName"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roleId" :rules="makeRule({ rule: 'require' })">
          <RoleSelect v-model="form.roleId" :only-sys-role="true" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.state" class="w-full">
            <el-option label="正常" :value="1" />
            <el-option label="禁用" :value="2" />
          </el-select>
        </el-form-item>
      </el-form>
      <div class="text-right">
        <el-button type="primary" :loading="state.loading" @click="submit()">{{ state.cmd }}</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { makeRule } from '@/utils/formRule'
import { useComponentHandler } from '@/utils/componentHandler'
import * as SysUserApi from '@/api/sys/user'
import { leftAssign } from '@/utils/tools'
import RoleSelect from '@/views/components/RoleSelect.vue'
import { ElMessageBox } from 'element-plus'

type TData = SysUserApi.IGetUserListRspItem
type TParams = SysUserApi.IPostUserReq

export interface ITheForm {
  show: (data?: TData) => void
}

export default defineComponent({
  emits: ['submit'],
  components: { RoleSelect },
  setup(_, { emit }) {
    const _state = () => ({
      loading: false,
      visible: false,
      cmd: '创建',
    })
    const state = reactive(_state())

    const _form = (): TParams => ({
      userId: undefined,
      account: '',
      realName: '',
      roleId: '',
      state: 1,
    })
    const form = reactive<TParams>(_form())

    function show(data?: TData) {
      Object.assign(form, _form())
      Object.assign(state, _state())
      if (data) {
        leftAssign(form, data)
        state.cmd = '修改'
      }
      state.visible = true
    }

    const componentHandler = useComponentHandler()

    function submit() {
      componentHandler.get<any>('formRef').validate((valid: boolean) => {
        if (valid) {
          state.loading = true
          const api = state.cmd === '创建' ? SysUserApi.create : SysUserApi.update
          api(form)
            .then(() => {
              state.visible = false
              emit('submit')
              const msg = state.cmd === '创建' ? '创建成功，默认密码 888888' : '保存成功'
              ElMessageBox.alert(msg, { type: 'success' })
            })
            .finally(() => {
              state.loading = false
            })
        }
      })
    }

    return {
      state,
      form,
      makeRule,
      show,
      submit,
    }
  },
})
</script>
