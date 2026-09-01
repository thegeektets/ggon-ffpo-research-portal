import type { Locale, RichArticleContent } from '@/types';

const t = (en: string, fr: string, pt: string, es: string): Record<Locale, string> => ({ en, fr, pt, es });

const samplePdf = '/files/sample-report.pdf';

export const additionalRichArticles: Record<string, RichArticleContent> = {
  'africa-public-finance-oil-gas': {
    coverImage: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1400&q=80',
    body: [
      {
        type: 'paragraph',
        text: t(
          'African governments and development finance institutions continue to channel billions of dollars into oil and gas expansion despite climate commitments. This interactive tracker maps public finance flows — loans, guarantees, equity stakes and tax breaks — across 15 countries from 2018 to 2024.',
          'Les gouvernements africains et les institutions de financement du développement continuent d\'acheminer des milliards vers l\'expansion pétrolière et gazière. Ce suivi interactif cartographie les flux de financement public dans 15 pays de 2018 à 2024.',
          'Governos africanos e instituições de financiamento do desenvolvimento continuam a canalizar bilhões para a expansão de petróleo e gás. Este rastreador mapeia fluxos de financiamento público em 15 países de 2018 a 2024.',
          'Los gobiernos africanos y las instituciones de financiación del desarrollo siguen canalizando miles de millones hacia la expansión de petróleo y gas. Este seguimiento mapea flujos de financiación pública en 15 países de 2018 a 2024.',
        ),
      },
      {
        type: 'heading',
        level: 2,
        text: t('Key findings', 'Principales conclusions', 'Principais conclusões', 'Hallazgos clave'),
      },
      {
        type: 'list',
        items: [
          t('$34.2 billion in public finance identified for upstream oil and gas projects since 2018.', '34,2 milliards de dollars de financement public identifiés pour l\'amont depuis 2018.', 'US$ 34,2 bilhões em financiamento público identificados para upstream desde 2018.', 'US$ 34.200 millones en financiación pública identificados para upstream desde 2018.'),
          t('National oil companies received 61% of tracked public support.', 'Les compagnies pétrolières nationales ont reçu 61 % du soutien public suivi.', 'Empresas petrolíferas nacionais receberam 61% do apoio público rastreado.', 'Las petroleras nacionales recibieron el 61% del apoyo público rastreado.'),
          t('Only 4 of 15 countries have published fossil fuel subsidy reform plans.', 'Seulement 4 des 15 pays ont publié des plans de réforme des subventions fossiles.', 'Apenas 4 de 15 países publicaram planos de reforma de subsídios fósseis.', 'Solo 4 de 15 países han publicado planes de reforma de subsidios fósiles.'),
        ],
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80',
        alt: t('Map of Africa highlighting energy finance corridors', 'Carte de l\'Afrique mettant en évidence les corridors de financement énergétique', 'Mapa da África destacando corredores de financiamento energético', 'Mapa de África destacando corredores de financiación energética'),
        caption: t(
          'Figure 1: Public finance flows by region and project type (2018–2024).',
          'Figure 1 : Flux de financement public par région et type de projet (2018–2024).',
          'Figura 1: Fluxos de financiamento público por região e tipo de projeto (2018–2024).',
          'Figura 1: Flujos de financiación pública por región y tipo de proyecto (2018–2024).',
        ),
      },
      {
        type: 'quote',
        text: t(
          'Public money should not be locking African economies into decades more of fossil dependency. This tracker makes those commitments visible.',
          'L\'argent public ne devrait pas enfermer les économies africaines dans des décennies de dépendance fossile. Ce suivi rend ces engagements visibles.',
          'Dinheiro público não deveria prender economias africanas a décadas mais de dependência fóssil. Este rastreador torna esses compromissos visíveis.',
          'El dinero público no debería atrapar a las economías africanas en décadas más de dependencia fósil. Este seguimiento hace visibles esos compromisos.',
        ),
        attribution: t('A. Mbeki, lead researcher', 'A. Mbeki, chercheur principal', 'A. Mbeki, pesquisador principal', 'A. Mbeki, investigador principal'),
      },
    ],
    attachments: [
      {
        id: 'af-1',
        label: t('Full tracker database (XLSX)', 'Base de données complète (XLSX)', 'Banco de dados completo (XLSX)', 'Base de datos completa (XLSX)'),
        fileName: 'africa-public-finance-tracker-2024.xlsx',
        url: '/files/africa-finance-tracker.csv',
        fileType: 'xlsx',
        sizeLabel: '2.8 MB',
      },
      {
        id: 'af-2',
        label: t('Methodology note (PDF)', 'Note méthodologique (PDF)', 'Nota metodológica (PDF)', 'Nota metodológica (PDF)'),
        fileName: 'africa-finance-methodology.pdf',
        url: samplePdf,
        fileType: 'pdf',
        sizeLabel: '640 KB',
      },
    ],
  },

  'nigeria-gas-flaring-litigation': {
    coverImage: 'https://images.unsplash.com/photo-1565638290778-0c83a2fbb4f8?w=1400&q=80',
    body: [
      {
        type: 'paragraph',
        text: t(
          'Gas flaring in the Niger Delta has persisted for decades despite legal prohibitions and court orders. This report analyses litigation strategies that have succeeded — and failed — in holding operators and regulators accountable for routine flaring permits.',
          'Le torchage de gaz dans le delta du Niger persiste depuis des décennies malgré les interdictions légales. Ce rapport analyse les stratégies de contentieux qui ont réussi — et échoué — pour tenir les opérateurs responsables.',
          'A queima de gás no Delta do Níger persiste há décadas apesar de proibições legais. Este relatório analisa estratégias de litígio bem-sucedidas e malsucedidas contra operadores e reguladores.',
          'La quema de gas en el delta del Níger persiste durante décadas a pesar de prohibiciones legales. Este informe analiza estrategias de litigio exitosas y fallidas contra operadores y reguladores.',
        ),
      },
      {
        type: 'heading',
        level: 2,
        text: t('Landmark cases', 'Affaires marquantes', 'Casos históricos', 'Casos históricos'),
      },
      {
        type: 'list',
        ordered: true,
        items: [
          t('Gbemre v. Shell (2005): Federal High Court declared gas flaring unconstitutional — enforcement remains contested.', 'Gbemre c. Shell (2005) : le tribunal a déclaré le torchage inconstitutionnel — l\'application reste contestée.', 'Gbemre v. Shell (2005): tribunal declarou queima inconstitucional — execução permanece contestada.', 'Gbemre v. Shell (2005): tribunal declaró quema inconstitucional — cumplimiento sigue contestado.'),
          t('Aiteo flaring permit challenge (2021): Community groups challenged renewed permits citing health impacts.', 'Contestations des permis Aiteo (2021) : groupes communautaires ont contesté les permis renouvelés.', 'Desafio de permissões Aiteo (2021): grupos comunitários contestaram permissões renovadas.', 'Impugnación de permisos Aiteo (2021): grupos comunitarios impugnaron permisos renovados.'),
          t('Regional ECOWAS court referral (2023): Human rights framing for flaring-related pollution.', 'Saisine de la cour CEDEAO (2023) : cadrage des droits humains pour la pollution liée au torchage.', 'Encaminhamento ao tribunal da CEDEAO (2023): enquadramento de direitos humanos.', 'Remisión al tribunal de la CEDEAO (2023): encuadre de derechos humanos.'),
        ],
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9dcf?w=1200&q=80',
        alt: t('Gas flaring stack at night in an industrial zone', 'Torchère de gaz la nuit dans une zone industrielle', 'Tocha de queima de gás à noite em zona industrial', 'Antorcha de gas por la noche en zona industrial'),
        caption: t(
          'Communities within 5 km of flaring sites report elevated respiratory illness and crop damage.',
          'Les communautés à moins de 5 km des sites de torchage signalent une augmentation des maladies respiratoires.',
          'Comunidades a menos de 5 km de locais de queima relatam aumento de doenças respiratórias.',
          'Las comunidades a menos de 5 km de sitios de quema reportan mayor enfermedad respiratoria.',
        ),
      },
      {
        type: 'heading',
        level: 3,
        text: t('Strategic recommendations', 'Recommandations stratégiques', 'Recomendações estratégicas', 'Recomendaciones estratégicas'),
      },
      {
        type: 'paragraph',
        text: t(
          'Litigants should combine constitutional challenges with environmental impact assessments, health evidence, and shareholder pressure on international parent companies. Documenting permit renewal timelines creates opportunities for interim injunctions.',
          'Les plaignants devraient combiner les contestations constitutionnelles avec des évaluations d\'impact, des preuves sanitaires et une pression sur les sociétés mères internationales.',
          'Litigantes devem combinar desafios constitucionais com avaliações de impacto ambiental, evidências de saúde e pressão sobre controladoras internacionais.',
          'Los litigantes deben combinar impugnaciones constitucionales con evaluaciones de impacto ambiental, evidencia de salud y presión sobre matrices internacionales.',
        ),
      },
    ],
    attachments: [
      {
        id: 'ng-1',
        label: t('Full litigation report (PDF)', 'Rapport complet (PDF)', 'Relatório completo (PDF)', 'Informe completo (PDF)'),
        fileName: 'nigeria-gas-flaring-litigation-report.pdf',
        url: samplePdf,
        fileType: 'pdf',
        sizeLabel: '3.6 MB',
      },
      {
        id: 'ng-2',
        label: t('Case timeline dataset (CSV)', 'Chronologie des affaires (CSV)', 'Linha do tempo dos casos (CSV)', 'Cronología de casos (CSV)'),
        fileName: 'nigeria-flaring-cases.csv',
        url: '/files/nigeria-flaring-cases.csv',
        fileType: 'csv',
        sizeLabel: '48 KB',
      },
    ],
  },

  'demand-side-transport-decarbonisation': {
    coverImage: 'https://images.unsplash.com/photo-1593941707874-ef25b8b4a5b6?w=1400&q=80',
    body: [
      {
        type: 'paragraph',
        text: t(
          'Reducing oil demand requires policies that reshape how people and goods move. This explainer outlines demand-side levers — fuel efficiency standards, electric vehicle incentives, and public transit investment — that complement supply-side phase-out campaigns.',
          'Réduire la demande de pétrole nécessite des politiques qui transforment les déplacements. Ce guide présente les leviers côté demande — normes d\'efficacité, incitations aux VE et investissement dans les transports publics.',
          'Reduzir a demanda de petróleo exige políticas que transformem como pessoas e mercadorias se movem. Este explicativo descreve alavancas do lado da demanda.',
          'Reducir la demanda de petróleo requiere políticas que transformen cómo se mueven personas y mercancías. Este explicativo describe palancas del lado de la demanda.',
        ),
      },
      {
        type: 'heading',
        level: 2,
        text: t('Three policy pillars', 'Trois piliers politiques', 'Três pilares de política', 'Tres pilares de política'),
      },
      {
        type: 'list',
        items: [
          t('Fuel efficiency standards: tightening vehicle emissions limits reduces litres consumed per kilometre.', 'Normes d\'efficacité : des limites plus strictes réduisent les litres consommés par kilomètre.', 'Padrões de eficiência: limites mais rígidos reduzem litros consumidos por quilômetro.', 'Estándares de eficiencia: límites más estrictos reducen litros consumidos por kilómetro.'),
          t('EV incentives: purchase rebates and charging infrastructure shift new sales away from ICE vehicles.', 'Incitations VE : primes à l\'achat et infrastructure de recharge orientent les ventes hors thermique.', 'Incentivos a VE: subsídios e infraestrutura de recarga desviam vendas de combustão.', 'Incentivos EV: bonificaciones e infraestructura de carga alejan ventas de combustión.'),
          t('Public transit: every 10% shift from private cars cuts urban transport oil demand measurably.', 'Transports publics : chaque transfert de 10 % des voitures privées réduit la demande de pétrole urbaine.', 'Transporte público: cada 10% de deslocamento de carros privados reduz demanda urbana de petróleo.', 'Transporte público: cada 10% de desplazamiento de autos privados reduce demanda urbana de petróleo.'),
        ],
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
        alt: t('Electric vehicle charging at a public station', 'Recharge de véhicule électrique en station publique', 'Carregamento de veículo elétrico em estação pública', 'Carga de vehículo eléctrico en estación pública'),
        caption: t(
          'Countries with combined EV incentives and transit investment show the fastest transport oil demand decline.',
          'Les pays combinant incitations VE et investissement dans les transports montrent la baisse la plus rapide.',
          'Países que combinam incentivos a VE e investimento em transporte mostram a queda mais rápida.',
          'Los países que combinan incentivos EV e inversión en transporte muestran la caída más rápida.',
        ),
      },
      {
        type: 'quote',
        text: t(
          'Supply-side campaigns alone cannot end oil dependence. Demand-side policy is where governments prove they are serious.',
          'Les campagnes côté offre seules ne peuvent pas mettre fin à la dépendance au pétrole. La politique côté demande est la preuve du sérieux des gouvernements.',
          'Campanhas do lado da oferta sozinhas não podem acabar com a dependência do petróleo. Política do lado da demanda é onde governos provam seriedade.',
          'Las campañas del lado de la oferta solas no pueden acabar con la dependencia del petróleo. La política de demanda es donde los gobiernos demuestran seriedad.',
        ),
        attribution: t('M. Santos, Transport & Climate Institute', 'M. Santos, Transport & Climate Institute', 'M. Santos, Transport & Climate Institute', 'M. Santos, Transport & Climate Institute'),
      },
    ],
    attachments: [
      {
        id: 'ds-1',
        label: t('Policy explainer (PDF)', 'Guide politique (PDF)', 'Explicativo de política (PDF)', 'Guía política (PDF)'),
        fileName: 'demand-side-transport-explainer.pdf',
        url: samplePdf,
        fileType: 'pdf',
        sizeLabel: '1.4 MB',
      },
      {
        id: 'ds-2',
        label: t('Country comparison data (CSV)', 'Données comparatives par pays (CSV)', 'Dados comparativos por país (CSV)', 'Datos comparativos por país (CSV)'),
        fileName: 'transport-policy-comparison.csv',
        url: '/files/transport-policy-comparison.csv',
        fileType: 'csv',
        sizeLabel: '72 KB',
      },
    ],
  },

  'narrative-fossil-free-future': {
    coverImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1400&q=80',
    body: [
      {
        type: 'paragraph',
        text: t(
          'How we talk about the fossil fuel phase-out shapes whether audiences feel hope or despair — and whether they act. This narrative framework from the GGON Comms Working Group provides talking points, messages to avoid, and audience segmentation for campaigners.',
          'La façon dont nous parlons de la sortie des fossiles détermine si le public ressent de l\'espoir ou du désespoir. Ce cadre narratif du groupe de communication GGON fournit des points de discussion et des messages à éviter.',
          'Como falamos sobre a eliminação de combustíveis fósseis molda se o público sente esperança ou desespero. Este quadro narrativo do grupo de comunicação GGON fornece pontos de discussão e mensagens a evitar.',
          'Cómo hablamos de la eliminación de combustibles fósiles moldea si el público siente esperanza o desesperación. Este marco narrativo del grupo de comunicaciones GGON proporciona puntos de conversación y mensajes a evitar.',
        ),
      },
      {
        type: 'heading',
        level: 2,
        text: t('Core narrative pillars', 'Piliers narratifs centraux', 'Pilares narrativos centrais', 'Pilares narrativos centrales'),
      },
      {
        type: 'list',
        items: [
          t('A fossil-free future is possible — lead with solutions and visible wins, not only catastrophe.', 'Un avenir sans fossiles est possible — mettez en avant les solutions et les victoires visibles.', 'Um futuro livre de fósseis é possível — lidere com soluções e vitórias visíveis.', 'Un futuro libre de fósiles es posible — lidere con soluciones y victorias visibles.'),
          t('Phase-out is about justice — centre workers and frontline communities, not abstract targets.', 'La sortie est une question de justice — centrez les travailleurs et les communautés de première ligne.', 'A eliminação é sobre justiça — centre trabalhadores e comunidades da linha de frente.', 'La eliminación es cuestión de justicia — centre trabajadores y comunidades de primera línea.'),
          t('The industry knew — accountability narratives build public support for regulation.', 'L\'industrie le savait — les récits de responsabilité renforcent le soutien public à la régulation.', 'A indústria sabia — narrativas de responsabilização constroem apoio público à regulação.', 'La industria lo sabía — narrativas de responsabilidad construyen apoyo público a la regulación.'),
        ],
      },
      {
        type: 'heading',
        level: 3,
        text: t('Messages to avoid', 'Messages à éviter', 'Mensagens a evitar', 'Mensajes a evitar'),
      },
      {
        type: 'list',
        items: [
          t('"We all use oil so we\'re all to blame" — shifts accountability away from producers and policymakers.', '"Nous utilisons tous du pétrole donc nous sommes tous coupables" — déplace la responsabilité.', '"Todos usamos petróleo então todos somos culpados" — desloca responsabilidade.', '"Todos usamos petróleo así que todos somos culpables" — desplaza responsabilidad.'),
          t('"Transition will happen naturally through markets" — ignores political choices and power.', '"La transition se fera naturellement par les marchés" — ignore les choix politiques.', '"A transição acontecerá naturalmente pelos mercados" — ignora escolhas políticas.', '"La transición ocurrirá naturalmente por los mercados" — ignora elecciones políticas.'),
        ],
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80',
        alt: t('Community gathering at a climate rally', 'Rassemblement communautaire lors d\'un rassemblement climatique', 'Reunião comunitária em manifestação climática', 'Reunión comunitaria en manifestación climática'),
        caption: t(
          'Audience segmentation guide included: policymakers, media, youth, and fence-sitters each need tailored framing.',
          'Guide de segmentation inclus : décideurs, médias, jeunes et indécis nécessitent chacun un cadrage adapté.',
          'Guia de segmentação incluído: formuladores de políticas, mídia, jovens e indecisos precisam de enquadramento adaptado.',
          'Guía de segmentación incluida: responsables políticos, medios, jóvenes e indecisos necesitan encuadre adaptado.',
        ),
      },
    ],
    attachments: [
      {
        id: 'nar-1',
        label: t('Narrative framework (PDF)', 'Cadre narratif (PDF)', 'Quadro narrativo (PDF)', 'Marco narrativo (PDF)'),
        fileName: 'fossil-free-future-narrative-framework.pdf',
        url: samplePdf,
        fileType: 'pdf',
        sizeLabel: '980 KB',
      },
      {
        id: 'nar-2',
        label: t('Talking points card deck (ZIP)', 'Fiches de points de discussion (ZIP)', 'Deck de pontos de discussão (ZIP)', 'Mazo de puntos de conversación (ZIP)'),
        fileName: 'narrative-talking-points.zip',
        url: samplePdf,
        fileType: 'zip',
        sizeLabel: '4.1 MB',
      },
    ],
  },

  'brazil-pre-salt-noc-analysis': {
    coverImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1400&q=80',
    body: [
      {
        type: 'paragraph',
        text: t(
          'Brazil\'s pre-salt oil reserves have driven Petrobras expansion plans that conflict with Paris Agreement pathways. This analysis maps announced capex, production targets, and government support against 1.5°C-aligned scenarios for national oil companies.',
          'Les réserves de pré-sel du Brésil ont alimenté des plans d\'expansion de Petrobras incompatibles avec l\'Accord de Paris. Cette analyse cartographie les dépenses d\'investissement annoncées par rapport aux scénarios alignés sur 1,5°C.',
          'As reservas de pré-sal do Brasil impulsionaram planos de expansão da Petrobras em conflito com o Acordo de Paris. Esta análise mapeia capex anunciado e metas de produção contra cenários alinhados a 1,5°C.',
          'Las reservas de pre-sal de Brasil impulsaron planes de expansión de Petrobras en conflicto con el Acuerdo de París. Este análisis mapea capex anunciado y metas de producción contra escenarios alineados con 1,5°C.',
        ),
      },
      {
        type: 'heading',
        level: 2,
        text: t('Investment vs. climate alignment', 'Investissement vs alignement climatique', 'Investimento vs alinhamento climático', 'Inversión vs alineación climática'),
      },
      {
        type: 'list',
        ordered: true,
        items: [
          t('Petrobras 2024–2028 plan allocates $102 billion to exploration and production — 78% to pre-salt.', 'Le plan Petrobras 2024–2028 alloue 102 milliards de dollars à l\'exploration — 78 % au pré-sel.', 'Plano Petrobras 2024–2028 aloca US$ 102 bilhões à exploração — 78% ao pré-sal.', 'Plan Petrobras 2024–2028 asigna US$ 102 mil millones a exploración — 78% a pre-sal.'),
          t('Modeled production growth would consume 14% of the remaining global carbon budget for 1.5°C.', 'La croissance de production modélisée consommerait 14 % du budget carbone restant pour 1,5°C.', 'Crescimento de produção modelado consumiria 14% do orçamento de carbono restante para 1,5°C.', 'El crecimiento de producción modelado consumiría el 14% del presupuesto de carbono restante para 1,5°C.'),
          t('State dividends from pre-salt create political lock-in against phase-out legislation.', 'Les dividendes d\'État du pré-sel créent un verrouillage politique contre la législation de sortie.', 'Dividendos estatais do pré-sal criam bloqueio político contra legislação de eliminação.', 'Los dividendos estatales del pre-sal crean bloqueo político contra legislación de eliminación.'),
        ],
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1200&q=80',
        alt: t('Offshore oil platform in open water', 'Plateforme pétrolière offshore en pleine mer', 'Plataforma de petróleo offshore em mar aberto', 'Plataforma petrolera offshore en mar abierto'),
        caption: t(
          'Pre-salt fields require deepwater infrastructure with decades-long payback periods.',
          'Les champs de pré-sel nécessitent une infrastructure en eau profonde avec des périodes de retour de plusieurs décennies.',
          'Campos de pré-sal exigem infraestrutura em águas profundas com períodos de retorno de décadas.',
          'Los campos de pre-sal requieren infraestructura en aguas profundas con períodos de retorno de décadas.',
        ),
      },
      {
        type: 'quote',
        text: t(
          'Calling Petrobras a climate leader while expanding pre-salt production is greenwashing. The numbers tell a different story.',
          'Appeler Petrobras un leader climatique tout en expandant la production de pré-sel est du greenwashing. Les chiffres racontent une autre histoire.',
          'Chamar a Petrobras de líder climática enquanto expande produção de pré-sal é greenwashing. Os números contam outra história.',
          'Llamar a Petrobras líder climático mientras expande producción de pre-sal es greenwashing. Los números cuentan otra historia.',
        ),
        attribution: t('F. Oliveira, Instituto Clima e Sociedade', 'F. Oliveira, Instituto Clima e Sociedade', 'F. Oliveira, Instituto Clima e Sociedade', 'F. Oliveira, Instituto Clima e Sociedade'),
      },
    ],
    attachments: [
      {
        id: 'br-1',
        label: t('Full NOC analysis report (PDF)', 'Rapport complet (PDF)', 'Relatório completo (PDF)', 'Informe completo (PDF)'),
        fileName: 'brazil-pre-salt-noc-analysis.pdf',
        url: samplePdf,
        fileType: 'pdf',
        sizeLabel: '2.2 MB',
      },
      {
        id: 'br-2',
        label: t('Capex and production data (XLSX)', 'Données d\'investissement et production (XLSX)', 'Dados de capex e produção (XLSX)', 'Datos de capex y producción (XLSX)'),
        fileName: 'petrobras-capex-tracker.xlsx',
        url: '/files/petrobras-capex-tracker.csv',
        fileType: 'xlsx',
        sizeLabel: '156 KB',
      },
    ],
  },
};
