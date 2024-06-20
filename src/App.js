import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import Login from './components/Login';
import Chatservice from  "./components/Chatservice"
import Productservice from  "./components/Productservice"

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
        {/* <Route path="/ctsaccountservice" element={<PrivateRoute component={CTSAccountService} roles={['ADMIN']} tenantid={'cts'} />} />
        <Route path="/ctsproductservice" element={<PrivateRoute component={CTSProductService} roles={['DIRECTOR']} tenantid={'cts'}/>} />*/}
        <Route path="/chatservice" element={<PrivateRoute component={Chatservice} roles={['CS_ADMIN',"CS_USER","CS_EXEC"]} tenantid={'Tenant1'} clientId={"ChatService"} />} />
        <Route path="/productservice" element={<PrivateRoute component={Productservice}roles={['PS_ADMIN',"PS_USER"]}  tenantid={'Tenant2'} clientId={"ProductService"}/>} /> 
        {/* <Route path="/chatservice" element={<Chatservice />} />
        <Route path="/productservice" element={<Productservice />} /> */}


      </Routes>
    </Router>
  );
};

const PrivateRoute = ({ component: Component, roles, tenantid, clientId }) => {
  const { keycloak } = useKeycloak();

  if (!keycloak.authenticated) {
    return <Navigate to="/" />;
  }

  if (roles) {
    // Extract roles dynamically based on the provided clientId
    const userRoles = keycloak.tokenParsed.resource_access?.[clientId]?.roles || [];
    const tenantToken = keycloak.tokenParsed['tenant-id'];
    
    // Check if user has the required roles and the correct tenant ID
    const hasRequiredRole = roles.some(role => userRoles.includes(role)) && tenantToken.includes(tenantid);
    
    if (!hasRequiredRole) {
      return <Navigate to="/" />;
    }
  }

  return <Component />;
};

export default App;
