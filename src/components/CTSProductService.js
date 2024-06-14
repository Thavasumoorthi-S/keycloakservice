import React from 'react';
import { useKeycloak } from '@react-keycloak/web';

const CTSProductService = () => {
  const { keycloak } = useKeycloak();

  return (
    <div>
      <h1>CTS product Service</h1>
      <p>Welcome, {keycloak.tokenParsed.preferred_username}</p>
      <p>Roles: {keycloak.tokenParsed.realm_access.roles.join(', ')}</p>
    </div>
  );
};

export default CTSProductService;
