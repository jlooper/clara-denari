import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vue from '@astrojs/vue';

export default defineConfig({
  integrations: [tailwind(), vue()],
  site: 'https://github.com/jlooper/static-game-engine',
  title: 'Clara Denari Adventures',
  description: 'Clara Denari Adventures by Cloudinary'
}); 