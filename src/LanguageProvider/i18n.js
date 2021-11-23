/*
 * @Project G1 Tracing
 * @Author Zodinet Technology (info@zodinet.com)
 * @Createdate 04/26/2020, 16:36
 *
 * This file is part of Zodinet (https://zodinet.com)
 *

 */
import enTranslationMessages from 'translations/en.json';
import viTranslationMessages from 'translations/vi.json';

const DEFAULT_LOCALE = 'en';
const appLocales = ['vi', 'en'];

const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, viTranslationMessages)
      : {};
  return Object.keys(messages).reduce((formattedMessages, key) => {
    let message = messages[key];
    if (!message && locale !== DEFAULT_LOCALE) {
      message = defaultFormattedMessages[key];
    }
    return Object.assign(formattedMessages, {[key]: message});
  }, {});
};

const createFromResourceLanguage = (data) => {
  return {
    vi: formatTranslationMessages('vi', data.vi),
    en: formatTranslationMessages('en', data.en),
  };
};

const translationMessages = {
  vi: formatTranslationMessages('vi', viTranslationMessages),
  en: formatTranslationMessages('en', enTranslationMessages),
};

export {translationMessages, formatTranslationMessages, appLocales, createFromResourceLanguage};
