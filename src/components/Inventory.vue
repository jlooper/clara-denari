<template>
  <div class="markdown-body">
    <div class="flex justify-between items-center">
      <p class="text-xl pb-3 p-3 text-sans text-amber-400 text-start" style="text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);">
        Inventory
      </p>
    </div>
    <div class="p-3">
      <div id="inventory-container">
        <div v-if="inventory.length === 0" class="text-amber-200 text-start p-2" style="text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);">
          Sorry, there are no items here yet
        </div>
        <div v-else class="wrapper">
          <div 
            v-for="item in inventory" 
            :key="item.name"
            class="item mb-2"
          >
            <p class="text-amber-200 text-sm" style="text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);">
              • {{ item.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { getItems, addItem } from '../utils/helpers.js';

export default {
  name: 'Inventory',
  setup() {
    const inventory = ref([]);

    const loadInventory = () => {
      const names = getItems();
      inventory.value = names.map(name => ({ name }));
    };

    // Listen for item added events
    const handleItemAdded = (event) => {
      setTimeout(() => {
        loadInventory();
      }, 200);
    };

    onMounted(() => {
      loadInventory();
      
      // Listen for item added events
      window.addEventListener('item_added', handleItemAdded);
    });

    return {
      inventory,
      loadInventory
    };
  }
};
</script> 