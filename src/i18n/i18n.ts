// i18n utility functions
import { translations, defaultLanguage, supportedLanguages, type SupportedLanguage } from './translations';

class I18nManager {
  private currentLanguage: SupportedLanguage = defaultLanguage;
  private listeners: Array<(lang: SupportedLanguage) => void> = [];

  constructor() {
    // Initialize with default language to avoid hydration mismatches
    this.currentLanguage = defaultLanguage;
    this.setupLanguageChangeListener();
    
    // Load saved language preference after a delay to ensure hydration is complete
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const savedLang = this.getSavedLanguage();
        if (savedLang && savedLang !== this.currentLanguage) {
          this.changeLanguage(savedLang);
        }
      }, 200);
    }
  }

  /**
   * Get the current language
   */
  getCurrentLanguage(): SupportedLanguage {
    return this.currentLanguage;
  }

  /**
   * Get a translation for the current language
   */
  t(key: string): string {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }

    const text = translation[this.currentLanguage];
    if (!text) {
      console.warn(`Translation not found for key: ${key} in language: ${this.currentLanguage}`);
      return translation[defaultLanguage] || key;
    }

    return text;
  }

  /**
   * Get a translation for a specific language
   */
  tForLanguage(key: string, language: SupportedLanguage): string {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }

    const text = translation[language];
    if (!text) {
      console.warn(`Translation not found for key: ${key} in language: ${language}`);
      return translation[defaultLanguage] || key;
    }

    return text;
  }

  /**
   * Change the current language
   */
  changeLanguage(language: SupportedLanguage): void {
    if (!supportedLanguages.includes(language)) {
      console.warn(`Unsupported language: ${language}`);
      return;
    }

    if (this.currentLanguage === language) {
      return; // No change needed
    }

    this.currentLanguage = language;
    this.saveLanguage(language);
    this.notifyListeners(language);
    
    // Also dispatch the custom event for components that listen to it
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('language-changed', { 
        detail: { language: language } 
      }));
    }
    
    console.log(`Language changed to: ${language}`);
  }

  /**
   * Get all supported languages
   */
  getSupportedLanguages(): SupportedLanguage[] {
    return [...supportedLanguages];
  }

  /**
   * Check if a language is supported
   */
  isLanguageSupported(language: string): language is SupportedLanguage {
    return supportedLanguages.includes(language as SupportedLanguage);
  }

  /**
   * Subscribe to language changes
   */
  onLanguageChange(callback: (lang: SupportedLanguage) => void): () => void {
    this.listeners.push(callback);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  /**
   * Get saved language from localStorage
   */
  private getSavedLanguage(): SupportedLanguage | null {
    try {
      const saved = localStorage.getItem('preferred-language');
      if (saved && this.isLanguageSupported(saved)) {
        return saved as SupportedLanguage;
      }
    } catch (error) {
      console.warn('Failed to load saved language preference:', error);
    }
    return null;
  }

  /**
   * Save language preference to localStorage
   */
  private saveLanguage(language: SupportedLanguage): void {
    try {
      localStorage.setItem('preferred-language', language);
    } catch (error) {
      console.warn('Failed to save language preference:', error);
    }
  }

  /**
   * Setup listener for language change events from the UI
   */
  private setupLanguageChangeListener(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('language-changed', ((event: CustomEvent) => {
        const language = event.detail?.language;
        if (language && this.isLanguageSupported(language)) {
          this.changeLanguage(language);
        }
      }) as EventListener);
    }
  }

  /**
   * Notify all listeners of language change
   */
  private notifyListeners(language: SupportedLanguage): void {
    this.listeners.forEach(callback => {
      try {
        callback(language);
      } catch (error) {
        console.error('Error in language change callback:', error);
      }
    });
  }
}

// Create singleton instance
export const i18n = new I18nManager();

// Export convenience functions
export const t = (key: string): string => i18n.t(key);
export const tForLanguage = (key: string, language: SupportedLanguage): string => i18n.tForLanguage(key, language);
export const changeLanguage = (language: SupportedLanguage): void => i18n.changeLanguage(language);
export const getCurrentLanguage = (): SupportedLanguage => i18n.getCurrentLanguage();
export const onLanguageChange = (callback: (lang: SupportedLanguage) => void): (() => void) => i18n.onLanguageChange(callback);

// Export types
export type { SupportedLanguage };
export { supportedLanguages, defaultLanguage, languageNames } from './translations';
