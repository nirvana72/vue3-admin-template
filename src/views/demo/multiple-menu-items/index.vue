<template>
  <app-page>
    <template #header>
      <div class="p-10">
        <p class="text-xl">多级菜单</p>
        <p>如果只有一个子菜单情况下, 可通过配置上提子菜单项</p>
      </div>
    </template>
    <app-card>
      <AddNum />
    </app-card>
  </app-page>
</template>

<script lang="ts">
export default { name: 'MultipleMenuItemsLv3' }
</script>

<script lang="ts" setup>
import AddNum from '../components/AddNum.vue'
</script>
