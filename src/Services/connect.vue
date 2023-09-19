<template>
  <div>
    <h2>Resultados del CSV en la API:</h2>
    <pre>{{ apiResponse }}</pre>

    <h2>Datos del archivo CSV:</h2>
    <pre>{{ jsonData }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const apiResponse = ref('');
const jsonData = ref('');

onMounted(async () => {
  // Realizar una solicitud GET a la API para obtener los datos del endpoint
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

  // Reemplaza esta sección con la lógica de carga y parseo de tu archivo CSV
  // Supongamos que los datos se cargan en jsonData desde tu archivo CSV
  jsonData.value = 'AQUÍ PONES TUS DATOS DEL ARCHIVO CSV';
});

// Función para enviar datos al endpoint mediante POST

</script>
