<template>
  <div class="c2pa-web-component" v-if="showComponent">
    <div class="popover-container" ref="popoverContainer">
      <!-- C2PA web components will be inserted here -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  imageSrc: {
    type: String,
    required: true
  },
  position: {
    type: String,
    default: 'top-left'
  },
  size: {
    type: String,
    default: 'medium'
  }
})

const verificationResult = ref(null)
const manifestStore = ref(null)
const loading = ref(true)
const popoverContainer = ref(null)
const showComponent = ref(false)

// Import C2PA functions
let createC2pa = null
let generateVerifyUrl = null

const getPositionStyle = () => {
  const positions = {
    'top-left': 'top: 10px; left: 10px;',
    'top-right': 'top: 10px; right: 10px;',
    'bottom-left': 'bottom: 10px; left: 10px;',
    'bottom-right': 'bottom: 10px; right: 10px;',
    'center': 'top: 50%; left: 50%; transform: translate(-50%, -50%);'
  }
  return positions[props.position] || positions['top-left']
}

const createPopover = () => {
  if (!popoverContainer.value) return
  
  // Check if custom elements are defined
  const hasIndicator = customElements.get('cai-indicator')
  const hasPopover = customElements.get('cai-popover')
  const hasManifestSummary = customElements.get('cai-manifest-summary-v2')
  
  if (!hasIndicator || !hasPopover || !hasManifestSummary) {
    console.warn('C2PA web components not loaded')
    return
  }
  
  const positionStyle = getPositionStyle()
  
  // Create the C2PA popover with indicator
  const popoverHTML = `
    <cai-popover interactive style="position: absolute; ${positionStyle} z-index: 20;" placement="bottom-start">
      <cai-indicator slot="trigger" variant="info"></cai-indicator>
      <cai-manifest-summary-v2 style="width: 350px; max-height: 500px;" locale="en-US" slot="content"></cai-manifest-summary-v2>
    </cai-popover>
  `
  
  popoverContainer.value.innerHTML = popoverHTML
  
  // Set manifest data if available
  if (manifestStore.value) {
    setTimeout(() => {
      const manifestSummary = popoverContainer.value.querySelector('cai-manifest-summary-v2')
      if (manifestSummary) {
        manifestSummary.manifestStore = manifestStore.value
        
        // Set inspect URL if generateVerifyUrl is available
        if (generateVerifyUrl) {
          manifestSummary.inspectUrl = generateVerifyUrl(props.imageSrc)
        }
      }
    }, 100)
  }
}

const verifyImage = async () => {
  try {
    loading.value = true
    
    if (!createC2pa) {
      console.warn('C2PA SDK not initialized')
      return
    }
    
    // Create C2PA instance
    const c2pa = await createC2pa({
      wasmSrc: 'https://cdn.jsdelivr.net/npm/c2pa@0.30.14/dist/assets/wasm/toolkit_bg.wasm',
      workerSrc: 'https://cdn.jsdelivr.net/npm/c2pa@0.30.14/dist/c2pa.worker.min.js'
    })
    
    // Read the manifest from the image
    const result = await c2pa.read(props.imageSrc)
    
    // Check if there's an active manifest
    if (result && result.manifestStore && result.manifestStore.activeManifest) {
      verificationResult.value = {
        hasActiveManifest: true,
        isValid: true
      }
      manifestStore.value = result.manifestStore
      showComponent.value = true
      
      // Create the popover UI
      await new Promise(resolve => setTimeout(resolve, 100))
      createPopover()
    }
  } catch (error) {
    console.error('C2PA verification error:', error)
    verificationResult.value = {
      hasActiveManifest: false,
      isValid: false,
      error: error.message
    }
    showComponent.value = false
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  // Import C2PA libraries
  if (typeof window !== 'undefined') {
    try {
      // Import c2pa-wc web components
      await import('c2pa-wc')
      
      // Import C2PA SDK
      const c2paModule = await import('c2pa')
      createC2pa = c2paModule.createC2pa
      generateVerifyUrl = c2paModule.generateVerifyUrl
      
      // Wait for web components to be defined
      await Promise.all([
        customElements.whenDefined('cai-indicator'),
        customElements.whenDefined('cai-popover'),
        customElements.whenDefined('cai-manifest-summary-v2')
      ])
      
      // Verify the image
      await verifyImage()
    } catch (error) {
      console.error('Failed to load C2PA libraries:', error)
    }
  }
})

onUnmounted(() => {
  // Cleanup
  if (popoverContainer.value) {
    popoverContainer.value.innerHTML = ''
  }
})
</script>

<style scoped>
.c2pa-web-component {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 20;
}

.popover-container {
  position: relative;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

/* Allow C2PA components to be clickable */
.c2pa-web-component :deep(cai-popover),
.c2pa-web-component :deep(cai-indicator),
.c2pa-web-component :deep(cai-manifest-summary-v2) {
  pointer-events: auto !important;
}

/* C2PA indicator styling */
.c2pa-web-component :deep(cai-indicator) {
  cursor: pointer;
}

/* Size variants */
.c2pa-web-component[data-size="small"] :deep(cai-indicator) {
  --cai-indicator-size: 24px;
}

.c2pa-web-component[data-size="medium"] :deep(cai-indicator) {
  --cai-indicator-size: 32px;
}

.c2pa-web-component[data-size="large"] :deep(cai-indicator) {
  --cai-indicator-size: 48px;
}
</style>