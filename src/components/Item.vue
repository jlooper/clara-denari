<template>
  <div class="item-container">
    <button 
      v-if="!collected"
      class="markdown-body-button"
      @click="collectItem"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { addItem } from '../utils/helpers.js';
import itemsData from '../data/items.json';

export default {
  name: 'Item',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const collected = ref(false);

    const item = computed(() => {
      return itemsData.find(item => item.id == parseInt(props.id));
    });

    const buttonText = computed(() => {
      return item.value ? `${item.value.instructions} ${item.value.name}` : 'Pick up item';
    });

    const collectItem = () => {
      if (!item.value) return;
      
      // Add item to inventory
      addItem(props.id);
      
      // Show result message with notification
      if (typeof window !== 'undefined' && window.showNotification) {
        window.showNotification(item.value.result, 'success', 4000);
      } else if (typeof window !== 'undefined' && window.showFallbackNotification) {
        window.showFallbackNotification(item.value.result, 4000);
      } else {
        alert(item.value.result);
      }
      
      // Mark as collected
      collected.value = true;
      
      // Force inventory refresh
      setTimeout(() => {
        if (window.refreshInventory) {
          window.refreshInventory();
        } else if (window.inventoryInstance) {
          window.inventoryInstance.loadInventory();
        }
      }, 200);
    };

    onMounted(() => {
      // Component mounted
    });

    return {
      collected,
      buttonText,
      collectItem
    };
  }
};
</script> 