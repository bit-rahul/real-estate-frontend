import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from "axios";
import { useHistory } from "react-router-dom";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Register = () => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState(null);
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('warning');
    const [snackbarMsg, setSnackbarMsg] = useState('');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const registerTenant = () => {
        const postURL = 'https://whispering-escarpment-26214.herokuapp.com/api/tenant/register';

        axios.post(postURL, {
            name,
            email,
            contact,
            password,
            password2
        })
            .then(resp => {
                setTimeout(function () {
                    history.push("/tenant/login");
                }, 3000);
                setOpen(true);
                setSeverity('success');
                setSnackbarMsg('Account Created Successfully! Please log in.');
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
            <div className="home-container">
                <div className="home-form">
                    <h3>Register as Tenant</h3>
                    <label>Name</label>
                    <input className="form-control" type="text" placeholder="Name" onChange={e => setName(e.target.value)} value={name} />
                    <label>E-mail</label>
                    <input className="form-control" type="text" placeholder="E-mail" onChange={e => setEmail(e.target.value)} value={email} />
                    <label>Contact</label>
                    <input className="form-control" type="number" placeholder="Contact" onChange={e => setContact(e.target.value)} value={contact} />
                    <label>Password</label>
                    <input className="form-control" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password} />
                    <label>Confirm Password</label>
                    <input className="form-control" type="password" placeholder="Confirm Password" onChange={e => setPassword2(e.target.value)} value={password2} />
                    <button className="btn btn-info btn-lg" onClick={registerTenant}>REGISTER</button>
                </div>
            </div>
        </>
    )
}

export default Register
