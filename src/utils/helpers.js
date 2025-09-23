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
  
  window.onload = function() {
    const height = document.body.scrollHeight;
    window.parent.postMessage({ iframeHeight: height }, "*");
  };
}