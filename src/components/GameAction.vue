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
import { ref, computed, onMounted, watch } from 'vue';
import { addItem } from '../utils/helpers.js';
import itemsData from '../data/items.json';
import { translations } from '../i18n/translations.ts';

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
    },
    textKey: {
      type: String,
      default: ''
    },
    resultKey: {
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

    // Get current language
    const getCurrentLanguage = () => {
      const currentLang = localStorage.getItem('preferred-language') || 'en';
      return currentLang === 'pt-br' ? 'en' : currentLang; // Fallback to English for Portuguese
    };

    // Get translated text for item
    const getTranslatedItemText = (item) => {
      if (!item) return '';
      
      const lang = getCurrentLanguage();
      const itemKey = getItemKey(item);
      
      if (!itemKey) return `${item.instructions} ${item.name}`;
      
      const instructionsKey = `items.${itemKey}.instructions`;
      const nameKey = `items.${itemKey}.name`;
      
      const instructions = translations[instructionsKey]?.[lang] || item.instructions;
      const name = translations[nameKey]?.[lang] || item.name;
      
      return `${instructions} ${name}`;
    };

    // Get item key from item data
    const getItemKey = (item) => {
      switch (item.name) {
        case 'scrap of paper': return 'scrap_of_paper';
        case 'piece of string': return 'piece_of_string';
        case 'cannoli': return 'cannoli';
        case 'newspaper clipping': return 'newspaper_clipping';
        case 'mirror': return 'mirror';
        default: return null;
      }
    };

    // Get translated custom text
    const getTranslatedCustomText = () => {
      if (props.textKey) {
        const lang = getCurrentLanguage();
        return translations[props.textKey]?.[lang] || props.customText || 'Perform action';
      }
      return props.customText || 'Perform action';
    };

    const buttonText = computed(() => {
      // Use forceUpdate to trigger reactivity on language changes
      forceUpdate.value; // This will cause the computed to re-evaluate
      
      if (props.actionType === 'item' && item.value) {
        return getTranslatedItemText(item.value);
      } else if (props.actionType === 'text') {
        return getTranslatedCustomText();
      }
      return 'Action';
    });

    // Get translated result text
    const getTranslatedResultText = (item) => {
      if (props.resultKey) {
        // Use custom result key
        const lang = getCurrentLanguage();
        return translations[props.resultKey]?.[lang] || props.customResult || 'Action completed.';
      } else if (item) {
        // Use item result
        const lang = getCurrentLanguage();
        const itemKey = getItemKey(item);
        
        if (!itemKey) return item.result;
        
        const resultKey = `items.${itemKey}.result`;
        return translations[resultKey]?.[lang] || item.result;
      }
      return props.customResult || 'Action completed.';
    };

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
        
        // Show translated result message in notification panel
        const translatedResult = getTranslatedResultText(item.value);
        if (typeof window !== 'undefined' && window.showNotificationPanel) {
          window.showNotificationPanel(translatedResult, 4000);
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
          
          // Update iframe height after content changes
          if (window.triggerHeightUpdate) {
            window.triggerHeightUpdate();
          }
        }, 200);
      } else if (props.actionType === 'text') {
        // Show translated text-only result in notification panel
        const translatedResult = getTranslatedResultText(null);
        if (typeof window !== 'undefined' && window.showNotificationPanel) {
          window.showNotificationPanel(translatedResult, 4000);
        }
        
        // Mark as completed
        collected.value = true;
        
        // Update iframe height after content changes
        setTimeout(() => {
          if (window.triggerHeightUpdate) {
            window.triggerHeightUpdate();
          }
        }, 100);
      }
    };

    // Force reactivity for language changes
    const forceUpdate = ref(0);
    
    onMounted(() => {
      // Listen for language changes
      const handleLanguageChange = () => {
        forceUpdate.value++; // Force reactivity update
      };
      
      document.addEventListener('language-changed', handleLanguageChange);
      window.addEventListener('language-changed', handleLanguageChange);
      
      // Cleanup on unmount
      return () => {
        document.removeEventListener('language-changed', handleLanguageChange);
        window.removeEventListener('language-changed', handleLanguageChange);
      };
    });

    return {
      collected,
      buttonText,
      performAction,
      forceUpdate
    };
  }
};
</script>
