import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import SidebarNavigation from '../../navbars/sidebar'

const DashBoard = ({ children }) => {

    const navigate = useNavigate();

    useEffect(() => {

        document.title = 'Quiz App | Authentication';

        // const checkAuth = () => {
        //     try {
        //         const loggedIn = localStorage.getItem('loggedIn');
        //         if (loggedIn === 'true') {
        //             navigate('/dashboard');
        //         }
        //         if (loggedIn === 'false') {
        //             navigate('/teacher-login')
        //         }
        //     } catch (error) {
        //         console.error("Error while checking auth: ", error);
        //     }
        // };

        // checkAuth()
    }, [navigate])


    return (
        <SidebarNavigation children={children} />
    )
}

export default DashBoard
