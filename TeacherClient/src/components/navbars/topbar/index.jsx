import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { CiHome } from 'react-icons/ci';
import { TiThMenuOutline } from "react-icons/ti";
import { FaRegFileExcel } from "react-icons/fa";

// import LogoutModal from '../../modal/logout-modal'

const TopBar = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <header>
            <div className="navbar flex justify-between items-center bg-gray-800 text-white p-4">
                <div className="navbar-start">
                    <Link className="navbar-item">Ripple UI</Link>
                </div>
                <div className="navbar-end">
                    <div className="dropdown">
                        <button className="btn btn-outline-secondary" tabIndex="0" onClick={toggleSidebar}>
                            <TiThMenuOutline />
                        </button>
                        {/* <label className="btn btn-solid-primary my-2" tabIndex="0">Click</label> */}
                        <div className="dropdown-menu dropdown-menu-bottom-left">
                            <Link to='/dashboard' className="dropdown-item text-sm flex flex-row menu-items">
                                <CiHome className='my-auto mx-2' />
                                <span>Dashboard</span>
                            </Link>
                            <Link to='/dashboard' className="dropdown-item text-sm flex flex-row menu-items">
                                <FaRegFileExcel className='my-auto mx-2' />
                                <span>Add New Quiz</span>
                            </Link>
                            <Link to='/dashboard' className="dropdown-item text-sm flex flex-row menu-items">
                                <CiHome className='my-auto mx-2' />
                                <span>Dashboard</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {children}
            </div>
        </header>
    );
};

export default TopBar;
