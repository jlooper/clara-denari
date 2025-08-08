<template>
  <div class="cloudinary-sandbox">
    <div class="sandbox-header">
      <h3 class="text-green-500 text-lg font-bold mb-4" style="text-shadow: 0 0 5px rgba(0, 255, 0, 0.5);">
        Cloudinary Transformation Sandbox
      </h3>
    </div>
    
    <div class="sandbox-content">
      <!-- Input Section -->
      <div class="input-section mb-6">
        <div class="mb-4">
          <label class="block text-green-500 text-sm mb-2">Cloud Name:</label>
          <input 
            v-model="cloudName" 
            type="text" 
            class="w-full p-2 bg-black border border-green-500 text-green-500 rounded"
            placeholder="your-cloud-name"
          />
        </div>
        
        <div class="mb-4">
          <label class="block text-green-500 text-sm mb-2">Public ID:</label>
          <input 
            v-model="publicId" 
            type="text" 
            class="w-full p-2 bg-black border border-green-500 text-green-500 rounded"
            placeholder="sample"
          />
        </div>
        
        <div class="mb-4">
          <label class="block text-green-500 text-sm mb-2">Transformation:</label>
          <input 
            v-model="transformation" 
            type="text" 
            class="w-full p-2 bg-black border border-green-500 text-green-500 rounded font-mono text-sm"
            placeholder="c_scale,w_300,h_200,f_auto,q_auto"
          />
        </div>
        
        <div class="mb-4">
          <label class="block text-green-500 text-sm mb-2">Format:</label>
          <select 
            v-model="format" 
            class="w-full p-2 bg-black border border-green-500 text-green-500 rounded"
          >
            <option value="auto">Auto</option>
            <option value="jpg">JPG</option>
            <option value="png">PNG</option>
            <option value="webp">WebP</option>
            <option value="avif">AVIF</option>
          </select>
        </div>
      </div>
      

      
      <!-- URL Display -->
      <div class="url-section mb-6">
        <label class="block text-green-500 text-sm mb-2">Generated URL:</label>
        <div class="flex">
          <input 
            :value="generatedUrl" 
            type="text" 
            readonly
            class="flex-1 p-2 bg-black border border-green-500 text-green-500 rounded font-mono text-xs"
          />
          <button 
            @click="copyUrl"
            class="ml-2 px-3 py-2 bg-black border border-green-500 text-green-500 rounded hover:bg-green-900 transition-colors"
          >
            Copy
          </button>
        </div>
      </div>
      
      <!-- Preview Section -->
      <div class="preview-section">
        <h4 class="text-green-500 text-md font-bold mb-3">Preview:</h4>
        <div class="preview-container">
          <img 
            v-if="generatedUrl && !imageError" 
            :src="generatedUrl" 
            @error="handleImageError"
            @load="handleImageLoad"
            class="max-w-full border border-green-500 rounded"
            alt="Transformation preview"
          />
          <div v-else-if="imageError" class="p-4 bg-red-900 border border-red-500 text-red-500 rounded">
            Error loading image: {{ imageError }}
          </div>
          <div v-else class="p-4 bg-gray-900 border border-gray-500 text-gray-500 rounded">
            Enter parameters above to see preview
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';

export default {
  name: 'CloudinarySandbox',
  setup() {
    const cloudName = ref('demo');
    const publicId = ref('sample');
    const transformation = ref('c_scale,w_300,h_200,f_auto,q_auto');
    const format = ref('auto');
    const imageError = ref('');



    const generatedUrl = computed(() => {
      if (!cloudName.value || !publicId.value) return '';
      
      const baseUrl = `https://res.cloudinary.com/${cloudName.value}/image/upload`;
      const transformPath = transformation.value ? `/${transformation.value}` : '';
      const formatExt = format.value !== 'auto' ? `.${format.value}` : '';
      
      return `${baseUrl}${transformPath}/${publicId.value}${formatExt}`;
    });



    const copyUrl = async () => {
      try {
        await navigator.clipboard.writeText(generatedUrl.value);
        if (typeof window !== 'undefined' && window.showNotification) {
          window.showNotification('URL copied to clipboard!', 'success', 2000);
        } else {
          alert('URL copied to clipboard!');
        }
      } catch (err) {
        console.error('Failed to copy URL:', err);
      }
    };

    const handleImageError = (event) => {
      imageError.value = 'Failed to load image. Check your parameters.';
      console.error('Image load error:', event);
    };

    const handleImageLoad = () => {
      imageError.value = '';
    };

    // Watch for changes to reset error state
    watch([cloudName, publicId, transformation, format], () => {
      imageError.value = '';
    });

    return {
      cloudName,
      publicId,
      transformation,
      format,
      generatedUrl,
      imageError,
      copyUrl,
      handleImageError,
      handleImageLoad
    };
  }
};
</script>

<style scoped>
.cloudinary-sandbox {
  background: #000;
  border: 2px solid #00ff00;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(0, 255, 0, 0.1);
}

.sandbox-content {
  color: #00ff00;
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
}

.preview-container {
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

input, select {
  font-family: 'Courier New', monospace;
}

input:focus, select:focus {
  outline: none;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
}

button:hover {
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
}
</style> 