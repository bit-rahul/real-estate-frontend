import React from 'react';
import Logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import SearchBar from "./SearchBar";
import AuthOptions from './Tenant/AuthOptions';

const Nav = (props) => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    var classes = []
    switch (props.active) {
        case 0:
            classes = ["", ""];
            break;
        case 1:
            classes = ["active", ""];
            break;
        case 2:
            classes = ["", "active"];
            break;
        default:
            classes = ["", ""];
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky">
            <Link to='/'>
                <img className="nav-logo" src={Logo} alt="logo" width="30em" />
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                    {/* <li className="nav-item active">
                        <h6 className="nav-link">Home</h6>
                    </li> */}
                    <li className="nav-item">
                        <Link to='/properties'>
                            <h6 className={"nav-link " + classes[0]}>Properties</h6>
                        </Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link to='/list-property'>
                            <h6 className={"nav-link " + classes[1]}>List your Property</h6>
                        </Link>
                    </li> */}
                </ul>
                <div className="form-inline my-2 my-lg-0">
                    {
                        props.searchBar
                            ?
                            <div className="search-container2 ">
                                <div className="seach-box">
                                    <div className="search-input2 mr-5">
                                        <SearchBar searchBar={props.searchBar} />
                                    </div>
                                </div>
                            </div>
                            :
                            ""
                    }
                    <AuthOptions />
                    {/* <input className="form-control mr-sm-2" type="text" placeholder="Search"> */}
                    {/* <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        Open Menu
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu> */}
                    {/* <button className="btn btn-secondary my-2 my-sm-0" type="submit">Contact Us</button> */}

                </div>
            </div>
        </nav>
    )
}

export default Nav;
