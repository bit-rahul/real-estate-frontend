import React, { useState, useEffect, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from "@material-ui/core/styles";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Range } from 'rc-slider';
import { Link, useLocation } from 'react-router-dom';
import 'rc-slider/assets/index.css';
import axios from 'axios';
require('dotenv').config();

const useStyles = makeStyles({
    root: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent"
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent"
        },
        "& .MuiOutlinedInput-input": {
            color: "white"
        },
        "&:hover .MuiOutlinedInput-input": {
            color: "white"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
            color: "white"
        },
        "& .MuiInputLabel-outlined": {
            color: "white"
        },
        "&:hover .MuiInputLabel-outlined": {
            color: "white"
        },
        "& .MuiInputLabel-outlined.Mui-focused": {
            color: "white"
        }
    }
});

const SearchBar = (props) => {
    const classes = useStyles();
    const location2 = useLocation();
    const [range, setRange] = useState(location2.state ? location2.state.range : [0, 0]);
    const [bhk, setBHK] = useState(location2.state ? location2.state.bhk : "");
    const [items, setItems] = useState([]);
    const onSliderChange = value => {
        setRange(value);
    };
    const [query, setQuery] = useState(location2.state ? location2.state.query : "");
    const [location, setLocation] = useState(location2.state ? location2.state.location : "");

    const fetchLocation = (value) => {
        setQuery(value);
        const getUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(value)}.json?access_token=pk.eyJ1IjoicmFodWxzdXBlciIsImEiOiJja2hiM2p1NXIxYWJuMnducTJxaXFnbzFvIn0.sGgCmDIeQYtZCWB5oogM6g&limit=10`;
        axios.get(getUrl)
            .then((res) => {
                let menu = [];
                res.data.features.map((loc) => {
                    menu.push({
                        title: loc.place_name
                    })
                })
                setItems(menu);
            })
            .catch(err => {
                console.log(err.response);
                setItems([]);
            })
    }

    // const searchHandle = () => {
    var locAdd = `/properties`;
    var locQuery = '';
    var loc = query;
    var city = '', state = '', country = '', bhk1 = '', rentMin = '', rentMax = '';

    if (query !== "" && bhk !== "") {
        loc = loc.replace(/ +/g, "");
        loc = loc.split(',');
        if (loc.length >= 3) {
            locQuery += `?city=${loc[0]}&state=${loc[1]}&country=${loc[2]}&bhk=${bhk}&rentMin=${range[0]}&rentMax=${range[1]}`
            city = loc[loc.length - 3];
            state = loc[loc.length - 2];
            country = loc[loc.length - 1];
        }
        else if (loc.length === 2) {
            locQuery += `?state=${loc[0]}&country=${loc[1]}&bhk=${bhk}&rentMin=${range[0]}&rentMax=${range[1]}`
            state = loc[0];
            country = loc[1];
        }
        else {
            locQuery += `?country=${loc[0]}&bhk=${bhk}&rentMin=${range[0]}&rentMax=${range[1]}`
            country = loc[0];
        }
        bhk1 = bhk;
        rentMax = range[1];
        rentMin = range[0];
    } else if (query !== "") {
        loc = loc.replace(/ +/g, "");
        loc = loc.split(',');
        if (loc.length >= 3) {
            locQuery += `?city=${loc[0]}&state=${loc[1]}&country=${loc[2]}&rentMin=${range[0]}&rentMax=${range[1]}`
            city = loc[loc.length - 3];
            state = loc[loc.length - 2];
            country = loc[loc.length - 1];
        }
        else if (loc.length === 2) {
            locQuery += `?state=${loc[0]}&country=${loc[1]}&rentMin=${range[0]}&rentMax=${range[1]}`
            state = loc[0];
            country = loc[1];
        }
        else {
            locQuery += `?country=${loc[0]}&rentMin=${range[0]}&rentMax=${range[1]}`
            country = loc[0];
        }
        rentMax = range[1];
        rentMin = range[0];
    } else if (bhk !== "") {
        locQuery += `?bhk=${bhk}rentMin=${range[0]}&rentMax=${range[1]}`
        bhk1 = bhk;
        rentMax = range[1];
        rentMin = range[0];
    } else if ((range[0] !== 0 || range[1] !== 0) && range[0] !== range[1]) {
        locQuery += `?rentMin=${range[0]}&rentMax=${range[1]}`
        rentMin = range[0];
        rentMax = range[1];
    }
    //     history.push({
    //         pathname: locAdd,
    //         search: locQuery,
    //         state: {
    //             city,
    //             state,
    //             country,
    //             bhk,
    //             rentMin,
    //             rentMax
    //         }
    //     })
    // }


    return (
        <>
            <LocationOnIcon />
            <Autocomplete
                value={location}
                onChange={(event, newValue) => {
                    setLocation(newValue);
                }}
                inputValue={query}
                onInputChange={(event, newInputValue) => {
                    fetchLocation(newInputValue);
                }}
                options={items}
                style={{ width: "30em" }}
                getOptionLabel={(option) => option.title}
                style={{ width: 300 }}
                renderInput={(params) => <TextField
                    className={`${classes.root} without-padding`}
                    {...params}
                    placeholder={props.searchBar ? "Search Location" : ""}
                    label={props.searchBar ? "" : "Search Location"}
                    variant="outlined"
                // onChange={(event) => fetchLocation(event.target.value)}
                />}
            />
            {/* <input
                        type="text"
                        size="30"
                        placeholder="Search Location"
                        ref={autoCompleteRef}
                        onChange={event => setQuery(event.target.value)}
                        value={query}
                    /> */}
            <select className="form-control ml-2 bhk-styles" value={bhk} onChange={e => setBHK(e.target.value)}>
                <option hidden>BHK</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>&gt;9</option>
            </select>
            <div className="dropdown range-container ml-2">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Rent per Month
                        </button>
                <div className="dropdown-menu pl-4 pr-4 text-muted" style={{ minWidth: "500px" }}>
                    <div className="p-1 ">
                        Selected Rent Range (/month):
                                <strong>
                            ₹ {range[0]} - ₹ {range[1]}
                        </strong>
                    </div>
                    <Range min={0} max={100000} step={1000} allowCross={false} onChange={onSliderChange} value={range} />
                    <div className="d-flex justify-content-between">
                        <div className="p-1">₹ 0</div>
                        <div className="p-1">₹ 1,00,000</div>
                    </div>
                </div>
            </div>
            <Link to={
                {
                    pathname: locAdd,
                    state: {
                        city,
                        state,
                        country,
                        bhk,
                        rentMin,
                        rentMax,
                        location,
                        query,
                        range
                    }
                }
            }>
                <button type="button" className="btn btn-primary ml-2">
                    <SearchIcon />
                </button>
            </Link>
        </>
    )
}

export default SearchBar;
