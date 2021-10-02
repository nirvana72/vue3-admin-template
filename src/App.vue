<template>
  <div class="p-30">
    <el-input placeholder="balabala..."></el-input>
    <el-button type="primary" @click="doHttp">aaa</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'NjApp',
  setup() {
    function doHttp() {
      axios
        .request({ method: 'post', url: '/api/get', data: { a: 'aaa' } })
        .then((data) => {
          // eslint-disable-next-line no-console
          console.log(data)
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.log(e)
        })
    }

    return { doHttp }
  },
})
</script>
