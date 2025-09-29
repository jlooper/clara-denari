/**
 * Holopin Badge Service
 * Handles issuing badges through the Holopin API
 * Documentation: https://docs.holopin.io/issuing-rewards/regular-badges
 */

class HolopinService {
  constructor() {
    this.apiKey = null;
    this.baseUrl = 'https://www.holopin.io/api';
    this.betaUrl = 'https://www.holopin.io/api/beta';
  }

  /**
   * Initialize the service with API key
   * @param {string} apiKey - Your Holopin organization API key
   */
  initialize(apiKey) {
    this.apiKey = apiKey;
  }

  /**
   * Issue a regular badge to a recipient
   * @param {string} stickerId - The ID of the badge to issue
   * @param {string} email - Recipient's email address (optional)
   * @param {string} metadata - Optional metadata for the badge
   * @returns {Promise<Object>} Response with coupon details
   */
  async issueBadge(stickerId, email = null, metadata = null) {
    if (!this.apiKey) {
      throw new Error('Holopin API key not initialized');
    }

    const url = `${this.baseUrl}/sticker/share?id=${stickerId}&apiKey=${this.apiKey}`;
    
    const body = {};
    if (email) body.email = email;
    if (metadata) body.metadata = metadata;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error issuing Holopin badge:', error);
      throw error;
    }
  }

  /**
   * Issue a badge with custom image (Beta API)
   * @param {string} stickerId - The ID of the badge to issue
   * @param {string} image - Base64 encoded image or image URL
   * @param {string} email - Recipient's email address (optional)
   * @param {string} metadata - Optional metadata for the badge
   * @returns {Promise<Object>} Response with coupon details
   */
  async issueCustomBadge(stickerId, image, email = null, metadata = null) {
    if (!this.apiKey) {
      throw new Error('Holopin API key not initialized');
    }

    const url = `${this.betaUrl}/coupon/?id=${stickerId}&apiKey=${this.apiKey}`;
    
    const body = {};
    if (email) body.email = email;
    if (image) body.image = image;
    if (metadata) body.metadata = metadata;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error issuing custom Holopin badge:', error);
      throw error;
    }
  }

  /**
   * Check if a badge has been claimed
   * @param {string} couponId - The coupon ID to check
   * @returns {Promise<Object>} Claim status information
   */
  async checkClaimStatus(couponId) {
    if (!this.apiKey) {
      throw new Error('Holopin API key not initialized');
    }

    const url = `${this.betaUrl}/coupon/?id=${couponId}&apiKey=${this.apiKey}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error checking Holopin claim status:', error);
      throw error;
    }
  }

  /**
   * Generate claim URL for a coupon
   * @param {string} couponId - The coupon ID
   * @returns {string} The claim URL
   */
  generateClaimUrl(couponId) {
    return `https://holopin.io/claim/${couponId}`;
  }

  /**
   * Issue a badge for game completion
   * @param {string} email - Player's email address
   * @returns {Promise<Object>} Badge issue response
   */
  async issueGameCompletionBadge(email) {
    // Replace with your actual sticker ID for game completion badge
    const stickerId = 'YOUR_GAME_COMPLETION_STICKER_ID';
    const metadata = JSON.stringify({
      game: 'clara-denari',
      achievement: 'game-completion',
      timestamp: new Date().toISOString()
    });

    return await this.issueBadge(stickerId, email, metadata);
  }

  /**
   * Issue a badge for lab completion
   * @param {string} email - Player's email address
   * @param {number} labNumber - Lab number (1-4)
   * @returns {Promise<Object>} Badge issue response
   */
  async issueLabCompletionBadge(email, labNumber) {
    // Replace with your actual sticker IDs for lab completion badges
    const stickerIds = {
      1: 'YOUR_LAB_1_STICKER_ID',
      2: 'YOUR_LAB_2_STICKER_ID',
      3: 'YOUR_LAB_3_STICKER_ID',
      4: 'YOUR_LAB_4_STICKER_ID'
    };

    const stickerId = stickerIds[labNumber];
    if (!stickerId) {
      throw new Error(`Invalid lab number: ${labNumber}`);
    }

    const metadata = JSON.stringify({
      game: 'clara-denari',
      achievement: 'lab-completion',
      labNumber: labNumber,
      timestamp: new Date().toISOString()
    });

    return await this.issueBadge(stickerId, email, metadata);
  }
}

// Create singleton instance
const holopinService = new HolopinService();

export default holopinService;
