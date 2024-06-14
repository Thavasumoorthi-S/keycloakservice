// src/PrivateRoute.js

import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

const PrivateRoute = ({ element: Element, roles,tenantid, ...rest }) => {
  const { keycloak } = useKeycloak();

  const hasRequiredRole = (roles) => {
    if (!keycloak || !keycloak.tokenParsed) {
      return false;
    }

    // Check realm roles
    const realmRoles = keycloak.tokenParsed.realm_access?.roles || [];
    if ((roles.some(role => realmRoles.includes(role))) &&(keycloak?.tokenParsed?.tenant_token==tenantid) ) {
        window.alert("Hi ")
      return true;
    }

    // Check resource roles
//     const resourceRoles = keycloak.tokenParsed.resource_access || {};
//     console.log(resourceRoles)
//     for (let client in resourceRoles) {
//         console.log("client is",client)
//       const clientRoles = resourceRoles[client].roles || [];
//       if (roles.some(role => clientRoles.includes(role))) {
//         if(keycloak.tokenParsed.tenant_token==tenantid){
//             return true;
//         }
//         return false
//       }
//     }

//     return false;
  };

  return (
    <Route
      {...rest}
      element={(props) =>
        keycloak.authenticated && (!roles || hasRequiredRole) ? (
          <Element {...props} />
        ) : (
          <Navigate to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
