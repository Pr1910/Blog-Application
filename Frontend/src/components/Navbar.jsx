import React from 'react'
import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Navbar = () => {
    const user = true;
  return (
    <div className='flex items-center justify-between px-6 md:px-[200px] py-4'>
        <h1 className='text-lg md:text-xl font-extrabold'><Link to="/">Blog App</Link></h1>
        <div className='flex justify-center items-center space-x-0'>
            <p><IoSearch/></p>
            <input className='outline-none px-3 py-1' placeholder='Search Posts' type='text'/>
        </div>

        <div className='flex items-center justify-center space-x-2 md:space-x-4'>
            {user ? <h3><Link to='/create'>Create Post</Link></h3>:
        
            <h3><Link to="/login">Login</Link></h3>}
            
            {user ? <h3><Link to='/profile'>Profile</Link></h3>: <h3><Link to="/register">Register</Link></h3>}
            
        </div>
    </div>
  )
}

export default Navbar