<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
</script>

<template>
  <div id="app">
   
    <div class="wrapper">
      <header>

<HelloWorld msg="Lista de contactos!" />
</header>
<nav class="text-center mt-8 text-2xl">
        <RouterLink to="/" class="mx-8">Datos</RouterLink>
        
        <RouterLink to="/resultado">Resultados</RouterLink>
      </nav>
      <RouterView></RouterView>

      
    </div>
    
  </div>
 
</template>


