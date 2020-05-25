import React, {Fragment} from 'react';
import {Link, withRouter} from "react-router-dom";
import { isAuthenticated, signout} from "../auth/helper";

const currentTab = (history, path) => {
    if (history.location.pathname === path){
        return {color: "#ff3b3b"};
    } else {
        return {color: "#FFFFFF"};
    }
};


const Menu = ({history}) => (
        <div>
            <ul className = "nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link style = {currentTab(history, "/")}className="nav-link" to="/">
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style = {currentTab(history, "/cart")} className="nav-link" to="/cart">
                        Cart
                    </Link>
                </li>
                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className = "new-item">
                        <Link style={currentTab(history, "/user/dashboard")} className="nav-link" to="/user/dashboard">
                            User Bashboard
                        </Link>
                    </li>
                )}
                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className = "new-item">
                        <Link style={currentTab(history, "/admin/dashboard")} className="nav-link" to="/admin/dashboard">
                            Admin Bashboard
                        </Link>
                    </li>
                )}

                {!isAuthenticated() && (
                    <Fragment>
                        <li className="nav-item">
                            <Link style = {currentTab(history, "/signup")} className="nav-link" to="/signup">
                                SignUp
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link style = {currentTab(history, "/signin")} className="nav-link" to="/signin">
                                SignIn
                            </Link>
                        </li>
                    </Fragment>
                )}

                {isAuthenticated() && (
                    <li className="nav-item">
                        <span className = "nav-link text-warning"
                            onClick = {() => {
                                signout(() => {
                                    history.push("/")
                                })
                                }}>Signout
                        </span>
                    </li>
                )}
            </ul>
        </div>
);

export default withRouter(Menu);