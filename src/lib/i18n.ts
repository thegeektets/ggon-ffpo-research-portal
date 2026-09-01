import type { Locale } from '@/types';

export const locales: Locale[] = ['en', 'fr', 'pt', 'es'];

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  pt: 'Português',
  es: 'Español',
};

type Messages = Record<string, string>;

const en: Messages = {
  siteName: 'GGON Research Portal',
  tagline: 'Fossil Fuel Phase-Out Research Library',
  home: 'Home',
  library: 'Research Library',
  themes: 'Priority Themes',
  narratives: 'Narratives',
  about: 'About',
  members: 'Member Directory',
  submit: 'Submit Research',
  askConnect: 'Ask & Connect',
  admin: 'Admin',
  login: 'Log in',
  register: 'Register',
  logout: 'Log out',
  searchPlaceholder: 'Search research… use AND / OR for Boolean queries',
  advancedSearch: 'Advanced search & filters',
  featuredThemes: 'Priority research themes',
  wordCloud: 'Popular topics',
  viewLibrary: 'Browse full library',
  membersOnly: 'Members only',
  demoCredentials: 'Demo accounts (password: demo123)',
  pendingApproval: 'Your registration is pending admin approval.',
  submissionSuccess: 'Submission received — it will appear after reviewer approval.',
};

const fr: Messages = {
  ...en,
  siteName: 'Portail de recherche GGON',
  tagline: 'Bibliothèque de recherche sur la sortie des énergies fossiles',
  home: 'Accueil',
  library: 'Bibliothèque',
  themes: 'Thèmes prioritaires',
  narratives: 'Récits',
  about: 'À propos',
  members: 'Annuaire des membres',
  submit: 'Soumettre une recherche',
  askConnect: 'Demander & Connecter',
  admin: 'Administration',
  login: 'Connexion',
  register: "S'inscrire",
  logout: 'Déconnexion',
  searchPlaceholder: 'Rechercher… utilisez ET / OU pour les requêtes booléennes',
};

const pt: Messages = {
  ...en,
  siteName: 'Portal de Pesquisa GGON',
  tagline: 'Biblioteca de pesquisa sobre eliminação de combustíveis fósseis',
  home: 'Início',
  library: 'Biblioteca',
  themes: 'Temas prioritários',
  narratives: 'Narrativas',
  about: 'Sobre',
  members: 'Diretório de membros',
  submit: 'Enviar pesquisa',
  askConnect: 'Perguntar & Conectar',
  admin: 'Administração',
  login: 'Entrar',
  register: 'Registrar',
  logout: 'Sair',
};

const es: Messages = {
  ...en,
  siteName: 'Portal de Investigación GGON',
  tagline: 'Biblioteca de investigación sobre eliminación de combustibles fósiles',
  home: 'Inicio',
  library: 'Biblioteca',
  themes: 'Temas prioritarios',
  narratives: 'Narrativas',
  about: 'Acerca de',
  members: 'Directorio de miembros',
  submit: 'Enviar investigación',
  askConnect: 'Preguntar y Conectar',
  admin: 'Administración',
  login: 'Iniciar sesión',
  register: 'Registrarse',
  logout: 'Cerrar sesión',
};

export const messages: Record<Locale, Messages> = { en, fr, pt, es };

export function t(locale: Locale, key: string): string {
  return messages[locale][key] ?? messages.en[key] ?? key;
}
