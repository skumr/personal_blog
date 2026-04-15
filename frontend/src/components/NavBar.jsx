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
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                <h1 id='page-header'>{pages[location.pathname] || 'Page Not Found'}</h1>
                <nav>
                    <div className='dropdown'>
                        <button 
                            onClick={toggleDropdown} 
                            id="dropdown-btn"
                            type='button'
                        >
                            <IoMenuOutline size={25} style={{ }}/>
                        </button>
                        {isOpen && (
                            <ul id='nav-menu'>
                                <Link reloadDocument to="/" style={{ marginRight: '1rem' }}>
                                    Home
                                </Link>
                                <Link reloadDocument to="/posts" style={{ marginRight: '1rem' }}>
                                    Posts
                                </Link>
                                <Link reloadDocument to="/about">About</Link> 
                            </ul>
                        )}
                    </div>
                </nav>
            </div>
            
        </>
        
        
        
        
    );
}