export type Language = "en" | "es" | "fr" | "de" | "pt";

export interface LanguageOption {
  code: Language;
  flag: string;
  name: string;
}

export const languageOptions: LanguageOption[] = [
  { code: "en", flag: "\u{1F1EC}\u{1F1E7}", name: "English" },
  { code: "es", flag: "\u{1F1EA}\u{1F1F8}", name: "Espa\u00f1ol" },
  { code: "fr", flag: "\u{1F1EB}\u{1F1F7}", name: "Fran\u00e7ais" },
  { code: "de", flag: "\u{1F1E9}\u{1F1EA}", name: "Deutsch" },
  { code: "pt", flag: "\u{1F1E7}\u{1F1F7}", name: "Portugu\u00eas" },
];

export interface Translations {
  // Language slide
  chooseLanguage: string;
  // Avatar slide
  chooseCompanion: string;
  avatarSubtitle: string;
  // Welcome slide
  start: string;
  pressEnterToBegin: string;
  // Question slide
  ok: string;
  submit: string;
  pressEnter: string;
  of: string;
  // Thank you slide
  thankYou: string;
  responseRecorded: string;
  linkCopied: string;
  shareThisSurvey: string;
  likeThisSurvey: string;
  createYourOwn: string;
  // Progress bar quotes
  quotes: string[];
}

