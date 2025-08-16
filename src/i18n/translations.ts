// i18n translations for the game
export interface Translations {
  [key: string]: {
    en: string;
    fr: string;
    es: string;
    'pt-br': string;
  };
}

export const translations: Translations = {
  // Navigation
  'nav.home': {
    en: 'Home',
    fr: 'Accueil',
    es: 'Inicio',
    'pt-br': 'Início'
  },
  
  // Inventory
  'inventory.title': {
    en: 'Inventory',
    fr: 'Inventaire',
    es: 'Inventario',
    'pt-br': 'Inventário'
  },
  
  'inventory.lab': {
    en: 'Lab',
    fr: 'Laboratoire',
    es: 'Laboratorio',
    'pt-br': 'Laboratório'
  },
  
  'inventory.empty': {
    en: 'Sorry, there are no items here yet',
    fr: 'Désolé, il n\'y a pas encore d\'objets ici',
    es: 'Lo siento, aún no hay objetos aquí',
    'pt-br': 'Desculpe, ainda não há itens aqui'
  },
  
  // Sandbox
  'sandbox.title': {
    en: 'Transformation Lab',
    fr: 'Laboratoire de Transformation',
    es: 'Laboratorio de Transformación',
    'pt-br': 'Laboratório de Transformação'
  },
  
  'sandbox.description': {
    en: 'Test Cloudinary image transformations in real-time. Enter your cloud name, public ID, and transformation parameters to see the results.',
    fr: 'Testez les transformations d\'images Cloudinary en temps réel. Entrez votre nom de cloud, ID public et paramètres de transformation pour voir les résultats.',
    es: 'Prueba las transformaciones de imágenes de Cloudinary en tiempo real. Ingresa tu nombre de nube, ID público y parámetros de transformación para ver los resultados.',
    'pt-br': 'Teste transformações de imagens Cloudinary em tempo real. Digite seu nome de nuvem, ID público e parâmetros de transformação para ver os resultados.'
  },
  
  'sandbox.cloudName': {
    en: 'Cloud Name:',
    fr: 'Nom du Cloud :',
    es: 'Nombre de la Nube:',
    'pt-br': 'Nome da Nuvem:'
  },
  
  'sandbox.publicId': {
    en: 'Public ID:',
    fr: 'ID Public :',
    es: 'ID Público:',
    'pt-br': 'ID Público:'
  },
  
  'sandbox.transformation': {
    en: 'Transformation:',
    fr: 'Transformation :',
    es: 'Transformación:',
    'pt-br': 'Transformação:'
  },
  
  'sandbox.format': {
    en: 'Format:',
    fr: 'Format :',
    es: 'Formato:',
    'pt-br': 'Formato:'
  },
  
  'sandbox.generatedUrl': {
    en: 'Generated URL:',
    fr: 'URL Générée :',
    es: 'URL Generada:',
    'pt-br': 'URL Gerada:'
  },
  
  'sandbox.copy': {
    en: 'Copy',
    fr: 'Copier',
    es: 'Copiar',
    'pt-br': 'Copiar'
  },
  
  'sandbox.preview': {
    en: 'Preview:',
    fr: 'Aperçu :',
    es: 'Vista Previa:',
    'pt-br': 'Visualização:'
  },
  
  'sandbox.usageTips': {
    en: 'Usage Tips:',
    fr: 'Conseils d\'utilisation :',
    es: 'Consejos de uso:',
    'pt-br': 'Dicas de uso:'
  },
  
  'sandbox.tip1': {
    en: 'Use "demo" as cloud name and "sample" as public ID for testing',
    fr: 'Utilisez "demo" comme nom de cloud et "sample" comme ID public pour les tests',
    es: 'Usa "demo" como nombre de nube y "sample" como ID público para pruebas',
    'pt-br': 'Use "demo" como nome da nuvem e "sample" como ID público para testes'
  },
  
  'sandbox.tip2': {
    en: 'Try the preset buttons for common transformations',
    fr: 'Essayez les boutons prédéfinis pour les transformations courantes',
    es: 'Prueba los botones preestablecidos para transformaciones comunes',
    'pt-br': 'Experimente os botões predefinidos para transformações comuns'
  },
  
  'sandbox.tip3': {
    en: 'Transformation parameters follow Cloudinary\'s URL API format',
    fr: 'Les paramètres de transformation suivent le format de l\'API URL de Cloudinary',
    es: 'Los parámetros de transformación siguen el formato de la API URL de Cloudinary',
    'pt-br': 'Os parâmetros de transformação seguem o formato da API URL do Cloudinary'
  },
  
  'sandbox.tip4': {
    en: 'Examples: c_scale,w_300,h_200 or e_grayscale,c_fill,w_400,h_300',
    fr: 'Exemples : c_scale,w_300,h_200 ou e_grayscale,c_fill,w_400,h_300',
    es: 'Ejemplos: c_scale,w_300,h_200 o e_grayscale,c_fill,w_400,h_300',
    'pt-br': 'Exemplos: c_scale,w_300,h_200 ou e_grayscale,c_fill,w_400,h_300'
  },
  
  'sandbox.tip5': {
    en: 'The generated URL can be copied and used directly',
    fr: 'L\'URL générée peut être copiée et utilisée directement',
    es: 'La URL generada se puede copiar y usar directamente',
    'pt-br': 'A URL gerada pode ser copiada e usada diretamente'
  },
  
  // Footer
  'footer.copyright': {
    en: '© 2024 Cloudinary Game. All rights reserved.',
    fr: '© 2024 Jeu Cloudinary. Tous droits réservés.',
    es: '© 2024 Juego Cloudinary. Todos los derechos reservados.',
    'pt-br': '© 2024 Jogo Cloudinary. Todos os direitos reservados.'
  },
  
  // Common
  'common.loading': {
    en: 'Loading...',
    fr: 'Chargement...',
    es: 'Cargando...',
    'pt-br': 'Carregando...'
  },
  
  'common.error': {
    en: 'Error',
    fr: 'Erreur',
    es: 'Error',
    'pt-br': 'Erro'
  },
  
  'common.success': {
    en: 'Success',
    fr: 'Succès',
    es: 'Éxito',
    'pt-br': 'Sucesso'
  }
};

// Language codes mapping
export const languageNames = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
  'pt-br': 'Português (Brasil)'
};

// Default language
export const defaultLanguage = 'en';

// Supported languages
export const supportedLanguages = ['en', 'fr', 'es', 'pt-br'] as const;
export type SupportedLanguage = typeof supportedLanguages[number];
