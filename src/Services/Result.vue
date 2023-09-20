<template>
  <div class="css_table bg-gray-100 p-4 md:p-8 rounded-lg shadow-md " >
    <h1 class="text-center text-2xl font-semibold mb-8 border-b-2 pb-4">Resultados del CSV en la API:</h1>
    <pre :class="{ 'scrollable': apiResponse.length > 20 }"  style="max-height: 22em; overflow-y: auto;">{{ apiResponse }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const apiResponse = ref('');

onMounted(async () => {
  try {
    const response = await fetch('https://8j5baasof2.execute-api.us-west-2.amazonaws.com/production/tests/trucode/items', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('La solicitud GET no fue exitosa');
    }

    const data = await response.json();
    apiResponse.value = JSON.stringify(data, null, 2);
  } catch (error) {
    console.error('Error al obtener datos de la API:', error);
  }

});


</script>
