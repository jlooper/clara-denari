<template>
  <!-- Debug: Always show a test div to verify component is working -->
  <!--<div class="c2pa-web-component-debug" style="position: absolute; top: 0; left: 0; background: red; color: white; padding: 2px; font-size: 10px; z-index: 9999;">
    C2PA Component: {{ showComponent ? 'SHOW' : 'HIDE' }} | Loading: {{ loading }} | Has Manifest: {{ verificationResult?.hasActiveManifest }}
  </div>-->
  
      <div class="c2pa-web-component" v-if="showComponent">
        <div class="popover-container" ref="popoverContainer">
          <!-- Popover will be created dynamically here -->
        </div>
      </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { checkActiveManifest } from '../utils/c2pa.js'

// Custom elements (cai-*) are configured in astro.config.mjs

// Import C2PA functions for proper manifest handling
let createC2pa, generateVerifyUrl, getManifestSummaryStore

const props = defineProps({
  imageSrc: {
    type: String,
    required: true
  },
  position: {
    type: String,
    default: 'bottom-right'
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

// Watch for manifestStore changes to update the cai-manifest-summary-v2
watch(manifestStore, (newManifestStore) => {
  if (newManifestStore && popoverContainer.value) {
    
    const updateManifestData = () => {
      const manifestSummary = popoverContainer.value.querySelector('cai-manifest-summary-v2')
      if (manifestSummary) {
        try {
              // Use getManifestSummaryStore for proper formatting
              if (getManifestSummaryStore && newManifestStore) {
                const formattedManifestStore = getManifestSummaryStore(newManifestStore)
                manifestSummary.manifestStore = formattedManifestStore
              } else {
                manifestSummary.manifestStore = newManifestStore
              }
              
              // Set inspectUrl for verification
              if (generateVerifyUrl && props.imageSrc) {
                const inspectUrl = generateVerifyUrl(props.imageSrc)
                manifestSummary.inspectUrl = inspectUrl
              }
          
          // Set as attribute for compatibility
          manifestSummary.setAttribute('manifest-store', JSON.stringify(newManifestStore))
          
          // Set individual properties
          if (newManifestStore.manifests) {
            manifestSummary.manifests = newManifestStore.manifests
          }
          if (newManifestStore.activeManifest) {
            manifestSummary.activeManifest = newManifestStore.activeManifest
          }
          if (newManifestStore.validationStatus) {
            manifestSummary.validationStatus = newManifestStore.validationStatus
          }
          
          // Force update
          if (typeof manifestSummary.requestUpdate === 'function') {
            manifestSummary.requestUpdate()
          }
          
              // Dispatch custom event
              manifestSummary.dispatchEvent(new CustomEvent('manifestStoreChanged', {
                detail: newManifestStore
              }))
        } catch (error) {
          console.error('Error updating manifestStore:', error)
        }
      }
    }
    
    // Try updating multiple times to ensure it works
    updateManifestData()
    setTimeout(updateManifestData, 100)
    setTimeout(updateManifestData, 300)
  }
}, { deep: true })

const showComponent = computed(() => {
  return verificationResult.value?.hasActiveManifest || false
})

const indicatorVariant = computed(() => {
  if (!verificationResult.value) return 'info-light'
  
  if (verificationResult.value.isValid) {
    return 'info-light'
  } else if (verificationResult.value.error) {
    return 'error'
  } else {
    return 'warning'
  }
})

const createPopover = () => {
  if (!popoverContainer.value) {
    console.log('❌ C2PA Web Component: popoverContainer not available')
    return
  }
  
  console.log('🔧 C2PA Web Component: Creating popover dynamically')
  
  // Clear existing content
  popoverContainer.value.innerHTML = ''
  
  // Check if required custom elements are defined
  const hasIndicator = customElements.get('cai-indicator')
  const hasPopover = customElements.get('cai-popover')
  const hasManifestSummary = customElements.get('cai-manifest-summary-v2')
  
  if (!hasIndicator || !hasPopover || !hasManifestSummary) {
    console.error('❌ C2PA Web Component: Required custom elements not defined', {
      caiIndicator: !!hasIndicator,
      caiPopover: !!hasPopover,
      caiManifestSummaryV2: !!hasManifestSummary
    })
    return
  }
  
  // Determine position based on props
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

  // Create the popover structure positioned over the image
  const positionStyle = getPositionStyle()
  console.log('🎯 C2PA Web Component: Position style:', positionStyle)
  
  const popoverHTML = `
    <cai-popover interactive style="position: absolute; ${positionStyle} z-index: 10;" placement="bottom-start">
      <cai-indicator slot="trigger"></cai-indicator>
      <cai-manifest-summary-v2 style="width: 300px" locale="en-US" slot="content"></cai-manifest-summary-v2>
    </cai-popover>
  `
  
  console.log('🔧 C2PA Web Component: Creating popover HTML:', popoverHTML)
  popoverContainer.value.innerHTML = popoverHTML
  
  // Debug: Check if popover was created
  const createdPopover = popoverContainer.value.querySelector('cai-popover')
  console.log('🔍 C2PA Web Component: Popover created:', !!createdPopover)
  if (createdPopover) {
    console.log('🔍 C2PA Web Component: Popover style:', createdPopover.style.cssText)
    console.log('🔍 C2PA Web Component: Popover interactive:', createdPopover.getAttribute('interactive'))
    
    // Add click event listener for debugging
    createdPopover.addEventListener('click', (e) => {
      console.log('🖱️ C2PA Web Component: Popover clicked!', e)
    })
    
    // Check if indicator is clickable
    const indicator = createdPopover.querySelector('cai-indicator')
    if (indicator) {
      console.log('🔍 C2PA Web Component: Indicator found:', !!indicator)
      indicator.addEventListener('click', (e) => {
        console.log('🖱️ C2PA Web Component: Indicator clicked!', e)
      })
    }
  }
  
  // Set the manifestStore on the manifest summary with proper timing and multiple attempts
  const setManifestData = () => {
    const manifestSummary = popoverContainer.value.querySelector('cai-manifest-summary-v2')
    if (manifestSummary && manifestStore.value) {
      try {
        console.log('🔧 C2PA Web Component: Setting manifestStore:', manifestStore.value)
        console.log('🔧 C2PA Web Component: manifestStore keys:', Object.keys(manifestStore.value || {}))
        
        // Try multiple approaches to set the manifest data
        const approaches = [
          // Approach 1: Use getManifestSummaryStore for proper formatting
          () => {
            if (getManifestSummaryStore && manifestStore.value) {
              const formattedManifestStore = getManifestSummaryStore(manifestStore.value)
              manifestSummary.manifestStore = formattedManifestStore
              console.log('✅ Set via getManifestSummaryStore:', formattedManifestStore)
            } else {
              manifestSummary.manifestStore = manifestStore.value
              console.log('✅ Set via manifestStore property (fallback)')
            }
          },
          // Approach 2: Set inspectUrl for verification
          () => {
            if (generateVerifyUrl && props.imageSrc) {
              const inspectUrl = generateVerifyUrl(props.imageSrc)
              manifestSummary.inspectUrl = inspectUrl
              console.log('✅ Set inspectUrl:', inspectUrl)
            }
          },
          // Approach 3: Set as attribute for compatibility
          () => {
            manifestSummary.setAttribute('manifest-store', JSON.stringify(manifestStore.value))
            console.log('✅ Set via manifest-store attribute')
          },
          // Approach 4: Set individual properties
          () => {
            if (manifestStore.value.manifests) {
              manifestSummary.manifests = manifestStore.value.manifests
            }
            if (manifestStore.value.activeManifest) {
              manifestSummary.activeManifest = manifestStore.value.activeManifest
            }
            if (manifestStore.value.validationStatus) {
              manifestSummary.validationStatus = manifestStore.value.validationStatus
            }
            console.log('✅ Set individual properties')
          }
        ]
        
        // Try each approach
        approaches.forEach((approach, index) => {
          try {
            approach()
          } catch (error) {
            console.warn(`⚠️ Approach ${index + 1} failed:`, error)
          }
        })
        
        // Force a re-render if the component has update methods
        if (typeof manifestSummary.requestUpdate === 'function') {
          manifestSummary.requestUpdate()
          console.log('✅ Called requestUpdate')
        }
        
        // Try to trigger any lifecycle methods
        if (typeof manifestSummary.connectedCallback === 'function') {
          manifestSummary.connectedCallback()
          console.log('✅ Called connectedCallback')
        }
        
        // Try to dispatch a custom event to notify the component
        manifestSummary.dispatchEvent(new CustomEvent('manifestStoreChanged', {
          detail: manifestStore.value
        }))
        console.log('✅ Dispatched manifestStoreChanged event')
        
        console.log('✅ C2PA Web Component: Set manifestStore on cai-manifest-summary-v2')
      } catch (error) {
        console.error('❌ C2PA Web Component: Error setting manifestStore:', error)
      }
    } else {
      console.warn('⚠️ C2PA Web Component: manifestSummary or manifestStore not available', {
        manifestSummary: !!manifestSummary,
        manifestStore: !!manifestStore.value
      })
    }
  }
  
  // Try setting the manifest data multiple times with increasing delays
  setTimeout(setManifestData, 100)
  setTimeout(setManifestData, 300)
  setTimeout(setManifestData, 500)
  setTimeout(setManifestData, 1000)
  
  // Also ensure the popover is properly initialized after a delay
  setTimeout(() => {
    const popover = popoverContainer.value.querySelector('cai-popover')
    const indicator = popover?.querySelector('cai-indicator')
    
    if (popover) {
      console.log('🔧 C2PA Web Component: Ensuring popover is interactive')
      
      // Force set interactive attribute
      popover.setAttribute('interactive', 'true')
      
      // Set popover placement to appear underneath and to the right
      popover.setAttribute('placement', 'bottom-start')
      
      // Try alternative placement attributes
      popover.setAttribute('position', 'bottom-start')
      popover.setAttribute('align', 'start')
      
      // Ensure it's visible and clickable
      popover.style.pointerEvents = 'auto'
      popover.style.cursor = 'pointer'
      
      // Make sure indicator is also clickable
      if (indicator) {
        indicator.style.pointerEvents = 'auto'
        indicator.style.cursor = 'pointer'
        console.log('🔧 C2PA Web Component: Indicator made clickable')
      }
      
      // Try to trigger any initialization methods if they exist
      if (typeof popover.connectedCallback === 'function') {
        popover.connectedCallback()
      }
      
      // Dispatch a custom event to notify the popover it's ready
      popover.dispatchEvent(new CustomEvent('cai-popover-ready', {
        detail: { manifestStore: manifestStore.value }
      }))
      
      console.log('✅ C2PA Web Component: Popover initialization completed')
    }
  }, 500)
  
  // Additional attempt after a longer delay to ensure web components are fully loaded
  setTimeout(() => {
    const popover = popoverContainer.value.querySelector('cai-popover')
    if (popover) {
      console.log('🔧 C2PA Web Component: Final popover check')
      
      // Check if popover has any shadow DOM or internal structure
      if (popover.shadowRoot) {
        console.log('🔍 C2PA Web Component: Popover has shadow DOM')
      }
      
      // Force a re-render
      if (typeof popover.requestUpdate === 'function') {
        popover.requestUpdate()
      }
    }
  }, 1500)
  
  console.log('✅ C2PA Web Component: Created popover dynamically')
}

// Manifest summary is handled by cai-manifest-summary-v2 within the popover

const verifyImage = async () => {
  try {
    loading.value = true
    console.log('🔍 C2PA Web Component: Verifying image:', props.imageSrc)
    
    const result = await checkActiveManifest(props.imageSrc)
    console.log('📋 C2PA Web Component: Verification result:', result)
    console.log('📋 C2PA Web Component: result.manifestStore:', result.manifestStore)
    console.log('📋 C2PA Web Component: result.manifestStore keys:', Object.keys(result.manifestStore || {}))
    console.log('📋 C2PA Web Component: result.manifestStore.activeManifest:', result.manifestStore?.activeManifest)
    console.log('📋 C2PA Web Component: result.manifestStore.manifests:', result.manifestStore?.manifests)
    console.log('📋 C2PA Web Component: result.manifestStore.validationStatus:', result.manifestStore?.validationStatus)
    
    verificationResult.value = result
    manifestStore.value = result.manifestStore
    
    console.log('✅ C2PA Web Component: showComponent will be:', result.hasActiveManifest)
    
    // Create the popover if we have an active manifest
    if (result.hasActiveManifest) {
      // Wait for next tick to ensure DOM is updated
      await new Promise(resolve => setTimeout(resolve, 100))
      createPopover()
    }
  } catch (error) {
    console.error('❌ C2PA Web Component: Error verifying image:', error)
    verificationResult.value = {
      hasActiveManifest: false,
      isValid: false,
      error: error.message
    }
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  // Suppress C2PA animation errors globally and permanently
  const originalError = console.error
  const originalWarn = console.warn
  
  const suppressC2PAErrors = (...args) => {
    const message = args[0]
    if (typeof message === 'string' && (
      message.includes('Invalid keyframe value for property transform') ||
      message.includes('NaN NaN') ||
      message.includes('c2pa-wc.js') ||
      message.includes('keyframe')
    )) {
      // Suppress C2PA animation errors permanently
      return
    }
    originalError.apply(console, args)
  }
  
  console.error = suppressC2PAErrors

  // Add global error handler for unhandled errors
  const handleError = (event) => {
    if (event.error && event.error.message && 
        (event.error.message.includes('Invalid keyframe value for property transform') ||
         event.error.message.includes('NaN'))) {
      event.preventDefault()
      return false
    }
  }
  
  window.addEventListener('error', handleError)

  // Disable CSS animations globally for C2PA components
  const style = document.createElement('style')
  style.textContent = `
    cai-popover *, cai-indicator *, cai-manifest-summary-v2 * {
      animation: none !important;
      transition: none !important;
      transform: none !important;
    }
  `
  document.head.appendChild(style)

  // Import C2PA libraries only on client side
  if (typeof window !== 'undefined') {
    console.log('📦 C2PA Web Component: Importing C2PA libraries...')
    try {
      // Import c2pa-wc for web components
      await import('c2pa-wc')
      console.log('✅ C2PA Web Component: c2pa-wc imported successfully')
      
      // Import C2PA core functions
      const c2paModule = await import('c2pa')
      createC2pa = c2paModule.createC2pa
      generateVerifyUrl = c2paModule.generateVerifyUrl
      
      // Import getManifestSummaryStore from c2pa-wc
      const c2paWcModule = await import('c2pa-wc')
      getManifestSummaryStore = c2paWcModule.getManifestSummaryStore
      
      console.log('✅ C2PA Web Component: All C2PA functions imported successfully')
      console.log('🔍 C2PA Web Component: Available custom elements:', 
        customElements.get('cai-indicator') ? 'cai-indicator ✓' : 'cai-indicator ✗',
        customElements.get('cai-popover') ? 'cai-popover ✓' : 'cai-popover ✗',
        customElements.get('cai-manifest-summary-v2') ? 'cai-manifest-summary-v2 ✓' : 'cai-manifest-summary-v2 ✗'
      )
    } catch (error) {
      console.error('❌ C2PA Web Component: Failed to import C2PA libraries:', error)
    }
  }
  
  verifyImage()
  
  // Keep error suppression active
  console.error = suppressC2PAErrors
})

onUnmounted(() => {
  // Cleanup if needed
})
</script>

<style scoped>
.c2pa-web-component {
  position: relative;
  display: inline-block;
}

/* C2PA web components styling according to UX specifications */

/* Ensure proper display of C2PA components */
cai-popover {
  display: block;
}

cai-indicator {
  display: inline-block;
}

cai-manifest-summary-v2 {
  display: block;
  min-width: 300px;
}

/* Size variants for cai-indicator */
.c2pa-web-component[data-size="small"] cai-indicator {
  --cai-indicator-size: 24px;
}

.c2pa-web-component[data-size="medium"] cai-indicator {
  --cai-indicator-size: 32px;
}

.c2pa-web-component[data-size="large"] cai-indicator {
  --cai-indicator-size: 48px;
}

    /* Ensure proper positioning for the popover */
    .c2pa-web-component [style*="position: relative"] {
      position: relative !important;
    }

    /* Position the popover container over the image */
    .c2pa-web-component {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .c2pa-web-component .popover-container {
      position: relative;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    /* Allow the popover and its children to be clickable */
    .c2pa-web-component cai-popover,
    .c2pa-web-component cai-indicator,
    .c2pa-web-component cai-manifest-summary-v2 {
      pointer-events: auto !important;
    }

    /* Ensure the popover container allows clicks for its children */
    .c2pa-web-component .popover-container cai-popover {
      pointer-events: auto !important;
    }

    /* Position the popover content underneath and to the right of the badge */
    .c2pa-web-component cai-popover::part(content) {
      position: absolute !important;
      top: 100% !important;
      left: 0 !important;
      margin-top: 5px !important;
      z-index: 1000 !important;
    }

    /* Alternative approach - target the popover content directly */
    .c2pa-web-component cai-popover [slot="content"] {
      position: absolute !important;
      top: 100% !important;
      left: 0 !important;
      margin-top: 5px !important;
      z-index: 1000 !important;
    }

    /* Force popover positioning with CSS custom properties */
    .c2pa-web-component cai-popover {
      --cai-popover-placement: bottom-start !important;
      --cai-popover-offset: 5px !important;
    }

    /* Try to override popover positioning with CSS */
    .c2pa-web-component cai-popover .popover-content,
    .c2pa-web-component cai-popover .content,
    .c2pa-web-component cai-popover [role="tooltip"] {
      position: absolute !important;
      top: 100% !important;
      left: 0 !important;
      margin-top: 5px !important;
      z-index: 1000 !important;
    }
</style>
