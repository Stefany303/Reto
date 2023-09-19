<script setup lang="ts">
import Data_source from './components/Data_source.vue';
import HelloWorld from './components/HelloWorld.vue';
import ApiResults from './Services/connect.vue';
</script>

<template>
  <div id="app">
    <header>

    <div class="wrapper">
      <HelloWorld msg="Bienvenidos!" />
      <Data_source></Data_source>
      <ApiResults></ApiResults>
    </div>
    </header>
  </div>
 
</template>


