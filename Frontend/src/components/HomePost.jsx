import React from 'react';
import { format } from 'date-fns';

const HomePost = () => {
  return (
    <div className='w-full flex mt-8 space-x-6'>

      <div className='w-[35%] h-[200px] flex justify-center items-center'>
        <img src="https://images.pexels.com/photos/13861/IMG_3496bfree.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" className='h-full w-full object-cover' />
      </div>

      <div className='flex flex-col w-[65%]'>
        <h1 className='text-xl font-bold md:mb-2 mb-1 md:text-2xl'>
          Lucid Motors sets new record for EV deliveries as it seeks ‘escape velocity’
        </h1>
        <div className='flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4'>
          <p>@Author</p>
          <div className='flex space-x-2 text-sm'>
            <p>18-08-24</p>
            <p>11:00</p>
          </div>
        </div>


        <p className='text-sm md:text-lg'>
          That number easily clears Lucid’s prior record, which it set in the first quarter of the year when it shipped 1,967 of its luxury sedans. The Saudi-backed, California-based company has been looking to expand the number of buyers for its Lucid Air sedan by slashing prices and offering more affordable trims.
        </p>
      </div>
    </div>
  )
}

export default HomePost