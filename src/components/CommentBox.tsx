import React from 'react'

export const CommentBox = ({userObj}) => {
  return (
    <form className='w-full bg-White p-4 rounded mt-[20px] md:flex md:justify-between md:items-start md:gap-5'>
        <img src={userObj?.image?.png} className='hidden md:block w-[3%] object-contain'/>
        <textarea typeof='text' placeholder='Add a comment...' className='w-full px-3 pt-2 pb-10 md: border rounded-md mb-1 border-lightGrayishBlue md:w-[90%] outline-none' />
        <button className='hidden md:block bg-moderateBlue text-White py-2 px-5 rounded'>SEND</button>

        <div className='flex justify-between md:hidden'>
            <img src={userObj?.image?.png} className='w-[10%] object-contain'/>
            <button className='bg-moderateBlue text-White py-2 px-5 rounded'>SEND</button>
        </div>
    </form>
  )
}
