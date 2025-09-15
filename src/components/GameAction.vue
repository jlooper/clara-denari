<template>
  <div class="game-action-container">
    <button 
      v-if="!collected"
      class="bg-black text-blue-500 border-2 border-green-500 px-6 py-3 rounded-lg hover:bg-green-500 hover:text-black transition-colors duration-200 font-bold text-lg"
      style="text-shadow: 0 0 5px rgba(0, 255, 0, 0.5);"
      @click="performAction"
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
  name: 'GameAction',
  props: {
    id: {
      type: String,
      required: true
    },
    actionType: {
      type: String,
      default: 'item', // 'item' or 'text'
      validator: (value) => ['item', 'text'].includes(value)
    },
    customText: {
      type: String,
      default: ''
    },
    customResult: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const collected = ref(false);

    const item = computed(() => {
      if (props.actionType === 'item') {
        return itemsData.find(item => item.id == parseInt(props.id));
      }
      return null;
    });

    const buttonText = computed(() => {
      if (props.actionType === 'item' && item.value) {
        return `${item.value.instructions} ${item.value.name}`;
      } else if (props.actionType === 'text') {
        return props.customText || 'Perform action';
      }
      return 'Action';
    });

    const performAction = () => {
      if (props.actionType === 'item' && item.value) {
        // Add item to inventory
        addItem(props.id);
        
        // Dispatch item_added event for other components to listen to
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('item_added', {
            detail: { itemId: props.id, item: item.value }
          }));
        }
        
        // Show result message in notification panel
        if (typeof window !== 'undefined' && window.showNotificationPanel) {
          window.showNotificationPanel(item.value.result, 4000);
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
      } else if (props.actionType === 'text') {
        // Show text-only result in notification panel
        const resultText = props.customResult || 'Action completed.';
        if (typeof window !== 'undefined' && window.showNotificationPanel) {
          window.showNotificationPanel(resultText, 4000);
        }
        
        // Mark as completed
        collected.value = true;
      }
    };

    onMounted(() => {
      // Component mounted
    });

    return {
      collected,
      buttonText,
      performAction
    };
  }
};
</script>
