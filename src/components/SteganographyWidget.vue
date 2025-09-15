<template>
  <div 
    v-if="showWidget" 
    class="steganography-widget fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
  >
    <div class="bg-gray-900 border-2 border-blue-600 rounded-lg max-w-2xl w-full p-6 shadow-2xl">
      <!-- Header -->
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-2xl font-bold text-blue-400 shadow-lg">
          Steganography Decoder
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
          You've discovered a hidden message in the image! Use the steganography decoder to reveal the secret text, then enter the decoded message below to continue your investigation.
        </p>
        
        <div class="bg-blue-900 bg-opacity-30 border border-blue-500 rounded p-4 mb-4">
          <p class="text-blue-200 text-sm">
            <strong>Hint:</strong> Download <a href="https://res.cloudinary.com/dr60nybtj/image/upload/v1757944359/encoded_image_cd_w3femn.png" target="_blank">this image</a> and use 
            <a href="https://www.desmondcheong.com/projects/code/steganography/decode" 
               target="_blank" 
               class="text-blue-400 hover:text-blue-300 underline">
              this steganography decoder</a> to reveal the hidden message.
          </p>
        </div>
      </div>
      
      <!-- Input Form -->
      <div class="mb-6">
        <label class="block text-gray-200 text-lg font-bold mb-3">
          Enter the decoded message:
        </label>
        <input 
          v-model="inputValue"
          type="text"
          placeholder="Type the hidden message here..."
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
          {{ isSubmitting ? 'Checking...' : 'Submit Answer' }}
        </button>
        
        <!-- Continue Button (shown after correct answer) -->
        <button 
          v-if="showContinueButton"
          @click="continueToFinalPage"
          class="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors font-bold text-lg"
        >
          Continue to Final Location
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
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  correctAnswer: {
    type: String,
    default: 'Ronan Park Well'
  }
})

const showWidget = ref(false)
const inputValue = ref('')
const isSubmitting = ref(false)
const resultMessage = ref('')
const resultClass = ref('')
const showContinueButton = ref(false)

const submitAnswer = () => {
  if (!inputValue.value.trim() || isSubmitting.value) return
  
  isSubmitting.value = true
  
  // Simulate checking delay
  setTimeout(() => {
    const userAnswer = inputValue.value.trim()
    const correctAnswer = props.correctAnswer
    
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      resultMessage.value = '✓ Correct! You\'ve decoded the hidden message successfully!'
      resultClass.value = 'bg-green-900 border border-green-500 text-green-200'
      
      // Show continue button instead of auto-closing
      setTimeout(() => {
        showContinueButton.value = true
      }, 1000)
    } else {
      resultMessage.value = '✗ Incorrect. Please try again. Make sure you\'re using the steganography decoder correctly.'
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

const checkMirrorCollected = () => {
  // Check if mirror (item 5) has been collected
  const inventoryItems = JSON.parse(localStorage.getItem('inventory_item') || '{}')
  if (inventoryItems['5'] === true) {
    showWidget.value = true
  }
}

onMounted(() => {
  // Check initially
  checkMirrorCollected()
  
  // Listen for item collection events
  window.addEventListener('item_added', (event) => {
    if (event.detail && event.detail.itemId === '5') {
      // Show widget after a short delay to allow notification to appear first
      setTimeout(() => {
        showWidget.value = true
      }, 2000)
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('item_added', checkMirrorCollected)
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
