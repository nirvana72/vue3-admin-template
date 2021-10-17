<template>
  <app-icon icon="akar-icons:github-fill" @click="showGitHub" />
</template>

<script lang="ts" setup>
function showGitHub() {
  window.open('https://github.com/nirvana72/vue3-admin-template.git')
}
</script>
