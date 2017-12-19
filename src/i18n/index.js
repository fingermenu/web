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
        home: { label: 'Home' },
        signUp: { label: 'Sign Up' },
        signIn: { label: 'Sign In' },
        signOut: { label: 'Sign Out' },
      },
    },
    zh: {
      translation: {
        home: { label: '家' },
        signUp: { label: '注册' },
        signIn: { label: '登录' },
        signOut: { label: '注销' },
      },
    },
  },
});

export default i18next;
