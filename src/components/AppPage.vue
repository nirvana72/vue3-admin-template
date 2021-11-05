<template>
  <div id="appPage">
    <div class="bg-white dark:bg-dark-800">
      <slot name="header"></slot>
    </div>
    <div class="p-5">
      <slot></slot>
    </div>
  </div>
</template>
