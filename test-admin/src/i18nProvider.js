import polyglotI18nProvider from 'ra-i18n-polyglot';
import { spanishMessages } from './spanishmessages';

export const i18nProvider = polyglotI18nProvider(
    locale => spanishMessages, 'es' //Default locale
);

