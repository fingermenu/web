// @flow

const developmentConfig = {
  parseServerUrl: 'https://trolleysmart-backend.herokuapp.com/parse/',
  parseServerApplicationId: 'TrolleySmart',
  parseServerJavascriptKey: 'e74cce0d-e06c-4247-9628-945db4008d6f',
  graphqlEndpoint: 'https://trolleysmart-backend.herokuapp.com/graphql',
};

const productionConfig = {
  parseServerUrl: 'https://parse.buddy.com/parse/',
  parseServerApplicationId: '50a47f7f-411a-4abb-8c50-3daabac420eb',
  parseServerJavascriptKey: 'w2GaCmTc2U7QwjbR3NGA1cg0UTjvbSYE',
  graphqlEndpoint: 'https://50a47f7f-411a-4abb-8c50-3daabac420eb.parse.buddy.express/graphql',
};

export default (process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig);
