<template>
  <div class="markdown-body">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-blue-400 mb-4 shadow-lg">
        {{ isHydrated ? titleText : 'Inventory' }}
      </h2>
    </div>
    
      <div id="inventory-container">
        <div v-if="inventory.length === 0" class="text-gray-200 text-start p-2" style="text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);">
          {{ isHydrated ? emptyText : 'Sorry, there are no items here yet' }}
        </div>
        <div v-else class="grid grid-cols-2 gap-3">
          <div 
            v-for="item in inventory" 
            :key="item.name"
            class="item p-3 bg-black bg-opacity-30 rounded-lg border border-blue-600"
          >
            <div class="flex items-center gap-2">
              <!-- Image if available -->
              <div v-if="item.imageUrl" class="flex-shrink-0">
                <img 
                  :src="item.imageUrl" 
                  :alt="item.name"
                  class="w-8 h-8 object-cover rounded"
                />
              </div>
              
              <!-- Item name -->
              <div class="flex-1 min-w-0">
                <p class="text-gray-200 text-xs font-medium truncate" style="text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);">
                  <a :href="`/${item.location}`" class="hover:text-blue-400 transition-colors">{{ item.name }}</a>
                </p>
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
          imageUrl: itemData ? itemData.imageUrl : null,
          location: itemData ? itemData.location : null
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