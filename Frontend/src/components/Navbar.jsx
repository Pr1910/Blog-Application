import React, { useContext, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars } from "react-icons/fa6";
import Menu from './Menu';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
  const [prompt,setPrompt]=useState("")
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const showMenu = () => {
    setMenu(!menu);
  }

  const {user} = useContext(UserContext);
  return (
    <div className='flex items-center justify-between px-6 md:px-[200px] py-4'>
      <h1 className='text-lg md:text-xl font-extrabold'><Link to="/">Blog App</Link></h1>
      {path === '/' && <div className='flex justify-center items-center space-x-0'>
        
        <input onChange={(e)=>setPrompt(e.target.value)} className='outline-none px-3 py-1' placeholder='Search Posts' type='text' />
        <p onClick={()=>navigate(prompt?"?search="+prompt:navigate("/"))} className='cursor-pointer'><IoSearch /></p>
      </div>}

      <div className='hidden md:flex items-center justify-center space-x-2 md:space-x-4'>
        {user ? <h3 className='font-bold'><Link to='/write'>Create Post</Link></h3> :
          <h3 className='font-bold'><Link to="/login">Login</Link></h3>}

        {user ? 
        <div onClick={showMenu}> 
          <p className='cursor-pointer relative'><FaBars /></p>
          {menu && <Menu />}
        </div> : <h3 className='font-bold'><Link to="/register">Register</Link></h3>}

      </div>

      <div onClick={showMenu} className='md:hidden '>
        <p className='cursor-pointer relative'><FaBars /></p>
        {menu && <Menu />}
      </div>
    </div>
  )
}

export default Navbar