import React, { useState, useContext, useEffect } from 'react';
import TenantContext from '../context/TenantContext';
import { Link, useLocation } from "react-router-dom";
import Axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const PropertyDetails = () => {
    const { tenantData, setTenantData } = useContext(TenantContext);
    const location = useLocation();
    const home = location.state;
    const [name, setName] = useState(tenantData.tenant ? tenantData.tenant.name : '');
    const [email, setEmail] = useState(tenantData.tenant ? tenantData.tenant.email : '');
    const [contact, setContact] = useState(tenantData.tenant ? tenantData.tenant.contact : '');
    const [message, setMessage] = useState('');
    const [open, setOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState('warning');
    const [snackbarMsg, setSnackbarMsg] = React.useState('');
    const [lockText, setLockText] = React.useState('');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const isApplied = () => {
        if (home && tenantData.tenant)
            Axios.get(`https://whispering-escarpment-26214.herokuapp.com/api/properties/isApplied`, {
                params: {
                    id: home._id,
                    tenantID: tenantData.tenant.id
                }
            })
                .then(resp => {
                    console.log("here",resp.data.status)
                    if (resp.data.status === "pending") {
                        setLockText('Your last application for this property is still pending! Please wait for approval.')
                    }

                    else if (resp.data.status === "accepted")
                        setLockText('Your application for this property is already accepted!')
                })
                .catch(err => {
                    console.log(err)
                    // setOpen(true);
                    // setSeverity('error');
                    // setSnackbarMsg(err.response.data.message);
                });
    }

    const submitForm = (e) => {
        e.preventDefault();
        const postData = new FormData();
        postData.append('name', name);
        postData.append('email', email);
        postData.append('contact', contact);
        postData.append('message', message);
        postData.append('tenantID', tenantData.tenant.id);

        Axios.post(`https://whispering-escarpment-26214.herokuapp.com/api/home-apply/${location.state._id}`, postData)
            .then(resp => {
                setOpen(true);
                setSeverity('success');
                setSnackbarMsg(resp.data.message);
                setName('');
                setEmail('');
                setContact('');
                setMessage('');
                isApplied();
            })
            .catch(err => {
                setOpen(true);
                setSeverity('error');
                setSnackbarMsg(err.response.data.message);
            });
    }

    useEffect(() => {
        isApplied();
    }, [])

    console.log("lock", lockText)

    return (
        <div className="details-box">
            {/* <input type="text" disabled /> */}
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert position="center" onClose={handleClose} severity={severity}>
                    {snackbarMsg}
                </Alert>
            </Snackbar>
            <div className="property">
                <img width="90%" className="mb-4" src={home.property_details.homeImage} alt="Property Image" />
                <div className="info">
                    <h4 className="price">₹{" " + home.property_details.rent}</h4>
                    <h4 className="bhk">{home.property_details.bhk + "BHK Home in " + home.location.country + ", " + home.location.state + ", " + home.location.city}</h4>
                </div>
                <div className="address">
                    <h4>
                        Address:
                            {
                            home.location.address
                                ?
                                " "
                                +
                                home.location.address
                                :
                                <>
                                    &nbsp;Not Available
                                </>
                        }
                    </h4>
                </div>
            </div>
            {
                tenantData.tenant === undefined
                    ?
                    <form className="ml-5 contact-form text-center overlay" onSubmit={e => submitForm(e)}>
                        <span className="locked" style={{ color: "#222222", fontWeight: "600", fontSize: "24px" }}>
                            <i className="fas fa-lock fa-3x text-center mb-3" />
                            <br />
                            <Link to={{ pathname: '/tenant/login', state: { from: location.pathname, prevState: location.state } }}>
                                <button type="button" className="btn btn-primary btn-lg">
                                    LOGIN TO APPLY
                        </button>
                            </Link>
                        </span>
                        <h3> APPLY NOW</h3>
                        <label>Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            required
                            className="form-control dis"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            required
                            className="form-control dis"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <label>Contact</label>
                        <input
                            type="tel"
                            maxLength="10"
                            placeholder="Enter your mobile"
                            required
                            className="form-control"
                            pattern="^[0-9]{10}$"
                            onChange={(e) => setContact(e.target.value)}
                            value={contact}
                        />
                        <label>Message (Optional)</label>
                        <textarea
                            cols="30"
                            rows="5"
                            className="form-control"
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                        ></textarea>
                        <br />
                        <button className="btn btn-info btn-lg" type="submit">APPLY NOW</button>
                    </form>
                    :
                    lockText !== ''
                        ?
                        <form className="ml-5 contact-form text-center overlay" onSubmit={e => submitForm(e)}>
                            <span className="locked2" style={{ color: "#222222", fontWeight: "600", fontSize: "24px" }}>
                                <i className="fas fa-lock fa-3x text-center mb-3" />
                                <br />
                                {lockText}
                            </span>
                            <h3> APPLY NOW</h3>
                            <label>Name</label>
                            <input
                                disabled
                                type="text"
                                placeholder="Enter your name"
                                required
                                className="form-control"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                            <label>Email</label>
                            <input
                                disabled
                                type="email"
                                placeholder="Enter your email address"
                                required
                                className="form-control"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                            <label>Contact</label>
                            <input
                                type="tel"
                                maxLength="10"
                                placeholder="Enter your mobile"
                                required
                                className="form-control"
                                pattern="^[0-9]{10}$"
                                onChange={(e) => setContact(e.target.value)}
                                value={contact}
                            />
                            <label>Message (Optional)</label>
                            <textarea
                                cols="30"
                                rows="5"
                                className="form-control"
                                onChange={(e) => setMessage(e.target.value)}
                                value={message}
                            ></textarea>
                            <br />
                            <button className="btn btn-info btn-lg" type="submit">APPLY NOW</button>
                        </form>
                        :
                        <form className="ml-5 contact-form text-center" onSubmit={e => submitForm(e)}>
                            <span className="locked" style={{ color: "#222222", fontWeight: "600", fontSize: "24px" }}>
                                <i className="fas fa-lock fa-3x text-center mb-3" />
                                <br />
                                <button type="button" className="btn btn-primary btn-lg">
                                    LOGIN TO APPLY
                            </button>
                            </span>
                            <h3> APPLY NOW</h3>
                            <label>Name</label>
                            <input
                                disabled
                                type="text"
                                placeholder="Enter your name"
                                required
                                className="form-control"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                            <label>Email</label>
                            <input
                                disabled
                                type="email"
                                placeholder="Enter your email address"
                                required
                                className="form-control"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                            <label>Contact</label>
                            <input
                                type="tel"
                                maxLength="10"
                                placeholder="Enter your mobile"
                                required
                                className="form-control"
                                pattern="^[0-9]{10}$"
                                onChange={(e) => setContact(e.target.value)}
                                value={contact}
                            />
                            <label>Message (Optional)</label>
                            <textarea
                                cols="30"
                                rows="5"
                                className="form-control"
                                onChange={(e) => setMessage(e.target.value)}
                                value={message}
                            ></textarea>
                            <br />
                            <button className="btn btn-info btn-lg" type="submit">APPLY NOW</button>
                        </form>
            }
        </div>
    )
}

export default PropertyDetails
