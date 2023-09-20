<template>
  <div >
      <div class="css_table bg-gray-100 p-4 md:p-8 rounded-lg shadow-md ">
      <h1 class="text-center text-2xl font-semibold mb-8 border-b-2 pb-4">Fuente de datos</h1>
      
      <input type="file" @change="handleFileUpload" accept=".csv" class="hidden" id="fileInput" />

      <div class="flex justify-center items-center border-dashed border-2 border-gray-300 p-6 rounded-lg mb-4 h-80">
        <label for="fileInput" class="cursor-pointer">
          <img src="../assets/enviar.png" alt="Icono" class="mx-auto " />
          <p class="mt-2 text-gray-600" v-if="!selectedFileName">Seleccionar archivo CSV</p>
    <p v-if="selectedFileName" class="mt-2 text-gray-600">{{ selectedFileName }}</p>
        </label>
      </div>

    </div>
    
    <div v-if="jsonData" class="mt-4">
      <Tablevi :jsonData="jsonData"></Tablevi>
    </div>
    <div class="mt-4 flex justify-center py-8 px-8">
        <button @click="postDataToAPI(jsonData)" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 relative">
          <span :class="{'loading-button': isLoading}" v-if="isLoading"></span>
          <span class="z-10" v-if="isLoading">Enviando datos...</span>
          <span v-else>Enviar datos</span>
        </button>
    </div>
    <p class="mt-2 text-center">{{ postDataMessage }}</p>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import * as Papa from 'papaparse';
import Tablevi from '../components/Tablevi.vue';



const jsonData = ref([]);
const postDataMessage = ref('');
const selectedFileName = ref('');
const isLoading = ref(false);


const handleFileUpload = (event) => {
  const input = event.target;
  const file = input.files?.[0];

  if (file) {
    selectedFileName.value = file.name; 
    Papa.parse(file, {
      header: false,
      dynamicTyping: true,
      complete(results) {
        // Asigna manualmente los nombres de columna y aplica formatPhoneNumbers
        const formattedData = results.data.map((item) => ({
          name: item[0],    
          phone: item[1],   
          email: item[2],   
        }));

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

      const zerosToAdd = Math.max(0, 10 - phoneNumber.length);

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
    isLoading.value = true;
    const sendRequest = async (itemIndex) => {
      if (itemIndex >= data.length) {
        postDataMessage.value = 'Datos CSV enviados con éxito al endpoint';
        isLoading.value = false;
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

        await sendRequest(itemIndex + 1);
      }
    };

    // Inicia la secuencia de solicitudes POST
    await sendRequest(0);
  } catch (error) {
    console.error('Error al enviar datos CSV al endpoint:', error);
    postDataMessage.value = 'Error al enviar datos CSV al endpoint. Por favor, inténtalo de nuevo.';
    isLoading.value = false;
  }
};


  </script>
  