// Helper functions for inventory management
import itemsData from '../data/items.json';

// Mock localStorage for SSR
if (typeof window === 'undefined') {
  global.localStorage = {
    setItem() {},
    getItem() {
      // we need a mocked response of all items, otherwise the build process will crash every time we add a new item
      const mockResponse = itemsData.reduce((acc, curr) => {
        return { ...acc, [curr.id]: true };
      }, {});
      return JSON.stringify(mockResponse);
    },
  };
}

export function addItem(id) {
  if (typeof window === 'undefined') return;
  
  const item = itemsData.find(item => item.id == parseInt(id));
  if (!item) {
    console.error('Item not found for ID:', id);
    return;
  }
  
  var json = localStorage.getItem('inventory_item');
  
  var inv_items;
  try {
    inv_items = JSON.parse(json || '{}');
  } catch (e) {
    console.error('Error parsing localStorage:', e);
    inv_items = {};
  }
  
  inv_items[id] = true;
  
  const newJson = JSON.stringify(inv_items);
  
  localStorage.setItem('inventory_item', newJson);
  
  // Dispatch event for inventory update
  window.dispatchEvent(new CustomEvent('item_added', { detail: { id: id, name: item.name } }));
}

export function getItems() {
  if (typeof window === 'undefined') return [];
  
  var json = localStorage.getItem('inventory_item');
  
  var inv_items;
  try {
    inv_items = JSON.parse(json || '{}');
  } catch (e) {
    console.error('Error parsing localStorage in getItems:', e);
    inv_items = {};
  }
  
  var ids = Object.keys(inv_items);
  return ids;
}

// Iframe height adjustment utility
export function setupIframeHeight() {
  if (typeof window === 'undefined') return;
  
  function updateIframeHeight() {
    const height = document.body.scrollHeight;
    window.parent.postMessage({ iframeHeight: height }, "*");
  }

  // Update height on initial load
  window.onload = updateIframeHeight;
  
  // Update height on navigation (for SPA-like behavior)
  document.addEventListener('DOMContentLoaded', () => {
    updateIframeHeight();
    
    // Watch for content changes
    const observer = new MutationObserver(() => {
      // Debounce height updates to avoid excessive messaging
      clearTimeout(window.heightUpdateTimeout);
      window.heightUpdateTimeout = setTimeout(updateIframeHeight, 100);
    });
    
    // Observe changes to the main content
    const mainContent = document.querySelector('main') || document.body;
    observer.observe(mainContent, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    });
    
    // Update height on window resize
    window.addEventListener('resize', updateIframeHeight);
    
    // Update height when inventory changes (items added/removed)
    window.addEventListener('item_added', updateIframeHeight);
    window.addEventListener('item_removed', updateIframeHeight);
    
    // Update height when language changes (content might change)
    window.addEventListener('language-changed', () => {
      setTimeout(updateIframeHeight, 200); // Wait for content to update
    });
  });
}

// Utility to manually trigger height update (useful for specific components)
export function triggerHeightUpdate() {
  if (typeof window === 'undefined') return;
  
  const height = document.body.scrollHeight;
  window.parent.postMessage({ iframeHeight: height }, "*");
}