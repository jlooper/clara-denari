<template>
  <div 
    v-if="showWidget" 
    class="steganography-widget fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
  >
    <div class="bg-gray-900 border-2 border-blue-600 rounded-lg max-w-2xl w-full p-6 shadow-2xl">
      <!-- Header -->
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-2xl font-bold text-blue-400 shadow-lg">
          {{ title }}
        </h3>
        <button 
          @click="closeWidget"
          class="text-gray-400 hover:text-red-400 text-2xl font-bold transition-colors"
        >
          ×
        </button>
      </div>
      
      <!-- Instructions -->
      <div class="mb-6">
        <p class="text-gray-200 text-lg leading-relaxed mb-4">
          {{ instructions }}
        </p>
        
        <!-- Steganography Image -->
        <div class="mb-4">
          <div class="bg-gray-800 border border-gray-600 rounded-lg p-4">
            <h4 class="text-blue-400 font-bold mb-3 text-center">Hidden Message Image</h4>
            <div class="flex justify-center">
              <img 
                :src="imageUrl" 
                alt="Image with hidden steganography message"
                class="max-w-full h-auto rounded-lg border border-gray-500 shadow-lg"
                style="max-height: 300px;"
              />
            </div>
            <p class="text-gray-400 text-sm text-center mt-2">
              Right-click to download this image for steganography analysis
            </p>
            <div class="text-center mt-3">
              <a 
                href="https://stylesuxx.github.io/steganography/" 
                target="_blank" 
                class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
                Open Steganography Decoder
              </a>
            </div>
          </div>
        </div>
        
       
      </div>
      
      <!-- Input Form -->
      <div class="mb-6">
        <label class="block text-gray-200 text-lg font-bold mb-3">
          {{ inputLabel }}
        </label>
        <input 
          v-model="inputValue"
          type="text"
          :placeholder="inputPlaceholder"
          class="w-full p-4 bg-gray-800 border-2 border-blue-600 text-gray-200 rounded-lg text-lg focus:border-blue-400 focus:outline-none"
          @keyup.enter="submitAnswer"
          :disabled="isSubmitting"
        />
      </div>
      
      <!-- Submit Button -->
      <div class="flex justify-center">
        <button 
          v-if="!showContinueButton"
          @click="submitAnswer"
          :disabled="isSubmitting || !inputValue.trim()"
          class="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors font-bold text-lg"
        >
          {{ isSubmitting ? checkingText : submitButton }}
        </button>
        
        <!-- Continue Button (shown after correct answer) -->
        <button 
          v-if="showContinueButton"
          @click="continueToFinalPage"
          class="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors font-bold text-lg"
        >
          {{ continueButton }}
        </button>
      </div>
      
      <!-- Result Message -->
      <div v-if="resultMessage" class="mt-4 p-4 rounded-lg" :class="resultClass">
        <p class="font-bold">{{ resultMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { translations } from '../i18n/translations.ts'

const props = defineProps({
  correctAnswer: {
    type: String,
    default: 'Ronan Park Well'
  },
  imageUrl: {
    type: String,
    default: 'https://res.cloudinary.com/claradenari/image/upload/v1759201796/clara-denari/encoded_image_cd_w3femn_pxfrbt.png'
  }
})

const showWidget = ref(false)
const inputValue = ref('')
const isSubmitting = ref(false)
const resultMessage = ref('')
const resultClass = ref('')
const showContinueButton = ref(false)

// Language state
const currentLanguage = ref('en')

// Translation functions
const getCurrentLanguage = () => {
  return localStorage.getItem('preferred-language') || 'en'
}

const getTranslation = (key) => {
  const lang = getCurrentLanguage()
  // Portuguese fallback to English for poor translations
  const fallbackLang = lang === 'pt-br' ? 'en' : lang
  return translations[key]?.[fallbackLang] || translations[key]?.en || key
}

// Computed properties for translations
const title = computed(() => getTranslation('steganography.title'))
const instructions = computed(() => getTranslation('steganography.instructions'))
const hintHtml = computed(() => {
  const hint = getTranslation('steganography.hint')
  return hint
})
const inputLabel = computed(() => getTranslation('steganography.input_label'))
const inputPlaceholder = computed(() => getTranslation('steganography.input_placeholder'))
const submitButton = computed(() => getTranslation('steganography.submit_button'))
const checkingText = computed(() => getTranslation('steganography.checking'))
const continueButton = computed(() => getTranslation('steganography.continue_button'))

const submitAnswer = () => {
  if (!inputValue.value.trim() || isSubmitting.value) return
  
  isSubmitting.value = true
  
  // Simulate checking delay
  setTimeout(() => {
    const userAnswer = inputValue.value.trim()
    const correctAnswer = props.correctAnswer
    
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      resultMessage.value = getTranslation('steganography.correct')
      resultClass.value = 'bg-green-900 border border-green-500 text-green-200'
      
      // Show continue button instead of auto-closing
      setTimeout(() => {
        showContinueButton.value = true
      }, 1000)
    } else {
      resultMessage.value = getTranslation('steganography.incorrect')
      resultClass.value = 'bg-red-900 border border-red-500 text-red-200'
      
      // Clear input and reset after delay
      setTimeout(() => {
        inputValue.value = ''
        resultMessage.value = ''
        isSubmitting.value = false
      }, 3000)
    }
  }, 1000)
}

const continueToFinalPage = () => {
  // Navigate to the final page
  window.location.href = '/the_well'
}

const closeWidget = () => {
  showWidget.value = false
  // Reset form
  inputValue.value = ''
  resultMessage.value = ''
  isSubmitting.value = false
  showContinueButton.value = false
}


onMounted(() => {
  // Listen for item collection events
  window.addEventListener('item_added', (event) => {
    if (event.detail && event.detail.itemId === '5') {
      // Show widget after a short delay to allow notification to appear first
      setTimeout(() => {
        showWidget.value = true
      }, 2000)
    }
  })
  
  // Listen for language changes
  const handleLanguageChange = () => {
    currentLanguage.value = getCurrentLanguage()
  }
  
  window.addEventListener('language-changed', handleLanguageChange)
  document.addEventListener('language-changed', handleLanguageChange)
  
  // Initial language setup
  currentLanguage.value = getCurrentLanguage()
})

onUnmounted(() => {
  window.removeEventListener('item_added', checkMirrorCollected)
  window.removeEventListener('language-changed', handleLanguageChange)
  document.removeEventListener('language-changed', handleLanguageChange)
})
</script>

<style scoped>
.steganography-widget {
  backdrop-filter: blur(5px);
}

/* Custom scrollbar for the widget */
.steganography-widget::-webkit-scrollbar {
  width: 8px;
}

.steganography-widget::-webkit-scrollbar-track {
  background: rgba(139, 69, 19, 0.2);
  border-radius: 4px;
}

.steganography-widget::-webkit-scrollbar-thumb {
  background: rgba(139, 69, 19, 0.6);
  border-radius: 4px;
}

.steganography-widget::-webkit-scrollbar-thumb:hover {
  background: rgba(139, 69, 19, 0.8);
}
</style>
