// Tichu Guide Content for pSEO Pages
// Structure: pages[slug][lang] = { title, metaDescription, content, relatedPages }

export const guidePages = {
  // Page 1: What is Tichu
  'what-is-tichu': {
    en: {
      title: 'What is Tichu? Complete Introduction to the Card Game',
      metaDescription: 'Discover Tichu, the exciting partnership trick-taking card game from China. Learn why millions play this strategic game combining skill, teamwork, and calculated risk.',
      h1: 'What is Tichu?',
      intro: 'Tichu is a partnership trick-taking card game that originated in China and has captivated players worldwide since its publication in 1991. Designed for exactly 4 players in two teams, Tichu combines elements of classic climbing games with unique special cards and a betting system that rewards bold plays.',
      sections: [
        {
          heading: 'Origins and History',
          content: 'Tichu was created by Urs Hostettler and published by Fata Morgana in Switzerland. The game draws inspiration from traditional Chinese climbing games, particularly Zheng Fen and Big Two. Its name comes from the Chinese word for "Grand Seigneur," reflecting its cultural roots while adding Western game design elements.'
        },
        {
          heading: 'Why Players Love Tichu',
          content: 'What sets Tichu apart is its perfect balance of strategy and risk-taking. Every hand presents meaningful decisions: When should you call Tichu? Can you trust your partner to support your play? The game rewards both careful planning and dramatic gambles, making each session unique and memorable.'
        },
        {
          heading: 'Game Overview',
          content: 'Four players form two partnerships, sitting across from each other. Using a 56-card deck (standard 52 cards plus 4 special cards), teams race to be the first to reach 1000 points. Points come from card values captured in tricks and from successfully calling "Tichu" or "Grand Tichu" before going out first.'
        }
      ],
      relatedPages: ['tichu-rules-overview', 'tichu-special-cards', 'tichu-scoring-system']
    },
    de: {
      title: 'Was ist Tichu? Komplette Einführung ins Kartenspiel',
      metaDescription: 'Entdecke Tichu, das spannende Partnerschafts-Stichspiel aus China. Erfahre, warum Millionen dieses strategische Spiel spielen, das Können, Teamarbeit und kalkuliertes Risiko vereint.',
      h1: 'Was ist Tichu?',
      intro: 'Tichu ist ein Partnerschafts-Stichspiel, das seinen Ursprung in China hat und seit seiner Veröffentlichung 1991 Spieler weltweit begeistert. Entwickelt für genau 4 Spieler in zwei Teams, kombiniert Tichu Elemente klassischer Kletterspiele mit einzigartigen Spezialkarten und einem Wettsystem, das mutige Spielzüge belohnt.',
      sections: [
        {
          heading: 'Ursprung und Geschichte',
          content: 'Tichu wurde von Urs Hostettler entwickelt und vom Schweizer Verlag Fata Morgana veröffentlicht. Das Spiel ist inspiriert von traditionellen chinesischen Kletterspielen, insbesondere Zheng Fen und Big Two. Sein Name stammt vom chinesischen Wort für "Grand Seigneur" und spiegelt seine kulturellen Wurzeln wider, während westliche Spieldesign-Elemente hinzugefügt wurden.'
        },
        {
          heading: 'Warum Spieler Tichu lieben',
          content: 'Was Tichu auszeichnet, ist seine perfekte Balance aus Strategie und Risikobereitschaft. Jede Hand bietet bedeutsame Entscheidungen: Wann sollte man Tichu ansagen? Kann man seinem Partner vertrauen? Das Spiel belohnt sowohl sorgfältige Planung als auch dramatische Wetten, was jede Partie einzigartig und unvergesslich macht.'
        },
        {
          heading: 'Spielübersicht',
          content: 'Vier Spieler bilden zwei Partnerschaften und sitzen sich gegenüber. Mit einem 56-Karten-Deck (52 Standardkarten plus 4 Spezialkarten) versuchen die Teams, als erste 1000 Punkte zu erreichen. Punkte werden durch Kartenwerte in Stichen und durch erfolgreiches Ansagen von "Tichu" oder "Grossem Tichu" vor dem Ablegen aller Karten gesammelt.'
        }
      ],
      relatedPages: ['tichu-rules-overview', 'tichu-special-cards', 'tichu-scoring-system']
    },
    fr: {
      title: 'Qu\'est-ce que le Tichu? Introduction Complète au Jeu de Cartes',
      metaDescription: 'Découvrez le Tichu, le jeu de cartes de plis en partenariat originaire de Chine. Apprenez pourquoi des millions de joueurs adorent ce jeu stratégique alliant compétence, travail d\'équipe et prise de risque calculée.',
      h1: 'Qu\'est-ce que le Tichu?',
      intro: 'Le Tichu est un jeu de cartes de plis en partenariat originaire de Chine qui captive les joueurs du monde entier depuis sa publication en 1991. Conçu pour exactement 4 joueurs en deux équipes, le Tichu combine des éléments de jeux d\'escalade classiques avec des cartes spéciales uniques et un système de paris qui récompense les jeux audacieux.',
      sections: [
        {
          heading: 'Origines et Histoire',
          content: 'Le Tichu a été créé par Urs Hostettler et publié par Fata Morgana en Suisse. Le jeu s\'inspire des jeux d\'escalade traditionnels chinois, notamment Zheng Fen et Big Two. Son nom vient du mot chinois pour "Grand Seigneur", reflétant ses racines culturelles tout en ajoutant des éléments de conception de jeux occidentaux.'
        },
        {
          heading: 'Pourquoi les Joueurs Aiment le Tichu',
          content: 'Ce qui distingue le Tichu, c\'est son équilibre parfait entre stratégie et prise de risque. Chaque main présente des décisions significatives: Quand devez-vous annoncer Tichu? Pouvez-vous faire confiance à votre partenaire? Le jeu récompense à la fois la planification minutieuse et les paris dramatiques, rendant chaque session unique et mémorable.'
        },
        {
          heading: 'Aperçu du Jeu',
          content: 'Quatre joueurs forment deux partenariats, assis face à face. Utilisant un jeu de 56 cartes (52 cartes standard plus 4 cartes spéciales), les équipes courent pour être les premières à atteindre 1000 points. Les points proviennent des valeurs des cartes capturées dans les plis et de l\'annonce réussie de "Tichu" ou "Grand Tichu" avant de se débarrasser de toutes ses cartes.'
        }
      ],
      relatedPages: ['tichu-rules-overview', 'tichu-special-cards', 'tichu-scoring-system']
    }
  },

  // Page 2: Rules Overview
  'tichu-rules-overview': {
    en: {
      title: 'Tichu Rules Overview: How to Play the Complete Guide',
      metaDescription: 'Master Tichu with our complete rules overview. Learn card dealing, trick-taking mechanics, and winning strategies for this classic partnership card game.',
      h1: 'Tichu Rules Overview',
      intro: 'Understanding Tichu rules is your gateway to enjoying this remarkable card game. While the basics can be learned in minutes, the strategic depth will keep you engaged for years. This overview covers everything you need to start playing confidently.',
      sections: [
        {
          heading: 'Setup and Dealing',
          content: 'Tichu requires exactly 4 players forming two teams. Partners sit across from each other. One player shuffles the 56-card deck and places it face down. Players take turns drawing cards in counter-clockwise order, one at a time, until each player holds 14 cards. Unlike most card games, the dealer does not actually deal—players draw their own cards.'
        },
        {
          heading: 'The Card Exchange',
          content: 'Before play begins, each player must pass exactly 3 cards: one to each other player (partner and both opponents). This exchange is crucial for strategy—you might strengthen your partner\'s hand, break up an opponent\'s sequences, or set up your own winning combinations. Cards are passed face down simultaneously, then revealed.'
        },
        {
          heading: 'Playing Tricks',
          content: 'The player holding the Mah Jong leads the first trick. Players must play a higher combination of the same type or pass. When all players pass consecutively, the last player to play a combination wins the trick and leads the next one. The round continues until all but one player has emptied their hand.'
        },
        {
          heading: 'Winning the Round',
          content: 'The round ends when three players have gone out (played all their cards). The order in which players finish is crucial: the first player out scores points for their team, and any remaining cards in the last player\'s hand go to the opposing team. A double victory (both partners going out first and second) awards 200 bonus points.'
        }
      ],
      relatedPages: ['what-is-tichu', 'tichu-card-combinations', 'tichu-scoring-system']
    },
    de: {
      title: 'Tichu Regeln Übersicht: Komplette Spielanleitung',
      metaDescription: 'Meistere Tichu mit unserer kompletten Regelübersicht. Lerne Kartenverteilung, Stich-Mechaniken und Gewinnstrategien für dieses klassische Partnerschafts-Kartenspiel.',
      h1: 'Tichu Regeln Übersicht',
      intro: 'Das Verstehen der Tichu-Regeln ist dein Tor zu diesem bemerkenswerten Kartenspiel. Während die Grundlagen in Minuten erlernt werden können, wird dich die strategische Tiefe jahrelang fesseln. Diese Übersicht deckt alles ab, was du brauchst, um selbstbewusst zu spielen.',
      sections: [
        {
          heading: 'Aufbau und Kartenverteilung',
          content: 'Tichu benötigt genau 4 Spieler in zwei Teams. Partner sitzen sich gegenüber. Ein Spieler mischt das 56-Karten-Deck und legt es verdeckt ab. Die Spieler ziehen abwechselnd Karten gegen den Uhrzeigersinn, eine nach der anderen, bis jeder 14 Karten hält. Anders als bei den meisten Kartenspielen teilt der Geber nicht aus—Spieler ziehen ihre eigenen Karten.'
        },
        {
          heading: 'Der Kartentausch',
          content: 'Vor Spielbeginn muss jeder Spieler genau 3 Karten weitergeben: eine an jeden anderen Spieler (Partner und beide Gegner). Dieser Tausch ist strategisch entscheidend—du könntest die Hand deines Partners stärken, Sequenzen eines Gegners zerstören oder deine eigenen Gewinnkombinationen vorbereiten. Karten werden verdeckt und gleichzeitig weitergegeben, dann aufgedeckt.'
        },
        {
          heading: 'Stiche Spielen',
          content: 'Der Spieler mit dem Mah Jong eröffnet den ersten Stich. Spieler müssen eine höhere Kombination desselben Typs spielen oder passen. Wenn alle Spieler nacheinander passen, gewinnt der letzte Spieler, der eine Kombination gespielt hat, den Stich und eröffnet den nächsten. Die Runde dauert an, bis alle bis auf einen Spieler ihre Hand geleert haben.'
        },
        {
          heading: 'Die Runde Gewinnen',
          content: 'Die Runde endet, wenn drei Spieler rausgegangen sind (alle Karten gespielt haben). Die Reihenfolge, in der Spieler fertig werden, ist entscheidend: Der erste Spieler, der rausgeht, erzielt Punkte für sein Team, und alle verbleibenden Karten in der Hand des letzten Spielers gehen an das gegnerische Team. Ein Doppelsieg (beide Partner gehen als Erste und Zweite raus) bringt 200 Bonuspunkte.'
        }
      ],
      relatedPages: ['what-is-tichu', 'tichu-card-combinations', 'tichu-scoring-system']
    },
    fr: {
      title: 'Aperçu des Règles du Tichu: Guide Complet',
      metaDescription: 'Maîtrisez le Tichu avec notre aperçu complet des règles. Apprenez la distribution des cartes, les mécaniques de plis et les stratégies gagnantes pour ce jeu de cartes classique.',
      h1: 'Aperçu des Règles du Tichu',
      intro: 'Comprendre les règles du Tichu est votre porte d\'entrée pour profiter de ce remarquable jeu de cartes. Bien que les bases puissent être apprises en quelques minutes, la profondeur stratégique vous captivera pendant des années. Cet aperçu couvre tout ce dont vous avez besoin pour jouer avec confiance.',
      sections: [
        {
          heading: 'Installation et Distribution',
          content: 'Le Tichu nécessite exactement 4 joueurs formant deux équipes. Les partenaires s\'assoient face à face. Un joueur mélange le jeu de 56 cartes et le place face cachée. Les joueurs tirent des cartes à tour de rôle dans le sens antihoraire, une à la fois, jusqu\'à ce que chaque joueur ait 14 cartes. Contrairement à la plupart des jeux de cartes, le donneur ne distribue pas—les joueurs tirent leurs propres cartes.'
        },
        {
          heading: 'L\'Échange de Cartes',
          content: 'Avant le début du jeu, chaque joueur doit passer exactement 3 cartes: une à chaque autre joueur (partenaire et les deux adversaires). Cet échange est crucial pour la stratégie—vous pourriez renforcer la main de votre partenaire, briser les séquences d\'un adversaire ou préparer vos propres combinaisons gagnantes. Les cartes sont passées face cachée simultanément, puis révélées.'
        },
        {
          heading: 'Jouer les Plis',
          content: 'Le joueur tenant le Mah Jong mène le premier pli. Les joueurs doivent jouer une combinaison plus élevée du même type ou passer. Quand tous les joueurs passent consécutivement, le dernier joueur à avoir joué une combinaison remporte le pli et mène le suivant. Le tour continue jusqu\'à ce que tous les joueurs sauf un aient vidé leur main.'
        },
        {
          heading: 'Gagner le Tour',
          content: 'Le tour se termine quand trois joueurs sont sortis (ont joué toutes leurs cartes). L\'ordre dans lequel les joueurs terminent est crucial: le premier joueur sorti marque des points pour son équipe, et toutes les cartes restantes dans la main du dernier joueur vont à l\'équipe adverse. Une double victoire (les deux partenaires sortant premier et deuxième) rapporte 200 points bonus.'
        }
      ],
      relatedPages: ['what-is-tichu', 'tichu-card-combinations', 'tichu-scoring-system']
    }
  },

  // Page 3: Special Cards
  'tichu-special-cards': {
    en: {
      title: 'Tichu Special Cards: Dragon, Phoenix, Dog & Mah Jong Explained',
      metaDescription: 'Master the four special cards in Tichu: Dragon, Phoenix, Mah Jong, and Dog. Learn their unique abilities and strategic uses to dominate your games.',
      h1: 'Tichu Special Cards Guide',
      intro: 'The four special cards in Tichu—Dragon, Phoenix, Mah Jong, and Dog—transform the game from a simple climbing card game into a strategic masterpiece. Each card has unique abilities that can turn the tide of any hand when used skillfully.',
      sections: [
        {
          heading: 'The Dragon',
          content: 'The Dragon is the highest individual card in Tichu, worth 25 points. It can only be played as a single card and beats everything except bombs. However, there\'s a catch: when you win a trick with the Dragon, you must give all cards in that trick to one of your opponents. This makes the Dragon a double-edged sword—powerful for going out first, but potentially giving points to enemies.'
        },
        {
          heading: 'The Phoenix',
          content: 'The Phoenix is the most versatile special card, worth -25 points. As a single card, it plays as half a rank higher than the card it follows (but cannot beat the Dragon). Its true power lies in its ability to serve as a wild card in combinations—it can replace any normal card to complete straights, full houses, or other combinations. Use it wisely to complete crucial plays.'
        },
        {
          heading: 'The Mah Jong',
          content: 'The Mah Jong (value 1) determines who leads the first trick—whoever holds it must start the round. When playing the Mah Jong, you may make a "wish" for any card rank (2-Ace). The next player who can legally play that rank must do so. This wish remains active until someone fulfills it, creating powerful tactical opportunities.'
        },
        {
          heading: 'The Dog',
          content: 'The Dog has no rank and no point value. It can only be played to lead a trick, and it immediately transfers the lead to your partner. You cannot play the Dog if your partner has already gone out. The Dog is invaluable for supporting a partner who has called Tichu or holds a strong hand.'
        }
      ],
      relatedPages: ['what-is-tichu', 'tichu-card-combinations', 'tichu-strategy-tips']
    },
    de: {
      title: 'Tichu Spezialkarten: Drache, Phönix, Hund & Mah Jong erklärt',
      metaDescription: 'Meistere die vier Spezialkarten im Tichu: Drache, Phönix, Mah Jong und Hund. Lerne ihre einzigartigen Fähigkeiten und strategischen Einsatzmöglichkeiten.',
      h1: 'Tichu Spezialkarten Guide',
      intro: 'Die vier Spezialkarten im Tichu—Drache, Phönix, Mah Jong und Hund—verwandeln das Spiel von einem einfachen Kletterspiel in ein strategisches Meisterwerk. Jede Karte hat einzigartige Fähigkeiten, die das Blatt wenden können, wenn sie geschickt eingesetzt werden.',
      sections: [
        {
          heading: 'Der Drache',
          content: 'Der Drache ist die höchste Einzelkarte im Tichu und 25 Punkte wert. Er kann nur als Einzelkarte gespielt werden und schlägt alles außer Bomben. Es gibt jedoch einen Haken: Wenn du einen Stich mit dem Drachen gewinnst, musst du alle Karten dieses Stichs an einen deiner Gegner geben. Das macht den Drachen zu einem zweischneidigen Schwert—mächtig um als Erster rauszugehen, aber möglicherweise gibt man Punkte an Feinde.'
        },
        {
          heading: 'Der Phönix',
          content: 'Der Phönix ist die vielseitigste Spezialkarte und -25 Punkte wert. Als Einzelkarte spielt er einen halben Rang höher als die Karte, der er folgt (kann aber den Drachen nicht schlagen). Seine wahre Stärke liegt in seiner Fähigkeit, als Joker in Kombinationen zu dienen—er kann jede normale Karte ersetzen, um Straßen, Full Houses oder andere Kombinationen zu vervollständigen.'
        },
        {
          heading: 'Der Mah Jong',
          content: 'Der Mah Jong (Wert 1) bestimmt, wer den ersten Stich eröffnet—wer ihn hält, muss die Runde beginnen. Beim Spielen des Mah Jong darfst du einen "Wunsch" für einen beliebigen Kartenwert (2-Ass) äußern. Der nächste Spieler, der diesen Rang legal spielen kann, muss dies tun. Dieser Wunsch bleibt aktiv, bis jemand ihn erfüllt, was mächtige taktische Möglichkeiten schafft.'
        },
        {
          heading: 'Der Hund',
          content: 'Der Hund hat keinen Rang und keinen Punktwert. Er kann nur gespielt werden, um einen Stich zu eröffnen, und überträgt sofort die Führung an deinen Partner. Du kannst den Hund nicht spielen, wenn dein Partner bereits rausgegangen ist. Der Hund ist unschätzbar wertvoll, um einen Partner zu unterstützen, der Tichu angesagt hat oder ein starkes Blatt hält.'
        }
      ],
      relatedPages: ['what-is-tichu', 'tichu-card-combinations', 'tichu-strategy-tips']
    },
    fr: {
      title: 'Cartes Spéciales du Tichu: Dragon, Phénix, Chien & Mah Jong',
      metaDescription: 'Maîtrisez les quatre cartes spéciales du Tichu: Dragon, Phénix, Mah Jong et Chien. Apprenez leurs capacités uniques et leurs utilisations stratégiques.',
      h1: 'Guide des Cartes Spéciales du Tichu',
      intro: 'Les quatre cartes spéciales du Tichu—Dragon, Phénix, Mah Jong et Chien—transforment le jeu d\'un simple jeu d\'escalade en un chef-d\'œuvre stratégique. Chaque carte a des capacités uniques qui peuvent changer le cours de n\'importe quelle main lorsqu\'elles sont utilisées habilement.',
      sections: [
        {
          heading: 'Le Dragon',
          content: 'Le Dragon est la carte individuelle la plus haute du Tichu, valant 25 points. Il ne peut être joué que comme carte seule et bat tout sauf les bombes. Cependant, il y a un piège: quand vous gagnez un pli avec le Dragon, vous devez donner toutes les cartes de ce pli à l\'un de vos adversaires. Cela fait du Dragon une épée à double tranchant—puissant pour sortir premier, mais donnant potentiellement des points aux ennemis.'
        },
        {
          heading: 'Le Phénix',
          content: 'Le Phénix est la carte spéciale la plus polyvalente, valant -25 points. Comme carte seule, il joue un demi-rang au-dessus de la carte qu\'il suit (mais ne peut pas battre le Dragon). Sa vraie puissance réside dans sa capacité à servir de joker dans les combinaisons—il peut remplacer n\'importe quelle carte normale pour compléter des suites, des fulls ou d\'autres combinaisons.'
        },
        {
          heading: 'Le Mah Jong',
          content: 'Le Mah Jong (valeur 1) détermine qui mène le premier pli—celui qui le tient doit commencer le tour. En jouant le Mah Jong, vous pouvez faire un "vœu" pour n\'importe quel rang de carte (2-As). Le prochain joueur qui peut légalement jouer ce rang doit le faire. Ce vœu reste actif jusqu\'à ce que quelqu\'un le réalise, créant de puissantes opportunités tactiques.'
        },
        {
          heading: 'Le Chien',
          content: 'Le Chien n\'a pas de rang et pas de valeur en points. Il ne peut être joué que pour mener un pli, et il transfère immédiatement la main à votre partenaire. Vous ne pouvez pas jouer le Chien si votre partenaire est déjà sorti. Le Chien est inestimable pour soutenir un partenaire qui a annoncé Tichu ou qui a une main forte.'
        }
      ],
      relatedPages: ['what-is-tichu', 'tichu-card-combinations', 'tichu-strategy-tips']
    }
  }
};
