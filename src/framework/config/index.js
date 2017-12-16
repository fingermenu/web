// @flow

const developmentConfig = {
  parseServerUrl: 'https://fingermenu-backend.herokuapp.com/parse/',
  parseServerApplicationId: 'FingerMenu',
  parseServerJavascriptKey: 'e74cce0d-e06c-4247-9628-945db4008d6f',
  graphqlEndpoint: 'https://fingermenu-backend.herokuapp.com/graphql',
};

const productionConfig = {
  parseServerUrl: 'https://parse.buddy.com/parse/',
  parseServerApplicationId: '38066dde-ac12-4e7d-ac2b-ab03f3b6e56d',
  parseServerJavascriptKey: '56LOhHqzPC1SRBtpa8vanDFCldkAVZjE',
  graphqlEndpoint: 'https://38066dde-ac12-4e7d-ac2b-ab03f3b6e56d.parse.buddy.express/graphql',
};

export default (process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig);
