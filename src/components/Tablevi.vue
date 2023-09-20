<template>

    <div class="css_table bg-gray-100 p-4 md:p-8 rounded-lg shadow-md ">
      <h1 class="text-center text-2xl font-semibold mb-8 border-b-2 pb-4">Visualizar datos</h1>
      <div class="table-container " :class="{ 'scrollable': jsonData.length > 20 } ">
        <table class="table-auto ">
          
          <thead>
            <tr>
              <th></th>
              <th class="px-4 py-2">Name</th>
              <th class="px-4 py-2">Phone</th>
              <th class="px-4 py-2">Email</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, index) in jsonData" :key="index">
              <td class="border px-4 py-2">{{ index + 1 }}</td>
              <td class="border px-4 py-2">{{ item.name }}</td>
              <td class="border px-4 py-2">{{ item.phone }}</td>
              <td class="border px-4 py-2">{{ item.email }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
    </div>
  
</template>


<script setup lang="ts">
import { defineProps, watch, ref } from 'vue';

const props = defineProps<{
  jsonData: ItemData[];
}>();

const jsonData = ref(props.jsonData);


interface ItemData {
  name: string;
  phone: string;
  email: string;
}

watch(() => props.jsonData, (newData) => {
  jsonData.value = newData;
});
</script>
