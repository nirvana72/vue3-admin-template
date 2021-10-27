<template>
  <div class="app-title-input">
    <slot></slot>
    <label v-if="title !== ''" class="title">{{ title }} :</label>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
}
</script>
