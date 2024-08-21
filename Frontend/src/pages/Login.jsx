import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import axios from 'axios'
import { URL } from '../url'
import { UserContext } from '../context/UserContext'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false);
    const [errStatus, setErrStatus] = useState(0);
    const {setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const getErrorMessage = (status) => {
        const errorMessages = {
            404: 'User does not exist, please register!',
            401: 'Invalid Credentials!',
        };
        return errorMessages[status] || 'An unexpected error occurred';

    };

    const handleLogin = async () => {
        try {
            const res = await axios.post(URL + "/api/auth/login", { email, password }, { withCredentials: true });
            setUser(res.data);
            setError(false);
            navigate("/");
            
        } catch (error) {
            // const temp = error.request.status;
            // console.log(typeof temp);
            setErrStatus(error.request.status);
            setError(true);
        }
    }

    return (
        <>
            <div className='flex items-center justify-between px-6 md:px-[200px] py-4'>
                <h1 className='text-lg md:text-xl font-extrabold'><Link to="/">Blog App</Link></h1>
                <h3 className='font-bold'><Link to="/register">Register</Link></h3>
            </div>
            <div className='w-full flex justify-center items-center h-[80vh]'>
                <div className='flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]'>
                    <h1 className="text-xl font-bold text-left">Log In to your account</h1>
                    <input onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="email" placeholder="Enter your email" />

                    <input onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="password" placeholder="Enter your password" />

                    <button onClick={handleLogin} className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg border border-transparent hover:bg-white hover:border-2 hover:border-black hover:text-black ">Login</button>

                    {error && <h3 className='text-red-600 text-sm'>{getErrorMessage(errStatus)}</h3>}

                    <div className='flex justify-center items-center space-x-3'>
                        <p className='text-gray-500 font-bold hover:text-black'><Link to="/register">Sign Up</Link></p>
                    </div>
                </div>
            </div>

            <Footer />
        </>

    )
}

export default Login