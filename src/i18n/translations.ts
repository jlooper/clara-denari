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
  // Game title
  'game.title': {
    en: 'Clara Denari and the Mysterious Transformations',
    fr: 'Clara Denari et les Transformations Mystérieuses',
    es: 'Clara Denari y las Transformaciones Misteriosas',
    'pt-br': 'Clara Denari e as Transformações Misteriosas'
  },

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
  },

  // Story texts
  'story.index': {
    en: 'The hooded figure was almost indistinguishable from the gloom that surrounded it as it crept stealthily through the grass behind the abandoned mansion. It crouched next to the old stone well and drew a small object from under its coat. Quickly it tossed the metal box down the long, damp shaft, listening attentively to the dull \'plunk\' as it reached the bottom.\'That should keep it nice and safe\', chortled the figure grimly, and it glided away, melting into the shadows of the moonlit night. <br/><br/> Clara Denari, master detective, was reading a newspaper and eating breakfast when her pager started to beep urgently. \'Code 404\' - that meant trouble. Hastily gulping down her coffee and bagel, Clara put a few tools into her bag, buckled on her utility belt, and shrugged her coat over her shoulders. There was no telling what the problem might be, she thought, as she headed to headquarters.',
    fr: 'La silhouette encapuchonnée était presque indiscernable de l\'obscurité qui l\'entourait alors qu\'elle se faufilait furtivement dans l\'herbe derrière le manoir abandonné. Elle s\'accroupit près du vieux puits de pierre et sortit un petit objet de sous son manteau. Rapidement, elle jeta la boîte métallique dans le long puits humide, écoutant attentivement le \'plouf\' sourd quand elle atteignit le fond. \'Ça devrait le garder bien au chaud\', ricana sinistrement la figure, qui s\'éloigna en glissant, se fondant dans les ombres de la nuit éclairée par la lune. <br/><br/> Clara Denari, détective de renom, lisait un journal et prenait son petit-déjeuner quand son bip a commencé à sonner de façon urgente. \'Code 404\' - cela signifiait des ennuis. Avalant précipitamment son café et son bagel, Clara mit quelques outils dans son sac, boucla sa ceinture utilitaire et enfila sa veste. Il était impossible de dire quel pourrait être le problème, pensa-t-elle, en se dirigeant vers le quartier général.',
    es: 'La figura encapuchada era casi indistinguible de la penumbra que la rodeaba mientras se arrastraba sigilosamente por la hierba detrás de la mansión abandonada. Se agachó junto al viejo pozo de piedra y sacó un pequeño objeto de debajo de su abrigo. Rápidamente arrojó la caja metálica por el largo y húmedo pozo, escuchando atentamente el \'plop\' sordo cuando llegó al fondo. \'Eso debería mantenerlo bien guardado\', rió sombríamente la figura, y se deslizó, fundiéndose en las sombras de la noche iluminada por la luna. <br/><br/> Clara Denari, detective maestra, estaba leyendo un periódico y desayunando cuando su buscapersonas empezó a pitar urgentemente. \'Código 404\' - eso significaba problemas. Tragando apresuradamente su café y bagel, Clara metió algunas herramientas en su bolso, se abrochó el cinturón de utilidades y se puso su abrigo. No había manera de saber cuál podría ser el problema, pensó, mientras se dirigía al cuartel general.',
    'pt-br': 'A figura encapuzada era quase indistinguível da escuridão que a rodeava enquanto rastejava furtivamente pela grama atrás da mansão abandonada. Ela se agachou ao lado do antigo poço de pedra e tirou um pequeno objeto de debaixo do casaco. Rapidamente jogou a caixa de metal pelo longo e úmido poço, ouvindo atentamente o \'ploft\' surdo quando atingiu o fundo. \'Isso deve mantê-lo bem guardado\', gargalhou sombriamente a figura, e deslizou para longe, fundindo-se nas sombras da noite iluminada pela lua. <br/><br/> Clara Denari, detetive mestra, estava lendo um jornal e tomando café da manhã quando seu bip começou a apitar urgentemente. \'Código 404\' - isso significava problemas. Engolindo rapidamente seu café e bagel, Clara colocou algumas ferramentas em sua bolsa, apertou o cinto de utilidades e vestiu o casaco. Não havia como saber qual poderia ser o problema, pensou ela, enquanto se dirigia ao quartel-general.'
  },

  'story.purloined_property': {
    en: 'When Clara arrived, the Director was tapping his foot. "It\'s that sticky-fingered kleptomaniac, Dr. Oscuro again". "What\'s he pilfered this time?" Clara asked, sighing. This particular thief had a penchant for sending detectives chasing around the globe to find where he hid his ill-gotten gains. He also had a notoriously terrible memory, and tended to steal things, then forget where he hid them, leaving a trail of clues to jog his own memory. "He broke into the National Bank," said the Director grimly, " and managed to spirit away a valuable jewelled necklace belonging to madame here". <br/><br/>For the first time Clara noticed a lady in a mink coat standing in the corner, quietly tearing a damp handkerchief to shreds. "I\'m sorry that your property has been stolen," said Clara, "but rest assured, we\'ll get it back." As the lady burst into relieved tears, the Director handed Clara an envelope. "Inside this envelope you\'ll find a small bit of evidence tying the crime to Dr. Oscuro."',
    fr: 'Quand Clara arriva, le Directeur tapait du pied. "C\'est encore ce kleptomane aux doigts agiles, Dr. Oscuro". "Qu\'est-ce qu\'il a volé cette fois ?" demanda Clara en soupirant. Ce voleur particulier avait la fâcheuse tendance d\'envoyer les détectives courir autour du globe pour trouver où il avait caché ses gains mal acquis. Il avait aussi une mémoire notoirement terrible, et avait tendance à voler des choses, puis à oublier où il les avait cachées, laissant une piste de indices pour rafraîchir sa propre mémoire. "Il a fait effraction dans la Banque Nationale," dit le Directeur d\'un air sombre, " et a réussi à faire disparaître un collier de bijoux précieux appartenant à madame ici". <br/><br/>Pour la première fois Clara remarqua une dame en manteau de vison debout dans le coin, déchirant silencieusement un mouchoir humide en lambeaux. "Je suis désolée que votre propriété ait été volée," dit Clara, "mais soyez assurée, nous la récupérerons." Alors que la dame éclatait en larmes de soulagement, le Directeur tendit une enveloppe à Clara. "Dans cette enveloppe vous trouverez un petit bout de preuve liant le crime au Dr. Oscuro."',
    es: 'Cuando Clara llegó, el Director estaba golpeteando su pie. "Es ese cleptómano de dedos pegajosos, Dr. Oscuro otra vez". "¿Qué se ha llevado esta vez?" preguntó Clara, suspirando. Este ladrón particular tenía la costumbre de enviar detectives persiguiendo por todo el mundo para encontrar dónde había escondido sus ganancias mal habidas. También tenía una memoria notoriamente terrible, y tendía a robar cosas, luego olvidar dónde las había escondido, dejando un rastro de pistas para refrescar su propia memoria. "Entró por la fuerza en el Banco Nacional," dijo el Director sombríamente, " y logró hacer desaparecer un valioso collar de joyas que pertenecía a la señora aquí". <br/><br/>Por primera vez Clara notó a una dama con abrigo de visón parada en la esquina, rompiendo silenciosamente un pañuelo húmedo en pedazos. "Lamento que su propiedad haya sido robada," dijo Clara, "pero tenga la seguridad de que la recuperaremos." Mientras la dama estallaba en lágrimas de alivio, el Director le entregó un sobre a Clara. "Dentro de este sobre encontrará una pequeña evidencia que vincula el crimen al Dr. Oscuro."',
    'pt-br': 'Quando Clara chegou, o Diretor estava batendo o pé. "É aquele cleptomaníaco de dedos pegajosos, Dr. Oscuro novamente". "O que ele roubou desta vez?" Clara perguntou, suspirando. Este ladrão particular tinha uma propensão a enviar detetives correndo ao redor do globo para encontrar onde ele havia escondido seus ganhos mal adquiridos. Ele também tinha uma memória notoriamente terrível, e tendia a roubar coisas, depois esquecer onde as havia escondido, deixando um rastro de pistas para refrescar sua própria memória. "Ele invadiu o Banco Nacional," disse o Diretor sombriamente, " e conseguiu fazer desaparecer um valioso colar de joias pertencente à madame aqui". <br/><br/>Pela primeira vez Clara notou uma senhora com casaco de vison parada no canto, rasgando silenciosamente um lenço úmido em pedaços. "Sinto muito que sua propriedade tenha sido roubada," disse Clara, "mas tenha certeza de que a recuperaremos." Enquanto a senhora explodia em lágrimas de alívio, o Diretor entregou um envelope para Clara. "Dentro deste envelope você encontrará um pequeno pedaço de evidência ligando o crime ao Dr. Oscuro."'
  },

  'story.sticky_paper': {
    en: 'Clara frowned at the paper scrap. At first glance, she thought it was scorched, but as she lifted it closer to the light, she caught a faint sweet scent.<br/><br/>"This isn\'t smoke damage," she murmured. "It\'s… molasses?"<br/><br/>Clara\'s eyes widened. "Of course. The Great Molasses Flood of 1919. That sticky tide swept through the North End decades ago. Some warehouses still smell of it when the summer heat hits."<br/><br/>Clara traced the paper with her finger. "This means Oscuro must have been hiding out near where the old molasses tanks used to be. If that\'s where he handled this paper… then the next clue is close by."',
    fr: 'Clara fronça les sourcils en regardant le morceau de papier. Au premier coup d\'œil, elle pensait qu\'il était brûlé, mais en le soulevant plus près de la lumière, elle capta une douce odeur.<br/><br/>"Ce n\'est pas des dégâts de fumée," murmura-t-elle. "C\'est… de la mélasse ?"<br/><br/>Les yeux de Clara s\'élargirent. "Bien sûr. La Grande Inondation de Mélasse de 1919. Cette marée collante a balayé le North End il y a des décennies. Certains entrepôts en sentent encore quand la chaleur estivale arrive."<br/><br/>Clara traça le papier du doigt. "Cela signifie qu\'Oscuro devait se cacher près des anciens réservoirs de mélasse. Si c\'est là qu\'il a manipulé ce papier… alors le prochain indice est tout près."',
    es: 'Clara frunció el ceño al mirar el pedazo de papel. A primera vista, pensó que estaba chamuscado, pero al levantarlo más cerca de la luz, percibió un aroma dulce y tenue.<br/><br/>"Esto no es daño por humo," murmuró. "¿Es… melaza?"<br/><br/>Los ojos de Clara se abrieron de par en par. "Por supuesto. La Gran Inundación de Melaza de 1919. Esa marea pegajosa arrasó el North End hace décadas. Algunos almacenes aún huelen a eso cuando llega el calor del verano."<br/><br/>Clara trazó el papel con su dedo. "Esto significa que Oscuro debió haberse escondido cerca de los antiguos tanques de melaza. Si ahí es donde manipuló este papel… entonces la próxima pista está cerca."',
    'pt-br': 'Clara franziu a testa ao olhar o pedaço de papel. À primeira vista, ela pensou que estava queimado, mas ao levantá-lo mais perto da luz, ela percebeu um aroma doce e sutil.<br/><br/>"Isso não é dano por fumaça," ela murmurou. "É… melaço?"<br/><br/>Os olhos de Clara se arregalaram. "Claro. A Grande Inundação de Melaço de 1919. Aquela maré pegajosa varreu o North End décadas atrás. Alguns armazéns ainda cheiram a isso quando o calor do verão chega."<br/><br/>Clara traçou o papel com o dedo. "Isso significa que Oscuro deve ter se escondido perto dos antigos tanques de melaço. Se foi aí que ele manuseou este papel… então a próxima pista está próxima."'
  },

  'story.north_end': {
    en: 'There was no sign of the old molasses tank now, so many years later, and the gathering darkness of the night revealed abandoned swingsets in the park where the former factory stood.<br/><br/>Clara walked around, looking for any clues, and her foot caught in a loop of something, almost making her trip. Looking down, she saw a grimy piece of string on the ground.',
    fr: 'Il n\'y avait aucun signe de l\'ancien réservoir de mélasse maintenant, tant d\'années plus tard, et l\'obscurité grandissante de la nuit révélait des balançoires abandonnées dans le parc où se dressait autrefois l\'usine.<br/><br/>Clara se promena, cherchant des indices, et son pied se prit dans une boucle de quelque chose, la faisant presque trébucher. En regardant en bas, elle vit un morceau de ficelle crasseuse sur le sol.',
    es: 'No había señal del antiguo tanque de melaza ahora, tantos años después, y la oscuridad creciente de la noche revelaba columpios abandonados en el parque donde se alzaba la antigua fábrica.<br/><br/>Clara caminó alrededor, buscando pistas, y su pie se enganchó en un lazo de algo, casi haciéndola tropezar. Mirando hacia abajo, vio un pedazo de cuerda sucia en el suelo.',
    'pt-br': 'Não havia sinal do antigo tanque de melaço agora, tantos anos depois, e a escuridão crescente da noite revelava balanços abandonados no parque onde a antiga fábrica ficava.<br/><br/>Clara caminhou ao redor, procurando por pistas, e seu pé se enganchou em um laço de algo, quase fazendo-a tropeçar. Olhando para baixo, ela viu um pedaço de barbante sujo no chão.'
  },

  'story.pastry_shop': {
    en: 'The famous bakery where delicious sweets are boxed with blue and white striped twine, Mike\'s Pastry, was easy to find in the neighborhood. Surprisingly, there was no line and Clara walked to the counter, observing the array of pastry for sale. The lady at the front looked Clara up and down, and then, with a sly smile, said, "you\'ll be wanting a cannoli, I presume?"<br/><br/>"Certainly," Clara replied. The lady handed her a cannoli neatly wrapped in a napkin.', 
    fr: 'La célèbre boulangerie où les délices sucrés sont emballés avec un cordon de laine bleu et blanc, Mike\'s Pastry, était facile à trouver dans le quartier. Surprenamment, il n\'y avait pas de file et Clara se rendit au comptoir, observant l\'étal des pâtisseries à vendre. La dame à l\'avant la regarda de haut en bas, et puis, avec un sourire malicieux, dit, "vous allez vouloir un cannoli, je suppose?"<br/><br/>"Bien sûr," Clara répondit. La dame lui tendit un cannoli bien emballé dans un mouchoir.',
    es: 'La famosa panadería donde deliciosas dulces se empaquetan con un cordón de lana azul y blanco, Mike\'s Pastry, era fácil de encontrar en el barrio. Sorprendentemente, no había cola y Clara se acercó al mostrador, observando el estante de pasteles a la venta. La señora que estaba adelante la miró de arriba abajo, y luego, con un guiño, dijo, "usted va a querer un cannoli, supongo?"<br/><br/>"Claro," Clara respondió. La señora le entregó un cannoli bien empaquetado en un pañuelo.',
    'pt-br': 'A famosa padaria onde doces deliciosos são embalados com um cordão de lã azul e branco, Mike\'s Pastry, era fácil de encontrar no bairro. Surpreendentemente, não havia fila e Clara se aproximou ao balcão, observando o estante de doces à venda. A senhora que estava à frente a olhou de cima para baixo, e então, com um sorriso malicioso, disse, "você vai querer um cannoli, suponho?"<br/><br/>"Claro," Clara respondeu. A senhora entregou um cannoli bem embalado em um lenço.'
  },

  'story.the_napkin': {
    en: 'With the key clean, Clara put it in her pocket. But what now? Where could the next clue be?<br/><br/>Looking down, Clara noticed the crumpled napkin she had used to wipe off the mascarpone cheese. She shook it to remove some crumbs, and out fell a newspaper clipping showing a photo of a building. "This photo looks like MIT\'s dome. That must be where the next clue is," she thought.', 
    fr: 'Avec la clé propre, Clara la mit dans son poche. Mais maintenant ? Où pourrait se trouver la prochaine piste ?<br/><br/>En regardant le bas, Clara remarqua le mouchoir plié qu\'elle avait utilisé pour essuyer le mascarpone. Elle secoua le mouchoir pour enlever quelques miettes, et il tomba un article de journale montrant une photo d\'un bâtiment. "Cette photo ressemble au dôme de MIT. C\'est forcément là ou se trouvera la prochaine piste," pensa-t-elle.',
    es: 'Con la llave limpia, Clara la puso en su bolsillo. Pero ahora ¿dónde podría estar la próxima pista?<br/><br/>Mirando hacia abajo, Clara notó el pañuelo doblado que había usado para limpiar el queso mascarpone. Secó el pañuelo para quitar algunas migas, y salió un corte de periódico mostrando una foto de un edificio. "Esta foto parece el domo de MIT. Eso debe ser donde está la próxima pista," pensó.',
    'pt-br': 'Com a chave limpa, Clara colocou-a no seu bolso. Mas agora? Onde poderia estar a próxima pista?<br/><br/>Olhando para baixo, Clara notou o lenço arrufado que havia usado para limpar o queijo mascarpone. Secou o lenço para remover algumas migalhas, e saiu um recorte de jornal mostrando uma foto de um edifício. "Esta foto parece o domo de MIT. Isso deve ser onde está a próxima pista," pensou.'
   },
  'story.mit': {
    en: 'Clara stepped off the subway and walked to the domed edifice in front of the prestigious university. Around her, bespectacled students rushed around, carrying computers, books, and what appeared to be various wires and circuits.<br/><br/>Clara studied the newspaper clipping carefully. It was a picture of a dome, certainly, but only showed the top of the building, and there was a strange red object parked on top. Maybe this clue signaled that something was on top of the dome, but she wanted to be sure she was in the right place before making the effort to climb.',
    fr: 'Clara descendit du métro et se rendit au pied du bâtiment en forme de dôme devant l\'université prestigieuse. Autour d\'elle, des étudiants portant des lunettes et des ordinateurs courait, emportant des livres et ce qui semblait être des fils et des circuits divers. <br/><br/>Clara examina avec attention le journal. C\'était une photo d\'un dôme, certainement, mais ne montrait que le sommet du bâtiment, et il y avait un objet rouge étrange au sommet. Peut-être que cette piste signalait que quelque chose était au sommet du dôme, mais elle voulait être sûre qu\'elle était au bon endroit avant de faire l\'effort de grimper.',
    es: 'Clara descendió del metro y se dirigió al piede del edificio en forma de domo frente a la prestigiosa universidad. Alrededor de ella, estudiantes con lentes portaban computadoras, libros y lo que parecía ser varios cables y circuitos. <br/><br/>Clara examinó con cuidado el corte de periódico. Era una foto de un domo, ciertamente, pero solo mostraba el techo del edificio, y había un objeto rojo extraño estacionado en la parte superior. Quizás esta pista indicaba que algo estaba en la parte superior del domo, pero quería estar segura de que estaba en el lugar correcto antes de hacer el esfuerzo de escalar.',
    'pt-br': 'Clara desceu do metrô e caminhou até o pé do edifício em forma de domo diante da universidade prestigiosa. Ao seu redor, estudantes com óculos carregavam computadores, livros e o que parecia ser vários fios e circuitos. <br/><br/>Clara examinou com cuidado o recorte de jornal. Era uma foto de um domo, certamente, mas apenas mostrou o topo do edifício, e havia um objeto vermelho estranho estacionado no topo. Talvez esta pista indicasse que algo estava no topo do domo, mas ela queria estar certa de que estava no lugar certo antes de fazer o esforço de escalar.'
  },
  'story.atop_dome': {
    en: 'Using rope from her utility belt, Clara rappelled the top of the dome. Looking around, she noticed a small hand-held mirror.',
    fr: 'En utilisant la corde de son ceinturon de fournitures, Clara a rappelé le sommet du dôme. En regardant autour d\'elle, elle remarqua un petit miroir portable.',
    es: 'Usando la cuerda de su cinturón de utilidades, Clara rappeló el techo del domo. Mirando alrededor, notó un espejo portátil pequeño.',
    'pt-br': 'Usando a corda de sua cintura de utilidades, Clara rappelou o topo do domo. Olhando ao redor, ela notou um espelho portátil pequeno.'
  },

  // Lab instructions
  'lab.1.instructions': {
    en: 'The image appears to be burned and is far too dark to read easily. Use a Cloudinary transformation in the Lab to enhance the image\'s contrast to find your first clue.<br/><br/>Create a free account at <a href="https://Cloudinary.com" target="_blank">https://Cloudinary.com</a>. Upload your image to the Media Library. Take note of your <b>cloud name</b> (listed in the top left dropdown menu of the console) and your uploaded image\'s <b>public ID</b> , which you can find by clicking on the image in the Media Library in the Summary tab.<br/><br/>Click the \'Lab\' button and enter your cloud name and the image\'s public ID. Enhance the image which is very dark, but appears to have a word written on it. Hint: try the <a href="https://cloudinary.com/documentation/transformation_reference#e_contrast">\'contrast\' transformation</a>. Once you have transformed the image, and the word is visible, select the letters from the options in the lab.',
    fr: 'L\'image semble brûlée et est beaucoup trop sombre pour être lue facilement. Utilisez une transformation Cloudinary dans le Laboratoire pour améliorer le contraste de l\'image et trouver votre premier indice.<br/><br/>Créez un compte gratuit sur <a href="https://Cloudinary.com" target="_blank">https://Cloudinary.com</a>. Téléchargez votre image dans la Bibliothèque Média. Notez votre <b>nom de cloud</b> (listé dans le menu déroulant en haut à gauche de la console) et l\'<b>ID public</b> de votre image téléchargée, que vous pouvez trouver en cliquant sur l\'image dans la Bibliothèque Média dans l\'onglet Résumé.<br/><br/>Cliquez sur le bouton \'Laboratoire\' et entrez votre nom de cloud et l\'ID public de l\'image. Améliorez l\'image qui est très sombre, mais semble avoir un mot écrit dessus. Astuce : essayez la <a href="https://cloudinary.com/documentation/transformation_reference#e_contrast">transformation \'contrast\'</a>. Une fois que vous avez transformé l\'image et que le mot est visible, sélectionnez les lettres parmi les options du laboratoire.',
    es: 'La imagen parece estar quemada y es demasiado oscura para leer fácilmente. Usa una transformación de Cloudinary en el Laboratorio para mejorar el contraste de la imagen y encontrar tu primera pista.<br/><br/>Crea una cuenta gratuita en <a href="https://Cloudinary.com" target="_blank">https://Cloudinary.com</a>. Sube tu imagen a la Biblioteca de Medios. Toma nota de tu <b>nombre de nube</b> (listado en el menú desplegable superior izquierdo de la consola) y el <b>ID público</b> de tu imagen subida, que puedes encontrar haciendo clic en la imagen en la Biblioteca de Medios en la pestaña Resumen.<br/><br/>Haz clic en el botón \'Laboratorio\' e ingresa tu nombre de nube y el ID público de la imagen. Mejora la imagen que está muy oscura, pero parece tener una palabra escrita. Pista: prueba la <a href="https://cloudinary.com/documentation/transformation_reference#e_contrast">transformación \'contrast\'</a>. Una vez que hayas transformado la imagen y la palabra sea visible, selecciona las letras de las opciones en el laboratorio.',
    'pt-br': 'A imagem parece estar queimada e está muito escura para ler facilmente. Use uma transformação do Cloudinary no Laboratório para melhorar o contraste da imagem e encontrar sua primeira pista.<br/><br/>Crie uma conta gratuita em <a href="https://Cloudinary.com" target="_blank">https://Cloudinary.com</a>. Faça upload de sua imagem para a Biblioteca de Mídia. Anote seu <b>nome da nuvem</b> (listado no menu suspenso superior esquerdo do console) e o <b>ID público</b> de sua imagem carregada, que você pode encontrar clicando na imagem na Biblioteca de Mídia na aba Resumo.<br/><br/>Clique no botão \'Laboratório\' e insira seu nome da nuvem e o ID público da imagem. Melhore a imagem que está muito escura, mas parece ter uma palavra escrita. Dica: tente a <a href="https://cloudinary.com/documentation/transformation_reference#e_contrast">transformação \'contrast\'</a>. Uma vez que você transformou a imagem e a palavra é visível, selecione as letras das opções no laboratório.'
  },

  'lab.2.instructions': {
    en: 'This grimy string needs to be cleaned so you can view its original color. Tip: remove the sepia transformation in the transformation field to view the original in the lab view.',
    fr: 'Cette ficelle crasseuse doit être nettoyée pour que vous puissiez voir sa couleur originale. Astuce : supprimez la transformation sépia dans le champ de transformation pour voir l\'original dans la vue du laboratoire.',
    es: 'Esta cuerda sucia necesita ser limpiada para que puedas ver su color original. Consejo: elimina la transformación sepia en el campo de transformación para ver el original en la vista del laboratorio.',
    'pt-br': 'Este barbante sujo precisa ser limpo para que você possa ver sua cor original. Dica: remova a transformação sépia no campo de transformação para ver o original na visualização do laboratório.'
  }, 
  
  'lab.3.instructions': {
    en: 'The key is coated with a sticky layer of mascarpone cheese, the traditional cannoli filling. Use an AI transformation and an Image Refiner to wipe off the cheese from the key.<br/><br/>Tip: upload the key image to your Media Library and perform an AI transformation to extract the key from the cheese. Try a generative background removal transformation, then use a refiner to erase any extra cream filling from the key.',
    fr: 'La clé est recouverte d\'une couche collante de mascarpone, le remplissage traditionnel des cannolis. Utilisez une transformation AI et un Réflecteur pour retirer le fromage de la clé.<br/><br/>Astuce : téléchargez l\'image de la clé dans votre Bibliothèque Média et effectuez une transformation AI pour extraire la clé du fromage. Essayez une transformation de suppression de fond générative, puis utilisez un réflecteur pour effacer toute crème supplémentaire dans la clé."',
    es: 'La llave está cubierta con una capa pegajosa de queso mascarpone, el relleno tradicional de los cannolis. Utiliza una transformación AI y un Reflector para retirar el queso de la llave.<br/><br/>Consejo: sube la imagen de la llave a tu Biblioteca de Medios y realiza una transformación AI para extraer la llave del queso. Prueba una transformación de eliminación de fondo generativa, luego usa un refractor para borrar cualquier relleno de crema adicional en la llave."',
    'pt-br': 'A chave está coberta com uma camada pegajosa de queijo mascarpone, o recheio tradicional dos cannolis. Use uma transformação AI e um Refletor para retirar o queijo da chave.<br/><br/>Dica: faça upload da imagem da chave para sua Biblioteca de Mídia e realize uma transformação AI para extrair a chave do queijo. Tente uma transformação de remoção de fundo gerativa, então use um refletor para apagar qualquer recheio de creme adicional na chave."'
  },

  'lab.4.instructions': {
    en: 'MIT students are famous for decorating the dome each year. Use a transformation to remove the object from the top of the dome so that Clara can be sure she\'s in the right place. Can you tell what the red object was? TIP: remove the crop transformation.',
    fr: 'Les étudiants de l\'MIT sont célèbres pour décorer le dôme chaque année. Utilisez une transformation pour retirer l\'objet du sommet du dôme. Pouvez-vous dire ce qu\'il est ? ASTUCE: retirez la transformation de découpage.',
    es: 'Los estudiantes de MIT son famosos por decorar el domo cada año. Utiliza una transformación para quitar el objeto del techo del domo. ¿Puedes decir qué es? PISTA: elimina la transformación de recorte.',
    'pt-br': 'Os estudantes da MIT são famosos por decorar o domo cada ano. Use uma transformação para remover o objeto do topo do domo. Você pode dizer o que é? DICA: remova a transformação de recorte.'
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
