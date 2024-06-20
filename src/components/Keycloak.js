import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8080',
  realm: 'ProjectDemo',
  clientId: 'ProductService',
});

export default keycloak;
