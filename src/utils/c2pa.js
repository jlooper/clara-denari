// C2PA Content Authenticity Utility
import { createC2pa } from 'c2pa';

let c2paInstance = null;

/**
 * Initialize C2PA SDK
 */
export async function initializeC2PA() {
  try {
    if (!c2paInstance) {
      c2paInstance = await createC2pa({
        wasmSrc: '/c2pa-assets/toolkit_bg.wasm',
        workerSrc: '/c2pa-assets/c2pa.worker.min.js'
      });
    }
    return true;
  } catch (error) {
    console.error('Failed to initialize C2PA SDK:', error);
    return false;
  }
}

/**
 * Select producer from manifest
 * @param {Object} activeManifest - Active manifest data
 * @returns {Object|null} Producer information
 */
function selectProducer(activeManifest) {
  if (!activeManifest || !activeManifest.claim) return null;
  
  const assertions = activeManifest.claim.assertions || [];
  const producerAssertion = assertions.find(a => a.label === 'org.c2pa.actions.creative_work');
  
  if (producerAssertion && producerAssertion.data && producerAssertion.data.producer) {
    return producerAssertion.data.producer;
  }
  
  return null;
}

/**
 * Parse ISO date string to readable format
 * @param {string} isoString - ISO date string
 * @returns {string} Formatted date string
 */
function parseISO(isoString) {
  try {
    return new Date(isoString).toLocaleString();
  } catch (error) {
    return 'Invalid date';
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
      await initializeC2PA();
    }

    const result = await c2paInstance.read(source);
    
    // Check if there's an active manifest - try different possible structures
    const hasActiveManifest = result && (
      result.activeManifest || 
      (result.manifestStore && result.manifestStore.activeManifest && 
       (Array.isArray(result.manifestStore.activeManifest) ? result.manifestStore.activeManifest.length > 0 : true))
    );
    if (!hasActiveManifest) {
      return {
        hasActiveManifest: false,
        isValid: false,
        error: 'No active C2PA manifest found',
        rawResult: result
      };
    }

    // Get the active manifest from the correct structure
    const activeManifest = result.activeManifest || result.manifestStore?.activeManifest;
    
    
    // Check validation status from manifestStore
    const validationStatus = result.manifestStore?.validationStatus;
    const isValid = Array.isArray(validationStatus) ? validationStatus.length === 0 : validationStatus === 'Valid';
    
    // Get properties for display
    const properties = {
      title: activeManifest.title,
      format: activeManifest.format,
      claimGenerator: activeManifest.claimGenerator?.split('(')[0]?.trim(),
      producer: selectProducer(activeManifest)?.name ?? 'Unknown',
      thumbnail: `<img src="${source}" class="thumbnail" />`,
      ingredients: (activeManifest.ingredients ?? [])
        .map((i) => i.title)
        .join(', '),
      signatureIssuer: activeManifest.signatureInfo?.issuer,
      signatureDate: activeManifest.signatureInfo?.time
        ? parseISO(activeManifest.signatureInfo.time)
        : 'No date available',
    };
    
    return {
      hasActiveManifest: true,
      isValid: isValid,
      activeManifest: activeManifest,
      manifest: activeManifest,
      manifestStore: result.manifestStore, // Return the full manifestStore for web components
      verification: result,
      claims: activeManifest?.claim,
      ingredients: activeManifest?.ingredients || [],
      properties: properties, // Include the formatted properties
      error: !isValid ? 'Active manifest verification failed' : null,
      rawResult: result
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
 * Create a C2PA manifest for an image
 * @param {File} imageFile - Image file to add manifest to
 * @param {Object} claimData - Data to include in the manifest
 * @returns {Promise<Blob>} Image with embedded C2PA manifest
 */
export async function createManifest(imageFile, claimData = {}) {
  try {
    if (!c2paInstance) {
      await initializeC2PA();
    }

    // Note: Creating manifests requires additional setup and signing
    // This is a simplified version for demonstration
    console.warn('C2PA manifest creation requires additional setup for signing');
    return imageFile; // Return original file for now
  } catch (error) {
    console.error('Error creating C2PA manifest:', error);
    throw error;
  }
}

/**
 * Check if an image has C2PA manifest
 * @param {string|File|HTMLImageElement} source - Image source to check
 * @returns {Promise<boolean>} True if manifest exists
 */
export async function hasManifest(source) {
  try {
    if (!c2paInstance) {
      await initializeC2PA();
    }

    const result = await c2paInstance.read(source);
    return !!(result && result.manifest);
  } catch (error) {
    console.error('Error checking for C2PA manifest:', error);
    return false;
  }
}

/**
 * Get manifest information without verification
 * @param {string|File|HTMLImageElement} source - Image source
 * @returns {Promise<Object|null>} Manifest data or null
 */
export async function getManifestInfo(source) {
  try {
    if (!c2paInstance) {
      await initializeC2PA();
    }

    const result = await c2paInstance.read(source);
    
    if (!result || !result.manifest) {
      return null;
    }

    return {
      claim: result.manifest.claim,
      ingredients: result.manifest.ingredients || [],
      hasManifest: true
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
  if (!verificationResult.hasManifest) {
    element.innerHTML = '<span class="text-gray-500">No authenticity data</span>';
    element.className = 'text-gray-500 text-xs';
    return;
  }

  if (verificationResult.isValid) {
    element.innerHTML = '<span class="text-green-500">✓ Authentic</span>';
    element.className = 'text-green-500 text-xs font-medium';
  } else {
    element.innerHTML = '<span class="text-red-500">✗ Invalid</span>';
    element.className = 'text-red-500 text-xs font-medium';
  }
}

/**
 * Create a verification badge component
 * @param {Object} verificationResult - Result from verifyImage
 * @returns {string} HTML string for badge
 */
export function createVerificationBadge(verificationResult) {
  if (!verificationResult.hasManifest) {
    return '<div class="absolute -top-1 -right-1 w-3 h-3 bg-gray-500 rounded-full border border-white flex items-center justify-center"><span class="text-white text-xs font-bold">?</span></div>';
  }

  if (verificationResult.isValid) {
    return '<div class="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white flex items-center justify-center"><span class="text-white text-xs font-bold">✓</span></div>';
  } else {
    return '<div class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white flex items-center justify-center"><span class="text-white text-xs font-bold">✗</span></div>';
  }
}
