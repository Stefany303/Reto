<template>
    <div>
      <input type="file" @change="handleFileUpload" accept=".csv" />
      <div v-if="jsonData">
        <h2>JSON Result:</h2>
        <pre>{{ jsonData }}</pre>
      </div>
      <div>
        <button @click="postDataToAPI(jsonData)">Enviar datos al endpoint</button>
        <!-- Aquí puedes mostrar un mensaje de éxito o error después de enviar los datos -->
        <p>{{ postDataMessage }}</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import Papa from 'papaparse';
  
  const jsonData = ref([]);
  const postDataMessage = ref('');
  
  const handleFileUpload = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
  
    if (file) {
      Papa.parse(file, {
        header: false,
        dynamicTyping: true,
        complete(results) {
          // Asigna manualmente los nombres de columna y aplica formatPhoneNumbers
        const formattedData = results.data.map((item) => ({
          name: item[0],    // Asigna el primer valor como "name"
          phone: item[1],   // Asigna el segundo valor como "phone"
          email: item[2],   // Asigna el tercer valor como "email"
        }));

        // Aplica formatPhoneNumbers al resultado
        const formattedAndCleanedData = formatPhoneNumbers(formattedData);
        jsonData.value = formattedAndCleanedData;
        },
        error(error) {
          console.error('Error parsing CSV:', error.message);
        },
      });
    }
  };
  const formatPhoneNumbers = (data) => {
  return data
    .filter((item) => item.phone) // Filtrar solo los elementos con número de teléfono
    .map((item) => {
      let phoneNumber = item.phone.toString();

      // Calcular cuántos ceros se deben agregar al principio para completar 10 dígitos
      const zerosToAdd = Math.max(0, 10 - phoneNumber.length);

      // Agregar ceros al principio solo si es necesario y formatear con guiones
      const formattedPhoneNumber =
        
        phoneNumber.substring(0, 3) +
        '-' +
        phoneNumber.substring(3, 6) +
        '-' +
        phoneNumber.substring(6, 10)+
        '0'.repeat(zerosToAdd) ;

      const cleanedItem = {
        name: item.name,
        phone: formattedPhoneNumber,
        email: item.email,
      };

      return cleanedItem;
    });
};


  
const postDataToAPI = async (data) => {
  try {
    if (!data || data.length === 0) {
      console.error('No hay datos para enviar al endpoint');
      postDataMessage.value = 'No hay datos para enviar al endpoint';
      return;
    }

    const sendRequest = async (itemIndex) => {
      if (itemIndex >= data.length) {
        // Todas las solicitudes han sido enviadas
        postDataMessage.value = 'Datos CSV enviados con éxito al endpoint';
        return;
      }

      const item = data[itemIndex];
      
      try {
        const response = await fetch('https://8j5baasof2.execute-api.us-west-2.amazonaws.com/production/tests/trucode/items', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        });

        if (!response.ok) {
          throw new Error('La solicitud POST no fue exitosa');
        }

        console.log('Solicitud POST exitosa:', item);

        // Envía la siguiente solicitud recursivamente
        await sendRequest(itemIndex + 1);
      } catch (error) {
        console.error('Error al enviar un objeto al endpoint:', error);
        // Puedes manejar errores individuales aquí si es necesario

        // Envía la siguiente solicitud recursivamente incluso si hay errores
        await sendRequest(itemIndex + 1);
      }
    };

    // Inicia la secuencia de solicitudes POST
    await sendRequest(0);
  } catch (error) {
    console.error('Error al enviar datos CSV al endpoint:', error);
    postDataMessage.value = 'Error al enviar datos CSV al endpoint. Por favor, inténtalo de nuevo.';
  }
};


  </script>
  