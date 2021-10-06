<template>
  <app-page-warpper>
    <template #header>
      <div class="p-10 text-xl">多级菜单</div>
    </template>
    <el-card shadow="none" class="el-card--fix">
      <AddNum />
    </el-card>
  </app-page-warpper>
</template>

<script lang="ts">
export default { name: 'MultipleMenuItemsLv3' }
</script>

<script lang="ts" setup>
import AddNum from '../components/add-num.vue'
</script>
