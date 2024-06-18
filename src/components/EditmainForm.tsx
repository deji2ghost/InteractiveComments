import React, { useState } from 'react'

export const EditmainForm = ({comment, submitMainEdit}) => {

    const [ mainText, setMainText ] = useState(comment.content)
    const handleSubmitEdit = (e) => {
        e.preventDefault()
        submitMainEdit(comment, mainText)
    }
  return (
    <form onSubmit={handleSubmitEdit} className='flex justify-between items-start'>
        <textarea value={mainText} placeholder='update comment' className=' outline-none w-full px-3 pt-2 pb-10 md: border rounded-md mb-1 border-lightGrayishBlue md:w-[90%]' onChange={(e)=> setMainText(e.target.value)}/>
        <button className='bg-moderateBlue text-White py-2 px-5 rounded'>Update</button>
    </form>
  )
}
