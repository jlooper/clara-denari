# Clara Denari Adventure Stories

An interactive story/game engine for a choose-your-own adventure experience introducing technical topics and innovative products.

## Features

- **Interactive Storytelling**: Navigate through story pages with custom components
- **Inventory System**: Collect and manage items throughout the adventure
- **Responsive Design**: Works on desktop and mobile devices
- **Modern Tech Stack**: Built with Astro, Vue and Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jlooper/clara-denari.git
cd clara-denari
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:4321`

## Project Structure

```
src/
├── components/          # Reusable Astro components
│   ├── Nav.astro       # Navigation component
│   ├── Inventory.astro # Inventory management
│   ├── Page.astro      # Page navigation component
│   ├── Item.astro      # Interactive item component
│   └── Footer.astro    # Footer component
├── layouts/            # Page layouts
│   └── Layout.astro    # Main layout with backdrop support
├── pages/              # Story pages
│   ├── index.astro     # Home page
│   ├── 1.astro         # Story page 1
│   └── 2.astro         # Story page 2
├── data/               # Game data
│   └── items.json      # Item definitions
└── utils/              # Utility functions
    └── helpers.js      # Inventory management helpers
```

## Game Components

### Page Component
Used for navigation between story pages:
```astro
<Page url="1" instructions="" action="Press the button" condition="none" />
```

### Item Component
Used for interactive items that can be collected:
```astro
<Item id="1" />
```

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.


## Google Analytics Setup

To enable Google Analytics tracking:

1. **Create a Google Analytics Account**:
   - Visit [Google Analytics](https://analytics.google.com/analytics/web/)
   - Create a new GA4 property for your website

2. **Get Your Tracking ID**:
   - In Google Analytics, go to Admin → Data Streams
   - Select your web stream
   - Copy the Measurement ID (format: G-XXXXXXXXXX)

3. **Set Environment Variable**:
   - Create a `.env` file in your project root
   - Add your tracking ID:
   ```bash
   PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX
   ```

4. **Deploy**:
   - The Google Analytics script will automatically be included on all pages
   - Analytics will start tracking once deployed

## Technologies Used

- **Astro**: Static site generator
- **Tailwind CSS**: Utility-first CSS framework
- **JavaScript**: Client-side interactivity
- **Local Storage**: State persistence

## License

MIT License - see LICENSE file for details.