export const translations: Record<Language, Translations> = {
  en: {
    chooseLanguage: "Choose your language",
    chooseCompanion: "Choose your companion",
    avatarSubtitle: "Pick a friend to guide you through the survey",
    start: "Start",
    pressEnterToBegin: "Press Enter to begin",
    ok: "OK",
    submit: "Submit",
    pressEnter: "Press Enter",
    of: "of",
    thankYou: "Thank you!",
    responseRecorded: "Your response has been recorded.",
    linkCopied: "Link copied!",
    shareThisSurvey: "Share this survey",
    likeThisSurvey: "Like this survey?",
    createYourOwn: "Create your own for free",
    quotes: [
      "You're doing amazing \u2014 keep going! \u{1F525}",
      "Almost there, you absolute legend! \u{1F3C6}",
      "Your answers are chef's kiss \u{1F468}\u200D\u{1F373}\u{1F48B}",
      "This form won't fill itself... oh wait, you're doing it! \u{1F4AA}",
      "Halfway there! Livin' on a prayer \u{1F3B8}",
      "You're faster than a caffeinated cheetah \u26A1",
      "The finish line can smell your determination \u{1F3C1}",
      "Keep going \u2014 free dopamine at the end! \u{1F9E0}",
      "You're crushing it harder than a hydraulic press \u{1FAE1}",
      "Just a few more \u2014 you've got this! \u{1F680}",
      "Your dedication is bringing a tear to our server's eye \u{1F972}",
      "Fun fact: finishing forms burns 0 calories but feels great \u{1F60E}",
    ],
  },
  es: {
    chooseLanguage: "Elige tu idioma",
    chooseCompanion: "Elige tu compa\u00f1ero",
    avatarSubtitle: "Elige un amigo que te gu\u00ede a trav\u00e9s de la encuesta",
    start: "Comenzar",
    pressEnterToBegin: "Presiona Enter para comenzar",
    ok: "OK",
    submit: "Enviar",
    pressEnter: "Presiona Enter",
    of: "de",
    thankYou: "\u00a1Gracias!",
    responseRecorded: "Tu respuesta ha sido registrada.",
    linkCopied: "\u00a1Enlace copiado!",
    shareThisSurvey: "Compartir esta encuesta",
    likeThisSurvey: "\u00bfTe gust\u00f3 esta encuesta?",
    createYourOwn: "Crea la tuya gratis",
    quotes: [
      "\u00a1Lo est\u00e1s haciendo incre\u00edble, sigue as\u00ed! \u{1F525}",
      "\u00a1Ya casi, eres una leyenda! \u{1F3C6}",
      "Tus respuestas son de chef \u{1F468}\u200D\u{1F373}\u{1F48B}",
      "Este formulario no se llena solo... \u00a1pero t\u00fa s\u00ed puedes! \u{1F4AA}",
      "\u00a1A mitad de camino! \u{1F3B8}",
      "Eres m\u00e1s r\u00e1pido que un guepardo con caf\u00e9 \u26A1",
      "La meta ya puede oler tu determinaci\u00f3n \u{1F3C1}",
      "\u00a1Sigue, dopamina gratis al final! \u{1F9E0}",
      "\u00a1Lo est\u00e1s aplastando! \u{1FAE1}",
      "\u00a1Solo faltan unas pocas, t\u00fa puedes! \u{1F680}",
      "Tu dedicaci\u00f3n emociona a nuestro servidor \u{1F972}",
      "Dato curioso: llenar formularios quema 0 calor\u00edas pero se siente genial \u{1F60E}",
    ],
  },
  fr: {
    chooseLanguage: "Choisissez votre langue",
    chooseCompanion: "Choisissez votre compagnon",
    avatarSubtitle: "Choisissez un ami pour vous guider dans le sondage",
    start: "Commencer",
    pressEnterToBegin: "Appuyez sur Entr\u00e9e pour commencer",
    ok: "OK",
    submit: "Envoyer",
    pressEnter: "Appuyez sur Entr\u00e9e",
    of: "sur",
    thankYou: "Merci\u00a0!",
    responseRecorded: "Votre r\u00e9ponse a \u00e9t\u00e9 enregistr\u00e9e.",
    linkCopied: "Lien copi\u00e9\u00a0!",
    shareThisSurvey: "Partager ce sondage",
    likeThisSurvey: "Vous aimez ce sondage\u00a0?",
    createYourOwn: "Cr\u00e9ez le v\u00f4tre gratuitement",
    quotes: [
      "Vous \u00eates formidable, continuez\u00a0! \u{1F525}",
      "Presque fini, quelle l\u00e9gende\u00a0! \u{1F3C6}",
      "Vos r\u00e9ponses sont parfaites \u{1F468}\u200D\u{1F373}\u{1F48B}",
      "Ce formulaire ne se remplit pas tout seul... mais vous, si\u00a0! \u{1F4AA}",
      "\u00c0 mi-chemin\u00a0! \u{1F3B8}",
      "Plus rapide qu'un gu\u00e9pard caf\u00e9in\u00e9 \u26A1",
      "La ligne d'arriv\u00e9e sent votre d\u00e9termination \u{1F3C1}",
      "Continuez \u2014 dopamine gratuite \u00e0 la fin\u00a0! \u{1F9E0}",
      "Vous \u00e9crasez tout\u00a0! \u{1FAE1}",
      "Plus que quelques-unes \u2014 vous y \u00eates presque\u00a0! \u{1F680}",
      "Votre d\u00e9vouement \u00e9meut notre serveur \u{1F972}",
      "Anecdote\u00a0: remplir des formulaires br\u00fble 0 calorie mais c'est g\u00e9nial \u{1F60E}",
    ],
  },
  de: {
    chooseLanguage: "W\u00e4hle deine Sprache",
    chooseCompanion: "W\u00e4hle deinen Begleiter",
    avatarSubtitle: "W\u00e4hle einen Freund, der dich durch die Umfrage begleitet",
    start: "Starten",
    pressEnterToBegin: "Dr\u00fccke Enter zum Starten",
    ok: "OK",
    submit: "Absenden",
    pressEnter: "Dr\u00fccke Enter",
    of: "von",
    thankYou: "Danke!",
    responseRecorded: "Deine Antwort wurde gespeichert.",
    linkCopied: "Link kopiert!",
    shareThisSurvey: "Umfrage teilen",
    likeThisSurvey: "Gef\u00e4llt dir diese Umfrage?",
    createYourOwn: "Erstelle kostenlos deine eigene",
    quotes: [
      "Du machst das gro\u00dfartig \u2014 weiter so! \u{1F525}",
      "Fast geschafft, du Legende! \u{1F3C6}",
      "Deine Antworten sind erstklassig \u{1F468}\u200D\u{1F373}\u{1F48B}",
      "Dieses Formular f\u00fcllt sich nicht von allein... aber du schaffst das! \u{1F4AA}",
      "Halbzeit! \u{1F3B8}",
      "Schneller als ein Gepard mit Koffein \u26A1",
      "Die Ziellinie riecht deine Entschlossenheit \u{1F3C1}",
      "Weitermachen \u2014 am Ende gibt's Dopamin gratis! \u{1F9E0}",
      "Du gibst richtig Gas! \u{1FAE1}",
      "Nur noch ein paar \u2014 du schaffst das! \u{1F680}",
      "Dein Engagement r\u00fchrt unseren Server zu Tr\u00e4nen \u{1F972}",
      "Fun Fact: Formulare ausf\u00fcllen verbrennt 0 Kalorien, f\u00fchlt sich aber toll an \u{1F60E}",
    ],
  },
  pt: {
    chooseLanguage: "Escolha seu idioma",
    chooseCompanion: "Escolha seu companheiro",
    avatarSubtitle: "Escolha um amigo para te guiar pela pesquisa",
    start: "Come\u00e7ar",
    pressEnterToBegin: "Pressione Enter para come\u00e7ar",
    ok: "OK",
    submit: "Enviar",
    pressEnter: "Pressione Enter",
    of: "de",
    thankYou: "Obrigado!",
    responseRecorded: "Sua resposta foi registrada.",
    linkCopied: "Link copiado!",
    shareThisSurvey: "Compartilhar esta pesquisa",
    likeThisSurvey: "Gostou desta pesquisa?",
    createYourOwn: "Crie a sua gr\u00e1tis",
    quotes: [
      "Voc\u00ea est\u00e1 arrasando \u2014 continue assim! \u{1F525}",
      "Quase l\u00e1, voc\u00ea \u00e9 uma lenda! \u{1F3C6}",
      "Suas respostas s\u00e3o perfeitas \u{1F468}\u200D\u{1F373}\u{1F48B}",
      "Este formul\u00e1rio n\u00e3o se preenche sozinho... mas voc\u00ea consegue! \u{1F4AA}",
      "Na metade do caminho! \u{1F3B8}",
      "Mais r\u00e1pido que uma chita com cafe\u00edna \u26A1",
      "A linha de chegada sente sua determina\u00e7\u00e3o \u{1F3C1}",
      "Continue \u2014 dopamina gr\u00e1tis no final! \u{1F9E0}",
      "Voc\u00ea est\u00e1 mandando muito bem! \u{1FAE1}",
      "S\u00f3 mais algumas \u2014 voc\u00ea consegue! \u{1F680}",
      "Sua dedica\u00e7\u00e3o est\u00e1 emocionando nosso servidor \u{1F972}",
      "Curiosidade: preencher formul\u00e1rios queima 0 calorias mas \u00e9 \u00f3timo \u{1F60E}",
    ],
  },
};
