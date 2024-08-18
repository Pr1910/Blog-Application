import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { MdModeEdit, MdDelete } from "react-icons/md";
import Comment from '../components/Comment';

const PostDetails = () => {
    return (
        <div>
            <Navbar />
            <div className='px-8 md:px-[200px] mt-8'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-2xl font-bold text-black md:text-3xl'>Lucid Motors sets new record for EV deliveries as it seeks ‘escape velocity’</h1>

                    <div className='flex items-center justify-center space-x-2'>
                        <p><MdModeEdit /></p>
                        <p><MdDelete /></p>
                    </div>
                </div>
                <div>
                    <div className='flex items-center justify-between mt-2 md:mt-4'>
                        <p>@Author</p>
                        <div className='flex space-x-2 text-sm'>
                            <p>18-08-24</p>
                            <p>11:00</p>
                        </div>
                    </div>
                </div>
                <img src="https://images.pexels.com/photos/13861/IMG_3496bfree.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" className='w-full mx-auto mt-8' />
                <p className='mx-auto mt-8'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum odio voluptatum quidem corporis, esse quibusdam officiis accusamus vitae perspiciatis aliquid iusto soluta ab dolorum officia quam inventore temporibus magnam. Nemo.</p>

                <div className='flex items-center mt-8 space-x-4 font-semibold'>
                    <p>Categories:</p>
                    <div className='flex justify-center items-center space-x-2'>
                        <div className='bg-gray-300 rounded-lg px-3 py-1'>Cars</div>
                        <div className='bg-gray-300 rounded-lg px-3 py-1'>EV</div>
                    </div>
                </div>

                <div className='flex flex-col mt-4'>
                    <h3 className='mt-6 mb-4 font-semibold'>Comments:</h3>
                    <Comment/>
                    <Comment/>

                </div>

                {/* adding a comment */}
                <div className='w-full flex flex-col mt-4 md:flex-row'>
                    <input type='text' placeholder='Add a comment' className='md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0'/>
                    <button className='bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0'>Add comment</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PostDetails