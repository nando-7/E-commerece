import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";


const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#3d85d8" };
    } else {
        return { color: "black" };
    }
};

const Menu = ({ history }) => (
    
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand ef" to="/">E-commerce</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                style={isActive(history, "/")}
                                to="/"
                            >
                                Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                style={isActive(history, "/shop")}
                                to="/shop"
                            >
                                Shop
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                style={isActive(history, "/cart")}
                                to="/cart"
                            >
                                Cart
                                <sup>
                                    <small style={{color:"white"}} className="cart-badge">{itemTotal()}</small>
                                </sup>
                            </Link>
                        </li>

                        {isAuthenticated() && isAuthenticated().user.role === 0 && (
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    style={isActive(history, "/user/dashboard")}
                                    to="/user/dashboard"
                                >
                                    Dashboard
                                </Link>
                            </li>
                        )}

                        {isAuthenticated() && isAuthenticated().user.role === 1 && (
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    style={isActive(history, "/admin/dashboard")}
                                    to="/admin/dashboard"
                                >
                                    Dashboard
                                </Link>
                            </li>
                        )}
                        </ul>
                        <ul className="navbar-nav ml-auto">
                        {!isAuthenticated() && (
                            <Fragment>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        style={isActive(history, "/signin")}
                                        to="/signin"
                                    >
                                        Signin 
                                        <span> </span>
                                        <i className="fas fa-user"></i>
                                    </Link>
                                    
                                </li>

                                <li className="nav-item float-right">
                                    <Link
                                        className="nav-link"
                                        style={isActive(history, "/signup")}
                                        to="/signup"
                                    >
                                        Signup
                                        <span> </span>
                                        <i className="fas fa-user-plus"></i>
                                    </Link>
                                </li>
                            </Fragment>
                        )}

                        {isAuthenticated() && (
                            <li className="nav-item">
                                <span
                                    className="nav-link"
                                    style={{ cursor: "pointer", color: "black" }}
                                    onClick={() =>
                                        signout(() => {
                                            history.push("/");
                                        })
                                    }
                                >
                                    Signout
                                    <span> </span>
                                    <i className="fas fa-sign-out-alt"></i>
                                </span>
                            </li>
                        )}
                    </ul>
                   
            </div>        
        </nav>
    
);

export default withRouter(Menu);
