import React, { useState, useEffect, useContext } from 'react';
import Nav from './components/Nav';
import SearchBar from './components/SearchBar';
import HomeListForm from './components/HomeListForm';
import { BrowserRouter as Router, Route, Switch, Redirect, useLocation } from 'react-router-dom';
import HomeList from './components/HomeList';
import './styles/App.css';
import TenantContext from "./context/TenantContext";
import Axios from 'axios';
import Register from './components/Tenant/Register';
import Login from './components/Tenant/Login';
import Account from './components/Tenant/Account';
import PropertyDetails from './components/PropertyDetails';
import Featured from './components/Featured'


function PrivateRoute({ children, ...rest }) {
    const { tenantData, setTenantData } = useContext(TenantContext);
    const location = useLocation();
    let mtp = JSON.parse(sessionStorage.getItem("mtp"));
    let isAuthenticated;
    if (mtp || tenantData.tenant !== undefined)
        isAuthenticated = true;
    else isAuthenticated = false;
    return (
        <Route {...rest} render={() => {
            return isAuthenticated
                ? children
                : <Redirect to={{ pathname: '/tenant/login', state: { from: location.pathname, prevState: location.state } }} />
        }} />
    )
}

const App = () => {
    const [tenantData, setTenantData] = useState({
        token: undefined,
        tenant: undefined
    });

    useEffect(() => {
        const checkLoggedIn = async () => {
            let token = sessionStorage.getItem("token");
            if (token === null) {
                sessionStorage.setItem("token", "");
                sessionStorage.removeItem("mtp");
                token = "";
            }
            const isTokenValid = await Axios.post("/api/tenant/isTokenValid",
                null,
                {
                    headers: {
                        "token": token
                    }
                });

            if (isTokenValid.data) {
                const tenantRes = await Axios.get("/api/tenant",
                    {
                        headers: {
                            "token": token
                        }
                    });
                setTenantData({
                    token,
                    tenant: tenantRes.data
                })
                sessionStorage.setItem("mtp", JSON.stringify(tenantRes.data));
            }
        };
        checkLoggedIn();
    }, [])

    return (
        <Router>
            <TenantContext.Provider value={{ tenantData, setTenantData }}>
                <Switch>
                    <Route path='/properties'>
                        <Nav active={1} searchBar={true} />
                        <HomeList />
                    </Route>
                    <Route path='/property-details'>
                        <Nav active={0} searchBar={false} />
                        <PropertyDetails />
                    </Route>
                    {/* <Route path='/list-property'>
                        <Nav active={2} />
                        <HomeListForm />
                    </Route> */}
                    <Route exact path='/'>
                        <div className="first-container">
                            <Nav active={0} searchBar={false} />
                            <div className="search-container">
                                <div className="seach-box">
                                    <div className="search-text">
                                        <h3 className="highlight-container p-3"><span className="highlight">Find your Ideal Home here!</span></h3>
                                    </div>
                                    <div className="search-input">
                                        <SearchBar />
                                    </div>
                                </div>
                                <Featured />
                            </div>
                        </div>
                    </Route>
                    <Route path='/tenant/register'>
                        <Nav active={0} searchBar={false} />
                        <Register />
                    </Route>
                    <Route path='/tenant/login'>
                        <Nav active={0} searchBar={false} />
                        <Login />
                    </Route>
                    <PrivateRoute path='/tenant/my-account'>
                        <Nav active={0} searchBar={false} />
                        <Account />
                    </PrivateRoute>
                </Switch>
            </TenantContext.Provider>
        </Router>
    )
}

export default App;
