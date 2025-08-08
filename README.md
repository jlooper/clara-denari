# Interactive Story Engine

An interactive story/game engine converted from VuePress to Astro.

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
git clone https://github.com/jlooper/static-game-engine.git
cd static-game-engine
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

## Conversion Notes

This project was converted from VuePress to Astro with the following changes:

- **Vue Components → Astro Components**: All Vue components were converted to Astro components
- **Vue Router → Astro Pages**: Navigation is now handled by Astro's file-based routing
- **Vuex → Local Storage**: State management simplified to use browser localStorage
- **VuePress Theme → Custom Layout**: Custom theme converted to Astro layout system
- **Build System**: VuePress build system replaced with Astro's build system

## Technologies Used

- **Astro**: Static site generator
- **Tailwind CSS**: Utility-first CSS framework
- **JavaScript**: Client-side interactivity
- **Local Storage**: State persistence

## License

MIT License - see LICENSE file for details.
