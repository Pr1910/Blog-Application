import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios';
import { URL } from "../url"
import { Link, useNavigate } from 'react-router-dom';

const Menu = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const id = user._id;
    const handleLogout = async () => {
        try {
            const res = axios.get(URL + "/api/auth/logout", { withCredentials: true });
            setUser(null);
            navigate('/login')

        } catch (error) {
            console.log(error);
        }
    }

    // function parseJwt (token) {
    //     var base64Url = token.split('.')[1];
    //     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    //     var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
    //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    //     }).join(''));
    
    //     return JSON.parse(jsonPayload);
    // }

    // const fetchUserID = async() =>{
    //     try {
    //         const res = await axios.get(URL + "/api/auth/token");
    //         const payload = parseJwt(res);
    //         console.log(payload);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //   fetchUserID();
    // }, [])
    
    return (
        <div className='bg-black w-[200px] z-10 flex flex-col items-start absolute top-12 right-6 md:right-32 rounded-md p-4 space-y-4'>
            {!user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer'><Link to="/login">Login</Link></h3>}
            {!user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer'><Link to="/register">Register</Link></h3>}
            {user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to={"/profile/" + id}>Profile</Link></h3>}
            {/* {user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/write">Write</Link></h3>} */}
            {user && <h3 onClick={handleLogout} className="text-white text-sm hover:text-gray-500 cursor-pointer">Logout</h3>}
        </div>
    )
}

export default Menu