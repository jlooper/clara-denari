<template>
  <div class="markdown-body">
    <div class="flex justify-between items-center">
      <p class="text-xl pb-3 p-3 text-sans text-amber-400 text-start" style="text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);">
        {{ isHydrated ? titleText : 'Inventory' }}
      </p>
      <button 
        id="sandbox-btn"
        class="bg-gradient-to-br from-gray-800 to-gray-900 text-amber-400 border-2 border-amber-600 px-3 py-2 text-sm rounded-lg hover:from-amber-700 hover:to-amber-800 hover:text-white transition-all duration-200 shadow-lg"
        style="text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);"
      >
        🧪 {{ isHydrated ? labText : 'Lab' }}
      </button>
    </div>
    <div class="p-3">
      <div id="inventory-container">
        <div v-if="inventory.length === 0" class="text-amber-200 text-start p-2" style="text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);">
          {{ isHydrated ? emptyText : 'Sorry, there are no items here yet' }}
        </div>
        <div v-else class="wrapper">
          <div 
            v-for="item in inventory" 
            :key="item.name"
            class="item mb-4 p-3 bg-black bg-opacity-30"
          >
            <div class="flex items-center gap-3">
              <!-- Image if available -->
              <div v-if="item.imageUrl" class="flex-shrink-0">
                <img 
                  :src="item.imageUrl" 
                  :alt="item.name"
                  class="w-12 h-12 object-cover"
                />
              </div>
              
              <!-- Item name -->
              <div class="flex-1">
                <p class="text-amber-200 text-sm font-medium" style="text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);">
                  {{ item.name }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { getItems, addItem } from '../utils/helpers.js';
import itemsData from '../data/items.json';
import { useI18n } from '../i18n/useI18n';

export default {
  name: 'Inventory',
  setup() {
    const { t, currentLanguage } = useI18n();
    const inventory = ref([]);
    const isHydrated = ref(false);

    // Create computed properties that will re-evaluate when language changes
    const titleText = computed(() => {
      console.log('Computing titleText, current language:', currentLanguage.value);
      return t('inventory.title');
    });
    const labText = computed(() => {
      console.log('Computing labText, current language:', currentLanguage.value);
      return t('inventory.lab');
    });
    const emptyText = computed(() => {
      console.log('Computing emptyText, current language:', currentLanguage.value);
      return t('inventory.empty');
    });

    const loadInventory = () => {
      const itemIds = getItems();
      inventory.value = itemIds.map(id => {
        const itemData = itemsData.find(item => item.id == parseInt(id));
        return {
          name: itemData ? itemData.name : `Item ${id}`,
          imageUrl: itemData ? itemData.imageUrl : null
        };
      });
    };

    // Listen for item added events
    const handleItemAdded = (event) => {
      setTimeout(() => {
        loadInventory();
      }, 200);
    };

    onMounted(() => {
      // Mark as hydrated after a short delay to ensure i18n is ready
      setTimeout(() => {
        isHydrated.value = true;
      }, 100);
      
      loadInventory();
      
      // Listen for item added events
      window.addEventListener('item_added', handleItemAdded);
      
      // Listen for language changes to force re-render
      window.addEventListener('language-changed', () => {
        // Force reactivity by accessing the computed properties
        console.log('Language changed, updating inventory text');
      });
    });

    return {
      inventory,
      loadInventory,
      titleText,
      labText,
      emptyText,
      isHydrated
    };
  }
};
</script> 