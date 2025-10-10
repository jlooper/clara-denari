<template>
  <div class="markdown-body">
    <div class="flex justify-between items-center">
      <h2 class="text-responsive-l md:text-responsive-xl font-bold text-blue-400 shadow-lg">
        {{ isHydrated ? titleText : 'Inventory' }}
        <span class="text-gray-400 font-normal text-responsive-sm">
          ({{ inventory.length }} / 5)
        </span>
      </h2>
    </div>
    
      <div id="inventory-container">
        <div v-if="inventory.length === 0" class="text-gray-200 text-start p-3 text-responsive-sm" style="text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);">
          {{ isHydrated ? emptyText : 'Sorry, there are no items here yet' }}
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-1">
          <div 
            v-for="item in inventory" 
            :key="item.name"
            class="item p-1.5 bg-black bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
          >
            <div class="flex items-center gap-1.5">
              <!-- Image if available -->
              <div v-if="item.imageUrl" class="flex-shrink-0">
                <img 
                  :src="item.imageUrl" 
                  :alt="item.name"
                  class="w-6 h-6 object-cover rounded"
                />
              </div>
              
              <!-- Download icon button -->
              <button 
                v-if="item.imageUrl"
                @click="downloadImage(item.imageUrl, item.name)"
                class="download-btn"
                title="Download image"
                type="button"
              >
                <svg 
                  class="w-3 h-3" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
              </button>
              
              <!-- Item name and details -->
              <div class="flex-1 min-w-0">
                <p class="text-gray-200 text-xs font-normal leading-tight" style="text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);">
                  <a :href="`/${item.location}`" class="hover:text-blue-400 transition-colors duration-200">
                    <span class="truncate">{{ item.name }}</span>
                  </a>
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
      return t('inventory.title');
    });
    const labText = computed(() => {
      return t('inventory.lab');
    });
    const emptyText = computed(() => {
      return t('inventory.empty');
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

    const loadInventory = () => {
      const itemIds = getItems();
      inventory.value = itemIds.map(id => {
        const itemData = itemsData.find(item => item.id == parseInt(id));
        const translationKey = getItemTranslationKey(parseInt(id));
        
        // Get localized name
        let localizedName = itemData ? itemData.name : `Item ${id}`;
        if (translationKey) {
          localizedName = t(`items.${translationKey}.name`);
        }
        
        return {
          name: localizedName,
          imageUrl: itemData ? itemData.imageUrl : null,
          location: itemData ? itemData.location : null
        };
      });
    };

    const downloadImage = async (url, filename) => {
      try {
        // Fetch the image
        const response = await fetch(url);
        const blob = await response.blob();
        
        // Create a temporary URL for the blob
        const blobUrl = window.URL.createObjectURL(blob);
        
        // Create a temporary anchor element and trigger download
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename || 'download';
        document.body.appendChild(link);
        link.click();
        
        // Cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error('Error downloading image:', error);
        // Fallback: open in new tab
        window.open(url, '_blank');
      }
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
        // Reload inventory to get localized names
        loadInventory();
      });
    });

    return {
      inventory,
      loadInventory,
      downloadImage,
      titleText,
      labText,
      emptyText,
      isHydrated
    };
  }
};
</script>

<style scoped>
/* Override markdown-body button styles for download button */
.download-btn {
  padding: 0 !important;
  border: none !important;
  background: none !important;
  margin: 0 !important;
  min-width: auto !important;
  min-height: auto !important;
  color: #0D9AFF;
  transition: opacity 0.2s, color 0.2s;
  cursor: pointer;
  vertical-align: top;
  line-height: 1;
}

.download-btn:hover {
  opacity: 1;
  color: rgb(209, 213, 219); /* gray-300 */
  background: none !important;
  border: none !important;
}
</style>