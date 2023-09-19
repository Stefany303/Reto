<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <div class="centered-content">
      <h1 class="green">{{ msg }}</h1>
      <h3>
        A nuestra página para convertir archivos CSV
      </h3>
    </div>
  </div>
</template>

