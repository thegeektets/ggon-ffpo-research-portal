import type { ArticleSection, Locale, ResearchAttachment, RichArticleContent } from '@/types';
import { additionalRichArticles } from '@/data/articles/additional';
import { articleImages as img } from '@/data/article-images';

const t = (en: string, fr: string, pt: string, es: string): Record<Locale, string> => ({ en, fr, pt, es });

export type { RichArticleContent };

export const richArticles: Record<string, RichArticleContent> = {
  'just-transition-workers-north-sea': {
    coverImage: img.northSeaCover,
    body: [
      {
        type: 'paragraph',
        text: t(
          'Offshore oil and gas workers in the North Sea face an uncertain future as governments and companies accelerate decarbonisation targets. This case study documents how unions, municipalities, and civil society groups are designing retraining pathways that protect livelihoods while aligning with climate goals.',
          'Les travailleurs offshore de la mer du Nord font face à un avenir incertain alors que les gouvernements et les entreprises accélèrent les objectifs de décarbonisation. Cette étude de cas documente comment les syndicats, les municipalités et la société civile conçoivent des parcours de reconversion.',
          'Trabalhadores offshore de petróleo e gás no Mar do Norte enfrentam um futuro incerto à medida que governos e empresas aceleram metas de descarbonização. Este estudo de caso documenta como sindicatos e grupos da sociedade civil estão desenhando caminhos de requalificação.',
          'Los trabajadores offshore del Mar del Norte enfrentan un futuro incierto mientras gobiernos y empresas aceleran los objetivos de descarbonización. Este estudio de caso documenta cómo sindicatos y la sociedad civil diseñan vías de recualificación.',
        ),
      },
      {
        type: 'heading',
        level: 2,
        text: t('Context: A mature basin in transition', 'Contexte : un bassin mature en transition', 'Contexto: uma bacia madura em transição', 'Contexto: una cuenca madura en transición'),
      },
      {
        type: 'paragraph',
        text: t(
          'The UK and Norway together employ roughly 200,000 people directly and indirectly in offshore oil and gas. Production has peaked, yet planned field extensions and new licensing rounds continue to compete with offshore wind, hydrogen, and grid infrastructure for skilled labour and public investment.',
          'Le Royaume-Uni et la Norvège emploient ensemble environ 200 000 personnes dans le pétrole et le gaz offshore. La production a atteint son pic, mais les extensions de champs et les nouvelles licences continuent de concurrencer l\'éolien offshore et l\'hydrogène.',
          'O Reino Unido e a Noruega empregam cerca de 200.000 pessoas no petróleo e gás offshore. A produção atingiu o pico, mas extensões de campos e novas licenças continuam competindo com eólica offshore e hidrogênio.',
          'Reino Unido y Noruega emplean a unas 200.000 personas en petróleo y gas offshore. La producción ha alcanzado su pico, pero las extensiones de campos y nuevas licencias compiten con la eólica marina y el hidrógeno.',
        ),
      },
      {
        type: 'image',
        src: img.northSeaWorkers,
        alt: t(
          'Offshore workers in safety gear on a platform deck',
          'Travailleurs offshore en équipement de sécurité sur une plateforme',
          'Trabalhadores offshore com equipamento de segurança em uma plataforma',
          'Trabajadores offshore con equipo de seguridad en una plataforma',
        ),
        caption: t(
          'Platform crews hold transferable skills in electrical systems, logistics, and safety management — core competencies for offshore wind.',
          'Les équipes de plateforme possèdent des compétences transférables en systèmes électriques, logistique et sécurité.',
          'Equipes de plataforma possuem habilidades transferíveis em sistemas elétricos, logística e segurança.',
          'Los equipos de plataforma tienen habilidades transferibles en sistemas eléctricos, logística y seguridad.',
        ),
        width: 1200,
        height: 800,
      },
      {
        type: 'heading',
        level: 2,
        text: t('Key findings', 'Principales conclusions', 'Principais conclusões', 'Hallazgos clave'),
      },
      {
        type: 'list',
        items: [
          t(
            'Sectoral bargaining agreements in Scotland now include retraining funds financed by a modest levy on remaining production.',
            'Les accords sectoriels en Écosse incluent désormais des fonds de reconversion financés par une légère redevance sur la production.',
            'Acordos setoriais na Escócia agora incluem fundos de requalificação financiados por uma taxa modesta sobre a produção.',
            'Los acuerdos sectoriales en Escocia ahora incluyen fondos de recualificación financiados por un pequeño gravamen sobre la producción.',
          ),
          t(
            'Port cities (Aberdeen, Stavanger, Esbjerg) are repurposing supply-chain firms rather than waiting for market signals alone.',
            'Les villes portuaires réorientent les entreprises de la chaîne d\'approvisionnement plutôt que d\'attendre seuls les signaux du marché.',
            'Cidades portuárias estão reorientando empresas da cadeia de suprimentos em vez de esperar apenas sinais de mercado.',
            'Las ciudades portuarias están reorientando empresas de la cadena de suministro en lugar de esperar solo señales del mercado.',
          ),
          t(
            'Workers report highest anxiety around age discrimination and credential recognition when moving to renewables.',
            'Les travailleurs signalent une anxiété élevée concernant la discrimination liée à l\'âge et la reconnaissance des qualifications.',
            'Trabalhadores relatam maior ansiedade em relação à discriminação por idade e reconhecimento de credenciais ao migrar para renováveis.',
            'Los trabajadores reportan mayor ansiedad por discriminación por edad y reconocimiento de credenciales al pasar a renovables.',
          ),
        ],
      },
      {
        type: 'quote',
        text: t(
          'We built this industry. We have the skills for wind and hydrogen — what we need is a plan that doesn\'t leave us behind when the fields shut.',
          'Nous avons construit cette industrie. Nous avons les compétences pour l\'éolien et l\'hydrogène — il nous faut un plan qui ne nous laisse pas derrière.',
          'Construímos esta indústria. Temos as habilidades para eólica e hidrogênio — precisamos de um plano que não nos deixe para trás.',
          'Construimos esta industria. Tenemos las habilidades para eólica e hidrógeno — necesitamos un plan que no nos deje atrás.',
        ),
        attribution: t('North Sea platform technician, interview 2024', 'Technicien de plateforme en mer du Nord, entretien 2024', 'Técnico de plataforma do Mar do Norte, entrevista 2024', 'Técnico de plataforma del Mar del Norte, entrevista 2024'),
      },
      {
        type: 'heading',
        level: 3,
        text: t('Policy recommendations', 'Recommandations politiques', 'Recomendações de política', 'Recomendaciones de política'),
      },
      {
        type: 'paragraph',
        text: t(
          'Governments should ring-fence transition funds at the point of licensing decisions, require just-transition impact assessments for field decommissioning, and fund union-led skills audits mapped to offshore wind and grid projects already in the pipeline.',
          'Les gouvernements devraient consacrer des fonds de transition lors des décisions de licence, exiger des évaluations d\'impact de transition juste pour le démantèlement, et financer des audits de compétences menés par les syndicats.',
          'Governos devem reservar fundos de transição nas decisões de licenciamento, exigir avaliações de impacto de transição justa para descomissionamento e financiar auditorias de habilidades lideradas por sindicatos.',
          'Los gobiernos deben reservar fondos de transición en las decisiones de licencias, exigir evaluaciones de impacto de transición justa para el desmantelamiento y financiar auditorías de habilidades lideradas por sindicatos.',
        ),
      },
    ],
    attachments: [
      {
        id: 'ns-1',
        label: t('Full case study report (PDF)', 'Rapport complet (PDF)', 'Relatório completo (PDF)', 'Informe completo (PDF)'),
        fileName: 'north-sea-just-transition-report.pdf',
        url: '/files/sample-report.pdf',
        fileType: 'pdf',
        sizeLabel: '2.4 MB',
      },
      {
        id: 'ns-2',
        label: t('Retraining programme directory (XLSX)', 'Répertoire des programmes de reconversion (XLSX)', 'Diretório de programas de requalificação (XLSX)', 'Directorio de programas de recualificación (XLSX)'),
        fileName: 'north-sea-retraining-programmes.xlsx',
        url: '/files/north-sea-retraining-programmes.csv',
        fileType: 'xlsx',
        sizeLabel: '186 KB',
      },
      {
        id: 'ns-3',
        label: t('Field site photo pack (ZIP)', 'Pack photos de terrain (ZIP)', 'Pacote de fotos de campo (ZIP)', 'Paquete de fotos de campo (ZIP)'),
        fileName: 'north-sea-site-photos.zip',
        url: '/files/sample-report.pdf',
        fileType: 'zip',
        sizeLabel: '14.2 MB',
      },
    ],
  },
  'ecuador-amazon-oil-impacts': {
    coverImage: img.ecuadorCover,
    body: [
      {
        type: 'paragraph',
        text: t(
          'For decades, oil extraction in the Ecuadorian Amazon has contaminated rivers, displaced Indigenous communities, and fragmented critical habitat. This community-led report combines water sampling data, oral histories, and satellite imagery to document ongoing impacts near active and legacy oil blocks.',
          'Depuis des décennies, l\'extraction pétrolière en Amazonie équatorienne contamine les rivières et déplace les communautés autochtones. Ce rapport communautaire combine échantillonnage de l\'eau, histoires orales et imagerie satellite.',
          'Há décadas, a extração de petróleo na Amazônia equatoriana contamina rios e desloca comunidades indígenas. Este relatório comunitário combina amostragem de água, histórias orais e imagens de satélite.',
          'Durante décadas, la extracción petrolera en la Amazonía ecuatoriana ha contaminado ríos y desplazado comunidades indígenas. Este informe comunitario combina muestreo de agua, historias orales e imágenes satelitales.',
        ),
      },
      {
        type: 'heading',
        level: 2,
        text: t('Methodology', 'Méthodologie', 'Metodologia', 'Metodología'),
      },
      {
        type: 'paragraph',
        text: t(
          'Between 2022 and 2023, monitors from six Waorani and Kichwa communities collected 142 water samples upstream and downstream of pipeline corridors. Samples were analysed for total petroleum hydrocarbons (TPH), heavy metals, and bacterial indicators. Community mappers paired results with GPS coordinates and seasonal river levels.',
          'Entre 2022 et 2023, des moniteurs de six communautés Waorani et Kichwa ont collecté 142 échantillons d\'eau en amont et en aval des corridors de pipelines, analysés pour hydrocarbures totaux et métaux lourds.',
          'Entre 2022 e 2023, monitores de seis comunidades Waorani e Kichwa coletaram 142 amostras de água a montante e a jusante de corredores de dutos, analisadas para hidrocarbonetos totais e metais pesados.',
          'Entre 2022 y 2023, monitores de seis comunidades Waorani y Kichwa recogieron 142 muestras de agua aguas arriba y abajo de corredores de oleoductos, analizadas para hidrocarburos totales y metales pesados.',
        ),
      },
      {
        type: 'image',
        src: img.ecuadorForest,
        alt: t(
          'Dense Amazon rainforest canopy along a river',
          'Canopée dense de la forêt amazonienne le long d\'une rivière',
          'Dossel denso da floresta amazônica ao longo de um rio',
          'Dosel denso del bosque amazónico a lo largo de un río',
        ),
        caption: t(
          'Oil blocks overlap protected forest areas and community territories in Ecuador\'s Oriente region.',
          'Les blocs pétroliers chevauchent des zones forestières protégées et des territoires communautaires dans l\'Oriente équatorien.',
          'Blocos de petróleo se sobrepõem a áreas florestais protegidas e territórios comunitários na região de Oriente.',
          'Los bloques petroleros se superponen a áreas forestales protegidas y territorios comunitarios en la región de Oriente.',
        ),
        width: 1200,
        height: 800,
      },
      {
        type: 'heading',
        level: 2,
        text: t('Documented impacts', 'Impacts documentés', 'Impactos documentados', 'Impactos documentados'),
      },
      {
        type: 'list',
        ordered: true,
        items: [
          t('68% of downstream samples exceeded national TPH limits during low-water season.', '68 % des échantillons en aval dépassaient les limites nationales de HCT en saison sèche.', '68% das amostras a jusante excederam os limites nacionais de HCT na estação seca.', '68% de las muestras aguas abajo superaron los límites nacionales de HCT en temporada seca.'),
          t('Fish consumption advisories were issued in four communities due to mercury and lead levels.', 'Des avis de consommation de poisson ont été émis dans quatre communautés en raison des niveaux de mercure et de plomb.', 'Avisos de consumo de peixe foram emitidos em quatro comunidades devido a níveis de mercúrio e chumbo.', 'Se emitieron avisos de consumo de pescado en cuatro comunidades por niveles de mercurio y plomo.'),
          t('Deforestation within 5 km of access roads increased 23% compared to 2018 baseline.', 'La déforestation dans un rayon de 5 km des routes d\'accès a augmenté de 23 % par rapport à la référence de 2018.', 'O desmatamento em um raio de 5 km das estradas de acesso aumentou 23% em relação à linha de base de 2018.', 'La deforestación en un radio de 5 km de carreteras de acceso aumentó un 23% respecto a la línea base de 2018.'),
        ],
      },
      {
        type: 'quote',
        text: t(
          'The company says the spill was cleaned. Our children still get rashes when they swim where the creek meets the pipeline.',
          'L\'entreprise dit que la fuite a été nettoyée. Nos enfants ont encore des éruptions quand ils nagent là où le ruisseau rejoint le pipeline.',
          'A empresa diz que o vazamento foi limpo. Nossas crianças ainda têm erupções quando nadam onde o riacho encontra o duto.',
          'La empresa dice que el derrame fue limpiado. Nuestros hijos aún tienen sarpullidos cuando nadan donde el arroyo se une al oleoducto.',
        ),
        attribution: t('Community health monitor, Block 16 vicinity', 'Moniteur de santé communautaire, environs du Bloc 16', 'Monitor de saúde comunitária, proximidades do Bloco 16', 'Monitor de salud comunitaria, cercanías del Bloque 16'),
      },
      {
        type: 'image',
        src: img.ecuadorCommunity,
        alt: t(
          'Community members gathering water samples at a riverbank',
          'Membres de la communauté prélevant des échantillons d\'eau sur une rive',
          'Membros da comunidade coletando amostras de água na margem do rio',
          'Miembros de la comunidad tomando muestras de agua en la orilla del río',
        ),
        caption: t(
          'Community monitors record GPS coordinates and seasonal conditions for every sample.',
          'Les moniteurs communautaires enregistrent les coordonnées GPS et les conditions saisonnières pour chaque échantillon.',
          'Monitores comunitários registram coordenadas GPS e condições sazonais para cada amostra.',
          'Los monitores comunitarios registran coordenadas GPS y condiciones estacionales para cada muestra.',
        ),
        width: 1200,
        height: 800,
      },
    ],
    attachments: [
      {
        id: 'ec-1',
        label: t('Full ecological impact report (PDF)', 'Rapport complet sur les impacts écologiques (PDF)', 'Relatório completo de impacto ecológico (PDF)', 'Informe completo de impacto ecológico (PDF)'),
        fileName: 'ecuador-amazon-oil-impacts-report.pdf',
        url: '/files/sample-report.pdf',
        fileType: 'pdf',
        sizeLabel: '5.1 MB',
      },
      {
        id: 'ec-2',
        label: t('Water sampling dataset (CSV)', 'Jeu de données d\'échantillonnage de l\'eau (CSV)', 'Conjunto de dados de amostragem de água (CSV)', 'Conjunto de datos de muestreo de agua (CSV)'),
        fileName: 'ecuador-water-samples-2022-2023.csv',
        url: '/files/ecuador-water-samples.csv',
        fileType: 'csv',
        sizeLabel: '94 KB',
      },
      {
        id: 'ec-3',
        label: t('Satellite imagery comparison (PNG)', 'Comparaison d\'imagerie satellite (PNG)', 'Comparação de imagens de satélite (PNG)', 'Comparación de imágenes satelitales (PNG)'),
        fileName: 'ecuador-deforestation-overlay.png',
        url: img.satellite,
        fileType: 'image',
        sizeLabel: '1.8 MB',
      },
    ],
  },
  'ccs-greenwashing-assessment': {
    coverImage: img.ccsCover,
    body: [
      {
        type: 'paragraph',
        text: t(
          'Major oil companies increasingly promote carbon capture and storage (CCS) as proof of climate action. This policy brief reviews public claims from the ten largest IOCs against deployment data, lifecycle emissions science, and stated 2030 capture targets.',
          'Les grandes compagnies pétrolières promeuvent de plus en plus la capture et le stockage du carbone (CCS) comme preuve d\'action climatique. Cette note politique examine les allégations publiques des dix plus grandes IOC.',
          'Grandes petroleiras promovem cada vez mais a captura e armazenamento de carbono (CCS) como prova de ação climática. Este briefing político revisa alegações públicas das dez maiores IOCs.',
          'Las grandes petroleras promueven cada vez más la captura y almacenamiento de carbono (CCS) como prueba de acción climática. Este informe político revisa las afirmaciones públicas de las diez mayores IOC.',
        ),
      },
      {
        type: 'heading',
        level: 2,
        text: t('Executive summary', 'Résumé exécutif', 'Resumo executivo', 'Resumen ejecutivo'),
      },
      {
        type: 'paragraph',
        text: t(
          'Despite marketing that portrays CCS as scalable and imminent, operational capture capacity from oil majors remains below 0.5% of their combined annual emissions. Most announced projects are pilot-scale, depend on public subsidies, and primarily target enhanced oil recovery rather than permanent geological storage.',
          'Malgré un marketing présentant le CCS comme évolutif et imminent, la capacité opérationnelle des majors reste inférieure à 0,5 % de leurs émissions annuelles combinées. La plupart des projets annoncés sont pilotes et dépendent de subventions publiques.',
          'Apesar do marketing que retrata o CCS como escalável e iminente, a capacidade operacional das majors permanece abaixo de 0,5% de suas emissões anuais combinadas. A maioria dos projetos anunciados são pilotos e dependem de subsídios públicos.',
          'A pesar del marketing que presenta el CCS como escalable e inminente, la capacidad operativa de las majors sigue por debajo del 0,5% de sus emisiones anuales combinadas. La mayoría de los proyectos anunciados son pilotos y dependen de subsidios públicos.',
        ),
      },
      {
        type: 'image',
        src: img.ccsRefinery,
        alt: t(
          'Industrial refinery with smoke stacks against a cloudy sky',
          'Raffinerie industrielle avec cheminées sous un ciel nuageux',
          'Refinaria industrial com chaminés contra um céu nublado',
          'Refinería industrial con chimeneas bajo un cielo nublado',
        ),
        caption: t(
          'Figure 1: Announced CCS capacity vs. operational capture at oil major facilities (2024).',
          'Figure 1 : Capacité CCS annoncée vs capture opérationnelle dans les installations des majors pétrolières (2024).',
          'Figura 1: Capacidade CCS anunciada vs captura operacional em instalações das majors (2024).',
          'Figura 1: Capacidad CCS anunciada vs captura operacional en instalaciones de las majors (2024).',
        ),
        width: 1200,
        height: 800,
      },
      {
        type: 'heading',
        level: 2,
        text: t('Assessment criteria', 'Critères d\'évaluation', 'Critérios de avaliação', 'Criterios de evaluación'),
      },
      {
        type: 'list',
        items: [
          t('Alignment with IPCC pathways that require steep demand-side reductions, not offsetting continued production.', 'Alignement avec les trajectoires du GIEC exigeant de fortes réductions côté demande.', 'Alinhamento com trajetórias do IPCC que exigem reduções acentuadas no lado da demanda.', 'Alineación con trayectorias del IPCC que exigen reducciones pronunciadas en la demanda.'),
          t('Transparency on project status: announced, permitted, under construction, or operational.', 'Transparence sur le statut des projets : annoncé, autorisé, en construction ou opérationnel.', 'Transparência sobre o status do projeto: anunciado, licenciado, em construção ou operacional.', 'Transparencia sobre el estado del proyecto: anunciado, autorizado, en construcción u operativo.'),
          t('Lifecycle accounting including upstream emissions and energy penalty of capture processes.', 'Comptabilité du cycle de vie incluant les émissions en amont et la pénalité énergétique de la capture.', 'Contabilidade do ciclo de vida incluindo emissões upstream e penalidade energética da captura.', 'Contabilidad del ciclo de vida incluyendo emisiones upstream y penalización energética de la captura.'),
          t('Community consent and liability frameworks for CO₂ storage sites.', 'Consentement communautaire et cadres de responsabilité pour les sites de stockage de CO₂.', 'Consentimento comunitário e frameworks de responsabilidade para locais de armazenamento de CO₂.', 'Consentimiento comunitario y marcos de responsabilidad para sitios de almacenamiento de CO₂.'),
        ],
      },
      {
        type: 'heading',
        level: 3,
        text: t('Conclusion', 'Conclusion', 'Conclusão', 'Conclusión'),
      },
      {
        type: 'paragraph',
        text: t(
          'CCS should not be used to justify new licensing or production growth. Policymakers should treat oil-industry CCS pledges as conditional, verify operational delivery annually, and prioritise regulations that reduce fossil fuel demand and protect communities from false-solution narratives.',
          'Le CCS ne doit pas servir à justifier de nouvelles licences ou une croissance de la production. Les décideurs doivent traiter les engagements CCS de l\'industrie pétrolière comme conditionnels et vérifier la livraison opérationnelle chaque année.',
          'O CCS não deve ser usado para justificar novas licenças ou crescimento da produção. Formuladores de políticas devem tratar compromissos de CCS da indústria petrolífera como condicionais e verificar a entrega operacional anualmente.',
          'El CCS no debe usarse para justificar nuevas licencias o crecimiento de la producción. Los responsables políticos deben tratar los compromisos de CCS de la industria petrolera como condicionales y verificar la entrega operativa anualmente.',
        ),
      },
    ],
    attachments: [
      {
        id: 'ccs-1',
        label: t('Policy brief (PDF)', 'Note politique (PDF)', 'Briefing político (PDF)', 'Informe político (PDF)'),
        fileName: 'ccs-greenwashing-policy-brief.pdf',
        url: '/files/sample-report.pdf',
        fileType: 'pdf',
        sizeLabel: '1.2 MB',
      },
      {
        id: 'ccs-2',
        label: t('IOC claims vs. deployment tracker (XLSX)', 'Suivi des allégations vs déploiement des IOC (XLSX)', 'Rastreador de alegações vs implantação das IOCs (XLSX)', 'Seguimiento de afirmaciones vs despliegue de IOC (XLSX)'),
        fileName: 'ccs-ioc-deployment-tracker.xlsx',
        url: '/files/ccs-deployment-tracker.csv',
        fileType: 'xlsx',
        sizeLabel: '312 KB',
      },
      {
        id: 'ccs-3',
        label: t('Infographic: CCS reality check (PNG)', 'Infographie : bilan CCS (PNG)', 'Infográfico: balanço do CCS (PNG)', 'Infografía: balance del CCS (PNG)'),
        fileName: 'ccs-infographic.png',
        url: img.ccsChart,
        fileType: 'image',
        sizeLabel: '890 KB',
      },
    ],
  },
  ...additionalRichArticles,
};

export function getRichArticle(slug: string): RichArticleContent | undefined {
  return richArticles[slug];
}

/** @deprecated Use usePortalStore().getRichArticle for merged seed + published content */
export const seedRichArticleMap = richArticles;
