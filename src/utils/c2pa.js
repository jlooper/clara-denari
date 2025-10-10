// C2PA Content Authenticity Utility - Official Implementation
import { createC2pa } from 'c2pa';

let c2paInstance = null;

/**
 * Initialize C2PA SDK with CDN sources to avoid CORS issues
 */
export async function initializeC2PA() {
  try {
    if (!c2paInstance) {
      c2paInstance = await createC2pa({
        wasmSrc: 'https://cdn.jsdelivr.net/npm/c2pa@0.30.15/dist/assets/wasm/toolkit_bg.wasm',
        workerSrc: 'https://cdn.jsdelivr.net/npm/c2pa@0.30.15/dist/c2pa.worker.min.js'
      });
    }
    return true;
  } catch (error) {
    console.error('Failed to initialize C2PA SDK:', error);
    return false;
  }
}

/**
 * Check for active C2PA manifest on an image
 * @param {string|File|HTMLImageElement} source - Image source to verify
 * @returns {Promise<Object>} Active manifest result
 */
export async function checkActiveManifest(source) {
  try {
    if (!c2paInstance) {
      const initialized = await initializeC2PA();
      if (!initialized || !c2paInstance) {
        return {
          hasActiveManifest: false,
          isValid: false,
          error: 'Failed to initialize C2PA SDK'
        };
      }
    }

    const result = await c2paInstance.read(source);
    
    // Check if there's an active manifest
    const hasActiveManifest = result && 
      result.manifestStore && 
      result.manifestStore.activeManifest;
    
    if (!hasActiveManifest) {
      return {
        hasActiveManifest: false,
        isValid: false,
        error: 'No active C2PA manifest found'
      };
    }

    // Get validation status
    const validationStatus = result.manifestStore.validationStatus;
    const isValid = Array.isArray(validationStatus) ? validationStatus.length === 0 : true;
    
    return {
      hasActiveManifest: true,
      isValid: isValid,
      activeManifest: result.manifestStore.activeManifest,
      manifestStore: result.manifestStore,
      validation: validationStatus,
      error: null
    };
  } catch (error) {
    console.error('Error checking active C2PA manifest:', error);
    return {
      hasActiveManifest: false,
      isValid: false,
      error: error.message || 'Unknown error during verification'
    };
  }
}

/**
 * Verify C2PA manifest on an image (legacy function for compatibility)
 * @param {string|File|HTMLImageElement} source - Image source to verify
 * @returns {Promise<Object>} Verification result
 */
export async function verifyImage(source) {
  return await checkActiveManifest(source);
}

/**
 * Check if an image has C2PA manifest
 * @param {string|File|HTMLImageElement} source - Image source to check
 * @returns {Promise<boolean>} True if manifest exists
 */
export async function hasManifest(source) {
  try {
    const result = await checkActiveManifest(source);
    return result.hasActiveManifest;
  } catch (error) {
    console.error('Error checking for C2PA manifest:', error);
    return false;
  }
}

/**
 * Get manifest information
 * @param {string|File|HTMLImageElement} source - Image source
 * @returns {Promise<Object|null>} Manifest data or null
 */
export async function getManifestInfo(source) {
  try {
    const result = await checkActiveManifest(source);
    
    if (!result.hasActiveManifest) {
      return null;
    }

    return {
      hasManifest: true,
      isValid: result.isValid,
      activeManifest: result.activeManifest,
      manifestStore: result.manifestStore
    };
  } catch (error) {
    console.error('Error reading C2PA manifest:', error);
    return null;
  }
}

/**
 * Display C2PA verification status in UI
 * @param {HTMLElement} element - Element to update
 * @param {Object} verificationResult - Result from verifyImage
 */
export function displayVerificationStatus(element, verificationResult) {
  if (!verificationResult.hasActiveManifest) {
    element.innerHTML = '<span class="text-gray-500">No C2PA data</span>';
    element.className = 'text-gray-500 text-xs';
    return;
  }

  if (verificationResult.isValid) {
    element.innerHTML = '<span class="text-green-500">✓ Verified</span>';
    element.className = 'text-green-500 text-xs font-medium';
  } else {
    element.innerHTML = '<span class="text-red-500">✗ Invalid</span>';
    element.className = 'text-red-500 text-xs font-medium';
  }
}