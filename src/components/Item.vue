<template>
  <div class="item-container">
    <button 
      v-if="!collected"
      class="bg-black text-green-500 border-2 border-green-500 px-6 py-3 rounded-lg hover:bg-green-500 hover:text-black transition-colors duration-200 font-bold text-lg"
      style="text-shadow: 0 0 5px rgba(0, 255, 0, 0.5);"
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
import { useI18n } from '../i18n/useI18n';

export default {
  name: 'Item',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { t } = useI18n();
    const collected = ref(false);

    const item = computed(() => {
      return itemsData.find(item => item.id == parseInt(props.id));
    });

    // Map item IDs to translation keys
    const getItemTranslationKey = (itemId) => {
      const itemMap = {
        1: 'scrap_of_paper',
        2: 'piece_of_string',
        3: 'cannoli',
        4: 'newspaper_clipping',
        5: 'mirror'
      };
      return itemMap[itemId] || null;
    };

    const buttonText = computed(() => {
      if (!item.value) return 'Pick up item';
      
      const translationKey = getItemTranslationKey(item.value.id);
      if (translationKey) {
        const instructions = t(`items.${translationKey}.instructions`);
        const name = t(`items.${translationKey}.name`);
        return `${instructions} ${name}`;
      }
      
      // Fallback to original data if translation not found
      return `${item.value.instructions} ${item.value.name}`;
    });

    const collectItem = () => {
      if (!item.value) return;
      
      // Add item to inventory
      addItem(props.id);
      
      // Get localized result message
      const translationKey = getItemTranslationKey(item.value.id);
      const resultMessage = translationKey ? t(`items.${translationKey}.result`) : item.value.result;
      
      // Show result message with notification
      if (typeof window !== 'undefined' && window.showNotification) {
        window.showNotification(resultMessage, 'success', 4000);
      } else {
        alert(resultMessage);
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