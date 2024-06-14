import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import Login from './components/Login';
// import AccountService from './components/Accountservice';
// import ProductService from './components/Productservice';
import CTSAccountService from './components/CTSAccountService';
import CTSProductService from './components/CTSProductService';
import TCSAccountServive from './components/TCSAccountService';
import TCSProductService from './components/TCSProductService';
// import PrivateRoute from "./components/PrivateRoute"
const App = () => {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) {
    return <div>Loading...</div>;
  }

  console.log("Token parsed",keycloak.tokenParsed,keycloak.authenticated,keycloak?.tokenParsed?.tenant_token)


  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/accountservice" element={<PrivateRoute component={AccountService}  roles={['admin']}/>} />
        <Route path="/productservice" element={<PrivateRoute component={ProductService} roles={['manager']} />} /> */}
        <Route path="/ctsaccountservice" element={<PrivateRoute component={CTSAccountService} roles={['ADMIN']} tenantid={'cts'} />} />
        <Route path="/ctsproductservice" element={<PrivateRoute component={CTSProductService} roles={['DIRECTOR']} tenantid={'cts'}/>} />
        <Route path="/tcsaccountservice" element={<PrivateRoute component={TCSAccountServive} roles={['ADMIN']} tenantid={'tcs'} />} />
        <Route path="/tcsproductservice" element={<PrivateRoute component={TCSProductService} roles={['DIRECTOR']}  tenantid={'tcs'}/>} />

      </Routes>
    </Router>
  );
};

const PrivateRoute = ({ component: Component, roles,tenantid }) => {
  const { keycloak } = useKeycloak();

  if (!keycloak.authenticated) {
    return <Navigate to="/" />;
  }

  if (roles) {
    const userRoles = keycloak.tokenParsed.realm_access.roles;
    console.log("+++++tenantid",tenantid)
    const hasRequiredRole = roles.some(role => userRoles.includes(role)) && (keycloak?.tokenParsed?.tenant_token===tenantid);
    if (!hasRequiredRole) {
      // window.alert("hi")
      return <Navigate to="/" />;
    }
  }

  return <Component />;
};

export default App;
