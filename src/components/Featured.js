import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";

const Featured = () => {
    const location = useLocation();
    const getUrl = '/api/properties';
    const [homes, setHomes] = useState([]);
    useEffect(() => {
        axios.get(getUrl)
            .then(res => {
                let val = res.data.reduce(function (result, value, index, array) {
                    if (index % 3 === 0)
                        result.push(array.slice(index, index + 3));
                    return result;
                }, []);
                setHomes(val);
            })
            .catch(err => console.log(err))
    }, []);

    const dayDiff = useCallback((timestamp) => {
        const oneDay = 24 * 60 * 60 * 1000;
        let firstDate = new Date(timestamp);
        let secondDate = new Date();
        return Math.round(Math.abs((firstDate - secondDate) / oneDay));
    }, [])

    return (
        <div class="container my-4">

            <div id="multi-item-example" class="carousel slide carousel-multi-item" data-ride="carousel">

                {/* <div class="controls-top text-center">
                    <a class="btn-floating" href="#multi-item-example" data-slide="prev"><i class="fa fa-chevron-left"></i></a>
                    &emsp;
                    <a class="btn-floating" href="#multi-item-example" data-slide="next"><i class="fa fa-chevron-right"></i></a>
                </div> */}
                <ol class="carousel-indicators">
                    {
                        homes.map((home, i) => (
                            i === 0
                                ?
                                <li data-target="#multi-item-example" data-slide-to={String(i)} className="active"></li>
                                :
                                <li data-target="#multi-item-example" data-slide-to={String(i)}></li>
                        ))
                    }
                </ol>
                <div class="carousel-inner mt-2" role="listbox">
                    {
                        homes.map((home, i) => (
                            i === 0
                                ?
                                <div class="carousel-item active">
                                    <div class="row">
                                        {
                                            home.map((subhome, j) => (
                                                j === 0
                                                    ?
                                                    <div class="col-md-4">
                                                        <div class="card mb-2">
                                                            <img height="150px" class="card-img-top" src={subhome.property_details.homeImage} alt="Card image cap" />
                                                            <div class="card-body">
                                                                <p class="card-text">
                                                                    <span class="badge badge-warning">
                                                                        {subhome.isFeatured ? <>FEATURED</> : ""}
                                                                    </span>
                                                                    <br />
                                                                    {subhome.property_details.bhk + "BHK Home in " + subhome.location.country + ", " + subhome.location.state + ", " + subhome.location.city}</p>
                                                                <Link to={
                                                                    {
                                                                        pathname: "/property-details",
                                                                        state: subhome
                                                                    }
                                                                }>
                                                                    <button className="btn btn-outline-success">Get Details</button>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div class="col-md-4 clearfix d-none d-md-block">
                                                        <div class="card mb-2">
                                                            <img height="150px" class="card-img-top" src={subhome.property_details.homeImage} alt="Card image cap" />
                                                            <div class="card-body">
                                                                <p class="card-text">
                                                                    <span class="badge badge-warning">
                                                                        {subhome.isFeatured ? <>FEATURED</> : ""}
                                                                    </span>
                                                                    <br />
                                                                    {subhome.property_details.bhk + "BHK Home in " + subhome.location.country + ", " + subhome.location.state + ", " + subhome.location.city}</p>
                                                                <Link to={
                                                                    {
                                                                        pathname: "/property-details",
                                                                        state: subhome
                                                                    }
                                                                }>
                                                                    <button className="btn btn-outline-success">Get Details</button>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                :
                                <div class="carousel-item">
                                    <div class="row">{
                                        home.map((subhome, j) => (
                                            j === 0
                                                ?
                                                <div class="col-md-4">
                                                    <div class="card mb-2">
                                                        <img height="150px" class="card-img-top" src={subhome.property_details.homeImage} alt="Card image cap" />
                                                        <div class="card-body">
                                                            <p class="card-text">
                                                                <span class="badge badge-warning">
                                                                    {subhome.isFeatured ? <>FEATURED</> : ""}
                                                                </span>
                                                                <br />
                                                                {subhome.property_details.bhk + "BHK Home in " + subhome.location.country + ", " + subhome.location.state + ", " + subhome.location.city}</p>
                                                            <Link to={
                                                                {
                                                                    pathname: "/property-details",
                                                                    state: subhome
                                                                }
                                                            }>
                                                                <button className="btn btn-outline-success">Get Details</button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                <div class="col-md-4 clearfix d-none d-md-block">
                                                    <div class="card mb-2">
                                                        <img height="150px" class="card-img-top" src={subhome.property_details.homeImage} alt="Card image cap" />
                                                        <div class="card-body">
                                                            <p class="card-text">
                                                                <span class="badge badge-warning">
                                                                    {subhome.isFeatured ? <>FEATURED</> : ""}
                                                                </span>
                                                                <br />
                                                                {subhome.property_details.bhk + "BHK Home in " + subhome.location.country + ", " + subhome.location.state + ", " + subhome.location.city}</p>
                                                            <Link to={
                                                                {
                                                                    pathname: "/property-details",
                                                                    state: subhome
                                                                }
                                                            }>
                                                                <button className="btn btn-outline-success">Get Details</button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                        ))
                                    }
                                    </div>

                                </div>
                        ))
                    }
                </div>
            </div>
        </div>

    )
}

export default Featured;
