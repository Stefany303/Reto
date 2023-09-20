<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <div class="centered-content">
      <h1 class="green text-6xl">{{ msg }}</h1>
      
    </div>
  </div>
</template>

