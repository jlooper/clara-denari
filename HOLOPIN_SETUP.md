# Holopin Badge Integration Setup

This document explains how to set up Holopin badge rewards for the Clara Denari game.

## Overview

The game now includes integration with [Holopin](https://holopin.io) to issue digital badges when players complete challenges. Based on the [Holopin documentation](https://docs.holopin.io/issuing-rewards/regular-badges), players can earn badges for:

- Completing the entire game
- Completing individual labs
- Special achievements

## Setup Instructions

### 1. Create Holopin Account and Organization

1. Go to [Holopin.io](https://holopin.io) and create an account
2. Create an organization for your badges
3. Note your organization's API key from the settings

### 2. Create Badges

Create the following badges in your Holopin organization:

- **Game Completion Badge**: For completing the entire Clara Denari mystery
- **Lab Completion Badges**: One for each lab (Lab 1, Lab 2, Lab 3, Lab 4)
- **Optional Special Badges**: First transformation, speed run, etc.

### 3. Configure Badge IDs

1. Open `src/config/holopin.js`
2. Replace the placeholder sticker IDs with your actual badge IDs:

```javascript
export const holopinConfig = {
  apiKey: 'YOUR_ACTUAL_API_KEY_HERE',
  badges: {
    gameCompletion: 'YOUR_ACTUAL_GAME_COMPLETION_STICKER_ID',
    labCompletion: {
      1: 'YOUR_ACTUAL_LAB_1_STICKER_ID',
      2: 'YOUR_ACTUAL_LAB_2_STICKER_ID', 
      3: 'YOUR_ACTUAL_LAB_3_STICKER_ID',
      4: 'YOUR_ACTUAL_LAB_4_STICKER_ID'
    }
  }
};
```

### 4. Environment Variables (Optional)

For production, set your API key as an environment variable:

```bash
HOLOPIN_API_KEY=your_actual_api_key_here
```

### 5. Initialize the Service

The Holopin service is automatically initialized when the page loads. The service will:

- Initialize with your API key
- Make badge issuing functions available globally
- Handle reward notifications

## How It Works

### Game Completion Reward

When a player completes the game (collects all 5 items), the system:

1. Prompts for the player's email address
2. Calls the Holopin API to issue a completion badge
3. Shows a reward modal with the claim link
4. Optionally sends an email with the claim link

### Lab Completion Rewards

For each lab completion, you can add similar functionality by calling:

```javascript
await window.holopinService.issueLabCompletionBadge(email, labNumber);
```

### Reward Modal

The reward modal displays:

- Congratulations message
- Claim URL (copyable)
- Email notification status
- Direct link to claim the badge

## API Integration Details

The integration uses the [Holopin API](https://docs.holopin.io/issuing-rewards/regular-badges) with these endpoints:

- **Regular Badge Issuing**: `POST /api/sticker/share`
- **Custom Badge Issuing**: `POST /api/beta/coupon/` (for custom images)
- **Claim Status Check**: `GET /api/beta/coupon/`

## Features

- ✅ **Multi-language Support**: All reward messages support EN, FR, ES, PT-BR
- ✅ **Email Integration**: Automatic email sending with claim links
- ✅ **Copy to Clipboard**: Easy claim URL copying
- ✅ **Error Handling**: Graceful fallbacks if API is unavailable
- ✅ **Metadata Tracking**: Includes game version, achievement type, timestamp
- ✅ **Responsive Design**: Works on all screen sizes

## Testing

To test the integration:

1. Complete the game by collecting all items
2. You'll be prompted for an email address
3. The reward modal will appear with your badge claim link
4. Click "Claim Badge" to open Holopin and claim your badge

## Troubleshooting

### Common Issues

1. **"Holopin service not available"**: Check that the HolopinReward component is included in Layout.astro
2. **API errors**: Verify your API key and badge IDs are correct
3. **No email sent**: Check that the email parameter is provided in the API call

### Debug Mode

Enable console logging to see detailed information about badge issuing:

```javascript
// Check if service is initialized
console.log('Holopin service:', window.holopinService);

// Check configuration
console.log('Holopin config:', window.holopinConfig);
```

## Customization

### Adding New Achievement Types

1. Add new badge IDs to `holopinConfig.badges`
2. Create corresponding functions in `holopinService`
3. Add translations for new achievement messages
4. Integrate the reward calls in your game logic

### Custom Badge Images

Use the beta API for custom badge images:

```javascript
await window.holopinService.issueCustomBadge(stickerId, imageData, email, metadata);
```

## Security Notes

- Never expose your API key in client-side code for production
- Use environment variables or server-side proxy for API calls
- Validate email addresses before making API calls
- Consider rate limiting for badge issuing

## Support

For issues with the Holopin integration:

1. Check the [Holopin documentation](https://docs.holopin.io/issuing-rewards/regular-badges)
2. Verify your API key and badge IDs
3. Check browser console for error messages
4. Test with a simple badge issue first

---

**Note**: This integration follows the official Holopin API documentation and best practices for issuing regular badges via their REST API.
