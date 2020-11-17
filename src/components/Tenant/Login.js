import React, { useState, useContext } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from "axios";
import TenantContext from '../../context/TenantContext';
import { Link, useLocation, useHistory } from "react-router-dom";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = () => {
    const history = useHistory();
    const location = useLocation();
    console.log("checkk", location)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('warning');
    const [snackbarMsg, setSnackbarMsg] = useState('');
    const { setTenantData } = useContext(TenantContext);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const tenantLogin = (e) => {
        e.preventDefault();
        const postURL = 'https://mighty-temple-22601.herokuapp.com/api/tenant/login';

        axios.post(postURL, {
            email,
            password
        })
            .then(res => {
                let { id, email, name, contact } = res.data;
                setTenantData({
                    token: res.data.token,
                    tenant: {
                        id,
                        name,
                        email,
                        contact
                    },
                });
                sessionStorage.setItem("token", res.data.token);
                sessionStorage.setItem("mtp", JSON.stringify(res.data));
                if (location.state.from)
                    history.push({
                        pathname: location.state.from,
                        state: location.state.prevState
                    })
                else history.push("/")
            })
            .catch(err => {
                setOpen(true);
                setSeverity('error');
                setSnackbarMsg(err.response.data.message)
            });
    }

    return (
        <>
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert position="center" onClose={handleClose} severity={severity}>
                    {snackbarMsg}
                </Alert>
            </Snackbar>
            <form className="home-container" onSubmit={e => tenantLogin(e)}>
                <div className="home-form">
                    <h3>Log In</h3>
                    <label>E-mail</label>
                    <input className="form-control" type="text" placeholder="E-mail" onChange={e => setEmail(e.target.value)} value={email} />
                    <label>Password</label>
                    <input className="form-control" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password} />
                    <button className="btn btn-info btn-lg" type="submit">LOGIN</button>
                </div>
            </form>
        </>
    )
}

export default Login
