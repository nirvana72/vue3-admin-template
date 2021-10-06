<template>
  <div class="h-auto min-h-full bg-gray-100 dark:bg-black">
    <div class="bg-white dark:bg-dark-800">
      <slot name="header"></slot>
    </div>
    <div class="p-5">
      <slot></slot>
    </div>
  </div>
</template>
