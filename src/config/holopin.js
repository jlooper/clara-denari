/**
 * Holopin Configuration
 * Configure your Holopin badge IDs and API settings here
 */

export const holopinConfig = {
  // Your Holopin organization API key
  // Get this from your Holopin organization settings
  apiKey: process.env.HOLOPIN_API_KEY || 'YOUR_HOLOPIN_API_KEY_HERE',
  
  // Badge sticker IDs for different achievements
  // You can find these in the URL of your badge pages on Holopin
  badges: {
    // Game completion badge
    gameCompletion: 'YOUR_GAME_COMPLETION_STICKER_ID',
    
    // Lab completion badges
    labCompletion: {
      1: 'YOUR_LAB_1_STICKER_ID',
      2: 'YOUR_LAB_2_STICKER_ID', 
      3: 'YOUR_LAB_3_STICKER_ID',
      4: 'YOUR_LAB_4_STICKER_ID'
    },
    
    // Optional: Special achievement badges
    firstTransformation: 'YOUR_FIRST_TRANSFORMATION_STICKER_ID',
    allLabsCompleted: 'YOUR_ALL_LABS_STICKER_ID',
    speedRun: 'YOUR_SPEED_RUN_STICKER_ID'
  },
  
  // Default settings
  settings: {
    // Whether to send email notifications by default
    sendEmailByDefault: true,
    
    // Whether to show reward modal immediately
    showModalImmediately: true,
    
    // Custom metadata to include with all badges
    defaultMetadata: {
      game: 'clara-denari',
      version: '1.0.0',
      platform: 'web'
    }
  }
};

/**
 * Initialize Holopin service with configuration
 * Call this in your main application setup
 */
export function initializeHolopin() {
  if (typeof window !== 'undefined' && window.holopinService) {
    window.holopinService.initialize(holopinConfig.apiKey);
    console.log('Holopin service initialized');
  }
}

/**
 * Get badge ID for a specific achievement
 * @param {string} achievement - Achievement type
 * @param {number} labNumber - Lab number (for lab completions)
 * @returns {string} Badge sticker ID
 */
export function getBadgeId(achievement, labNumber = null) {
  switch (achievement) {
    case 'gameCompletion':
      return holopinConfig.badges.gameCompletion;
    case 'labCompletion':
      if (labNumber && holopinConfig.badges.labCompletion[labNumber]) {
        return holopinConfig.badges.labCompletion[labNumber];
      }
      return null;
    case 'firstTransformation':
      return holopinConfig.badges.firstTransformation;
    case 'allLabsCompleted':
      return holopinConfig.badges.allLabsCompleted;
    case 'speedRun':
      return holopinConfig.badges.speedRun;
    default:
      return null;
  }
}

/**
 * Create metadata for a badge
 * @param {string} achievement - Achievement type
 * @param {Object} additionalData - Additional data to include
 * @returns {string} JSON stringified metadata
 */
export function createBadgeMetadata(achievement, additionalData = {}) {
  const metadata = {
    ...holopinConfig.settings.defaultMetadata,
    achievement,
    timestamp: new Date().toISOString(),
    ...additionalData
  };
  
  return JSON.stringify(metadata);
}
