// @flow

import i18next from 'i18next';

i18next.init({
  interpolation: {
    escapeValue: false,
  },
  lng: 'en',
  resources: {
    en: {
      translation: {
        englishLanguage: { menuItem: 'English' },
        chineseLanguage: { menuItem: '中国' },
        home: { label: 'Home' },
        homePage: { label: 'Home Page' },
        signUp: { label: 'Sign Up' },
        signIn: { label: 'Sign In' },
        signOut: { label: 'Sign Out' },
      },
    },
    zh: {
      translation: {
        englishLanguage: { menuItem: 'English' },
        chineseLanguage: { menuItem: '中国' },
        home: { label: '家' },
        homePage: { label: '主页' },
        signUp: { label: '注册' },
        signIn: { label: '登录' },
        signOut: { label: '注销' },
      },
    },
  },
});

export default i18next;
