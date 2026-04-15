import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoMenuOutline } from "react-icons/io5";

export function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);
    const pages = {
             '/' : 'Home',
        '/posts' : 'All Blog Posts',
        '/about' : 'About Me' 
    }

    return (
        <div id="navbar">
            <h1 id="page-header">
            {pages[location.pathname] || 'Page Not Found'}
            </h1>

            <div id="header-nav">
            <div id="dropdown">
                <button onClick={toggleDropdown} type="button">
                <IoMenuOutline size={25} />
                </button>

                {isOpen && (
                <ul id="nav-menu">
                    <Link id="nav-link" reloadDocument to="/">Home</Link>
                    <Link id="nav-link" reloadDocument to="/posts">Posts</Link>
                    <Link id="nav-link" reloadDocument to="/about">About</Link>
                </ul>
                )}
            </div>
            </div>
        </div>
    );
}