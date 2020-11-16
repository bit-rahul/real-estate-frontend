import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";

const HomeList = (props) => {
    const location = useLocation();
    const getUrl = '/api/properties';
    const [homes, setHomes] = useState([]);
    useEffect(() => {
        let payload = {};
        if (location.state) {
            if (location.state.city !== '')
                payload.city = location.state.city;
            if (location.state.state !== '')
                payload.state = location.state.state;
            if (location.state.country !== '')
                payload.country = location.state.country;
            if (location.state.bhk !== '')
                payload.bhk = location.state.bhk;
            if (location.state.rentMin !== '')
                payload.rentMin = location.state.rentMin;
            if (location.state.rentMax !== '')
                payload.rentMax = location.state.rentMax;
            if (payload.rentMax === payload.rentMin && payload.rentMin === 0) {
                delete payload.rentMax;
                delete payload.rentMin;
            }
        }
        axios.get(getUrl, { params: payload })
            .then(res => setHomes(res.data))
            .catch(err => console.log(err))
    }, [location.state]);

    // dayDiff = (timestamp) => {
    //     console.log("timee", timestamp)

    // }

    const dayDiff = useCallback((timestamp) => {
        const oneDay = 24 * 60 * 60 * 1000;
        let firstDate = new Date(timestamp);
        let secondDate = new Date();
        return Math.round(Math.abs((firstDate - secondDate) / oneDay));
    }, [])

    return (
        <div className="prop-container mt-5 pt-5">
            <h4 className="pt-4 pl-4">Search Results ({homes.length} found)</h4>
            <div className="homelist-container">
                {
                    homes
                        ?
                        homes.map((home) => {
                            return (
                                <div className="card">
                                    <div className="card-body">
                                        <img className="mt-2 mb-2 home-img" width="280px" height="170px" src={home.property_details.homeImage} alt="Property Image" />
                                        <h5 className="card-title">₹ {home.property_details.rent}
                                        &nbsp;
                                        &nbsp;
                                            <span class="badge badge-warning">{home.isFeatured ? <>FEATURED</> : ""}</span>
                                        </h5>
                                        <h6 className="card-subtitle text-muted">{home.property_details.bhk + "BHK Home in " + home.location.country + ", " + home.location.state + ", " + home.location.city}</h6>
                                        <Link to={
                                            {
                                                pathname: "/property-details",
                                                state: home
                                            }
                                        }>
                                            <button className="btn btn-outline-success mt-3">Get Details</button>
                                        </Link>
                                    </div>
                                    <div className="card-footer text-muted">
                                        {"Posted: " + dayDiff(home.createdAt) + " day(s) ago"}
                                    </div>
                                </div>
                            )
                        })
                        :
                        ""
                }
            </div>
        </div>
    )
}

export default HomeList
