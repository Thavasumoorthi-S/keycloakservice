import React from 'react';
import { useKeycloak } from '@react-keycloak/web';

const Login = () => {
  const { keycloak } = useKeycloak();

  const handleLogin = () => {
    keycloak.login();
  };

  const handleLogout = () => {
    keycloak.logout();
  };


  return (
    <div>
      <h1>Login Page</h1>
      {!keycloak.authenticated ? (
        <button onClick={handleLogin}>Login</button>
      ) : (
        <div>
          <p>Welcome, {keycloak.tokenParsed.preferred_username}!</p>
          <p>Roles: {keycloak.tokenParsed.realm_access.roles.join(', ')}</p>
        </div>
      )}

      <div>
        
            {keycloak.authenticated && (
                <button onClick={handleLogout}>Logout</button>
              )}
      
        
      </div>
    </div>

  );
};

export default Login;
