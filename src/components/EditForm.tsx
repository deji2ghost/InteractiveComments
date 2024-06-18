
// type Prop={
//     submitEdit?: any,
//     reply?: {}, 
//     subText: string,
//     setSubText: any,
//     submitMainEdit?: any, 
//     comment?: {},
// }

import { useState } from "react"

export const EditForm = ({submitEdit, reply}) => {
    const [ subText, setSubText ] = useState(reply.content)
    const handleSubmitEdit = (e) => {
        e.preventDefault()
        submitEdit(reply, subText)
    }
  return (
    <form onSubmit={handleSubmitEdit} className='flex justify-between items-start'>
        <textarea value={subText} placeholder='update comment' className=' outline-none w-full px-3 pt-2 pb-10 md: border rounded-md mb-1 border-lightGrayishBlue md:w-[90%]' onChange={(e)=> setSubText(e.target.value)}/>
        <button className='bg-moderateBlue text-White py-2 px-5 rounded'>Update</button>
    </form>
  )
}
