import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TenantContext from '../../context/TenantContext';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory, useLocation } from "react-router-dom";

export default function AuthOptions() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const history = useHistory();
    const location = useLocation();

    const gotoAccount = () => history.push("/tenant/my-account");

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const { tenantData, setTenantData } = useContext(TenantContext);
    const logout = () => {
        setTenantData({
            token: undefined,
            tenant: undefined
        });
        sessionStorage.setItem("token", "");
        sessionStorage.removeItem("mtp");
        history.push("/");
    }
    useEffect(() => {
        if (tenantData.tenant === undefined)
            sessionStorage.removeItem("mtp")
    }, [])

    return (
        <>
            {
                tenantData.tenant === undefined
                    ?
                    <>
                        <Link to='/tenant/register'>
                            <button type="button" className="btn btn-outline-info mr-2">Register</button>
                        </Link>
                        <Link to={{ pathname: '/tenant/login', state: { from: location.pathname, prevState: location.state } }}>
                            <button type="button" className="btn btn-outline-info">Login</button>
                        </Link>
                    </>
                    :
                    <>
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                            <img width="50px" src="https://www.flaticon.com/svg/static/icons/svg/2919/2919600.svg" alt="profile icon" />
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={gotoAccount}>My Account</MenuItem>
                            <MenuItem onClick={logout}>Logout</MenuItem>
                        </Menu>
                    </>
            }
        </>
    )
}
