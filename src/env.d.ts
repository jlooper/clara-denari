/// <reference path="../.astro/types.d.ts" />

declare global {
  interface Window {
    holopinService: any;
    showHolopinReward: (badgeData: any) => void;
    openAboutModal: () => void;
  }
}

export {};