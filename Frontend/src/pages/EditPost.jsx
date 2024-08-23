import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { RxCross2 } from "react-icons/rx";
import { UserContext } from '../context/UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import { URL } from '../url';
import axios from 'axios';

const EditPost = () => {

    const postId = useParams().id
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [file, setFile] = useState(null)
    const [cat, setCat] = useState("");
    const [cats, setCats] = useState([]);

    const fetchPost=async()=>{
        try{
          const res=await axios.get(URL+"/api/posts/"+postId)
          setTitle(res.data.title)
          setDesc(res.data.desc)
          console.log(res.data.photo)
          setFile(res.data.photo)
          setCats(res.data.categories)
  
        }
        catch(err){
          console.log(err)
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        const post = {
            title,
            desc,
            username: user.username,
            userId: user._id,
            categories: cats
        }
        
        //image
        if (file) {
            const data = new FormData()
            const filename = Date.now() + file.name
            data.append("img", filename)
            data.append("file", file)
            
            
            //img upload
            try {
                const imgUpload = await axios.post(URL + "/api/upload", data)
                //console.log(imgUpload.data.result.url);
                post.photo = imgUpload.data.result.url;
            }
            catch (err) {
                console.log(err)
            }
        }


        try{
            
            const res=await axios.put(URL+"/api/posts/"+postId,post,{withCredentials:true})
            navigate("/posts/post/"+res.data._id)
          }
          catch(err){
            console.log(err)
          }
    }

    useEffect(() => {
      fetchPost();
    }, [postId])
    


    const deleteCategory = (i) => {
        let updatedCats = [...cats]
        updatedCats.splice(i)
        setCats(updatedCats)
    }

    const addCategory = () => {
        let updatedCats = [...cats]
        updatedCats.push(cat)
        setCat("")
        setCats(updatedCats)
    }
    return (
        <div>
            <Navbar />
            <div className='px-6 md:px-[200px] mt-8'>
                <h1 className='font-bold md:text-2xl text-xl'>
                    Update a post
                </h1>
                <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
                    <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder='Post title' className='px-4 py-2 outline' />
                    <input onChange={(e)=>setFile(e.target.files[0])} type="file" className='px-4' />
                    <div className='flex flex-col'>
                        <div className='flex items-center space-x-4 md:space-x-8'>
                            <input value={cat} onChange={(e) => setCat(e.target.value)} className='px-4 py-2 outline' placeholder='Post Category' type='text' />
                            <div onClick={addCategory} className='bg-black text-white px-4 py-2 font-semibold cursor-pointer'>Add</div>
                        </div>

                        <div className='flex px-4 mt-3'>
                            {cats?.map((c, i) => (
                                <div key={i} className='flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md'>
                                    <p>{c}</p>
                                    <p onClick={() => deleteCategory(i)} className='text-white bg-black rounded-full cursor-pointer p-1 text-sm'><RxCross2 /></p>
                                </div>
                            ))}
                        </div>

                    </div>
                    <textarea onChange={(e)=>setDesc(e.target.value)} value={desc} rows={15} cols={30} className='px-4 py-2 outline' placeholder='Enter post description' />
                    <button onClick={handleUpdate} className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'>Update</button>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default EditPost