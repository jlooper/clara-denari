/**
 * Generate Cloudinary URL with watermark overlay
 * @param {string} baseImageUrl - The original Cloudinary image URL
 * @param {Object} options - Watermark options
 * @returns {string} - Cloudinary URL with watermark
 */
export function addCloudinaryWatermark(baseImageUrl, options = {}) {
  const {
    text = 'AI Generated',
    position = 'south_east',
    fontSize = 16,
    color = 'white',
    opacity = 70,
    fontFamily = 'Arial',
    fontWeight = 'bold'
  } = options;

  // Parse the existing Cloudinary URL
  const url = new URL(baseImageUrl);
  const pathParts = url.pathname.split('/');
  
  // Find the transformation part (usually after 'upload')
  const uploadIndex = pathParts.findIndex(part => part === 'upload');
  if (uploadIndex === -1) {
    console.warn('Not a valid Cloudinary URL');
    return baseImageUrl;
  }

  // Build the watermark overlay transformation
  const watermarkTransform = `l_text:${fontFamily}_${fontSize}_${fontWeight}:${encodeURIComponent(text)},co_${color},o_${opacity}`;
  
  // Insert the watermark transformation after 'upload'
  pathParts.splice(uploadIndex + 1, 0, watermarkTransform);
  
  // Reconstruct the URL
  url.pathname = pathParts.join('/');
  
  return url.toString();
}

/**
 * Add a logo watermark using Cloudinary
 * @param {string} baseImageUrl - The original Cloudinary image URL
 * @param {string} logoPublicId - Public ID of the logo image
 * @param {Object} options - Watermark options
 * @returns {string} - Cloudinary URL with logo watermark
 */
export function addCloudinaryLogoWatermark(baseImageUrl, logoPublicId, options = {}) {
  const {
    position = 'south_east',
    opacity = 70,
    width = 100,
    height = 50
  } = options;

  // Parse the existing Cloudinary URL
  const url = new URL(baseImageUrl);
  const pathParts = url.pathname.split('/');
  
  const uploadIndex = pathParts.findIndex(part => part === 'upload');
  if (uploadIndex === -1) {
    console.warn('Not a valid Cloudinary URL');
    return baseImageUrl;
  }

  // Build the logo overlay transformation
  const logoTransform = `l_${logoPublicId},w_${width},h_${height},o_${opacity},g_${position}`;
  
  // Insert the logo transformation after 'upload'
  pathParts.splice(uploadIndex + 1, 0, logoTransform);
  
  // Reconstruct the URL
  url.pathname = pathParts.join('/');
  
  return url.toString();
}

/**
 * Add a repeating watermark pattern
 * @param {string} baseImageUrl - The original Cloudinary image URL
 * @param {Object} options - Watermark options
 * @returns {string} - Cloudinary URL with repeating watermark
 */
export function addRepeatingWatermark(baseImageUrl, options = {}) {
  const {
    text = 'CONFIDENTIAL',
    opacity = 20,
    fontSize = 24,
    angle = 45
  } = options;

  const url = new URL(baseImageUrl);
  const pathParts = url.pathname.split('/');
  
  const uploadIndex = pathParts.findIndex(part => part === 'upload');
  if (uploadIndex === -1) {
    console.warn('Not a valid Cloudinary URL');
    return baseImageUrl;
  }

  // Build the repeating watermark transformation
  const watermarkTransform = `l_text:Arial_${fontSize}_bold:${encodeURIComponent(text)},o_${opacity},a_${angle},c_fill,w_auto,h_auto`;
  
  pathParts.splice(uploadIndex + 1, 0, watermarkTransform);
  
  url.pathname = pathParts.join('/');
  
  return url.toString();
}

/**
 * Check if an image is AI-generated and add appropriate watermark
 * @param {string} imageUrl - The image URL
 * @param {boolean} isAIGenerated - Whether the image is AI-generated
 * @returns {string} - Watermarked URL if needed
 */
export function addAIGeneratedWatermark(imageUrl, isAIGenerated = false) {
  if (!isAIGenerated || !imageUrl.includes('cloudinary.com')) {
    return imageUrl;
  }

  return addCloudinaryWatermark(imageUrl, {
    text: 'AI Generated',
    position: 'south_east',
    fontSize: 14,
    color: 'red',
    opacity: 80
  });
}