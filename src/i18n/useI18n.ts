// Vue composition function for i18n
import { ref, onMounted, onUnmounted } from 'vue';
import { i18n, type SupportedLanguage } from './i18n';

export function useI18n() {
  const currentLanguage = ref<SupportedLanguage>(i18n.getCurrentLanguage());
  
  // Create a reactive translation function
  const t = (key: string): string => {
    // This will re-run whenever currentLanguage changes
    const lang = currentLanguage.value;
    return i18n.t(key);
  };
  
  // Change language function
  const changeLanguage = (language: SupportedLanguage): void => {
    i18n.changeLanguage(language);
  };
  
  // Get supported languages
  const getSupportedLanguages = (): SupportedLanguage[] => {
    return i18n.getSupportedLanguages();
  };
  
  // Check if language is supported
  const isLanguageSupported = (language: string): language is SupportedLanguage => {
    return i18n.isLanguageSupported(language);
  };
  
  // Subscribe to language changes
  let unsubscribe: (() => void) | null = null;
  
  onMounted(() => {
    // Update current language
    currentLanguage.value = i18n.getCurrentLanguage();
    
    // Subscribe to language changes
    unsubscribe = i18n.onLanguageChange((language) => {
      currentLanguage.value = language;
    });
    
    // Also listen for the custom event
    const handleLanguageChange = (event: CustomEvent) => {
      currentLanguage.value = event.detail.language;
    };
    
    window.addEventListener('language-changed', handleLanguageChange as EventListener);
    
    // Cleanup function
    return () => {
      window.removeEventListener('language-changed', handleLanguageChange as EventListener);
    };
  });
  
  onUnmounted(() => {
    // Cleanup subscription
    if (unsubscribe) {
      unsubscribe();
    }
  });
  
  return {
    currentLanguage,
    t,
    changeLanguage,
    getSupportedLanguages,
    isLanguageSupported
  };
}
