import React, { useState } from 'react'
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const HomeList = () => {

    const [rent, setRent] = useState(null);
    const [country, setCountry] = useState('');
    const [state, setStat] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [bhk, setBHK] = useState(1);
    const [homeImage, setHomeImage] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState('warning');
    const [snackbarMsg, setSnackbarMsg] = React.useState('');

    const listProperty = (e) => {
        e.preventDefault();
        const postURL = 'https://mighty-temple-22601.herokuapp.com/api/home-listing';
        const postData = new FormData();
        postData.append('rent', rent);
        postData.append('country', country);
        postData.append('state', state);
        postData.append('city', city);
        postData.append('address', address);
        postData.append('bhk', bhk);
        postData.append('homeImage', homeImage);

        axios.post(postURL, postData)
            .then(resp => {
                setOpen(true);
                setSeverity('success');
                setSnackbarMsg('Property Listed Successfully!')
            })
            .catch(err => console.log(err));
    }


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <>
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert position="center" onClose={handleClose} severity={severity}>
                    {snackbarMsg}
                </Alert>
            </Snackbar>
            <form className="home-container" onSubmit={e => listProperty(e)}>
                <div className="home-form">
                    <h3>List your Property</h3>
                    <label>Rent (Rs/month)</label>
                    <input min={0} className="form-control" type="number" placeholder="Rent (Rs/month)" onChange={e => setRent(e.target.value)} value={rent} />
                    <label>Location(Country)</label>
                    <input className="form-control" type="text" placeholder="Location(Country)" onChange={e => setCountry(e.target.value)} value={country} />
                    <label>Location(State/UT)</label>
                    <input className="form-control" type="text" placeholder="Location(State/UT)" onChange={e => setStat(e.target.value)} value={state} />
                    <label>Location(City)</label>
                    <input className="form-control" type="text" placeholder="Location(City)" onChange={e => setCity(e.target.value)} value={city} />
                    <label>Complete Address</label>
                    <textarea className="form-control" type="text" placeholder="Complete Address" onChange={e => setAddress(e.target.value)} value={address} />
                    <label>BHK</label>
                    <input className="form-control" type="number" placeholder="BHK" onChange={e => setBHK(e.target.value)} value={bhk} />
                    <label>Upload Image</label>
                    <input className="form-control" type="file" placeholder="Upload" onChange={e => setHomeImage(e.target.files[0])} />
                    <button className="btn btn-info btn-lg" type="submit">LIST YOUR PROPERTY</button>
                </div>
            </form>
        </>
    )
}

export default HomeList;
