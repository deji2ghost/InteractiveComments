import React, { useState } from 'react'

export const Comments = ({ userComment, userObj, handleDelete, handleEdit, handleComment, replyText, setReplyText }) => {
    const [ counter, setCounter ] = useState(0)
    const [ replyModal, setReplyModal] = useState(false)
    const [ currentComment, setCurrentComment ] = useState({})

    const plusClicked = () => {
        const newPlusNum = counter + 1
        setCounter(newPlusNum)
    }
    const minusClicked = () => {
        const newMinusNum = counter - 1
        setCounter(newMinusNum)
    }

    const handleReply = (comment) => {
        setReplyModal(!replyModal)
        console.log('clicked', comment)
        setCurrentComment(comment)
        // handleComment(comment)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleComment(replyText, currentComment)
        console.log('clicked', replyText, currentComment)
        // const newCurrent = userComment.find(comm => {
        //     if(comm.id === currentComment.id){
        //         return(comm)
        //     }
        // })

        // if(newCurrent){
        //     const newReply = userComment.map(user => {
        //         if(user.id === newCurrent.id){
        //             return(
        //                 {...user, replies: [...user.replies, { id: Math.trunc(Math.random() * 10000), content: 'ball', createdAt: '1 week ago', replyingTo: currentComment.id} ] }
        //             )
        //         }
        //     })
        //     // console.log(Math.random() * 100)
        //     console.log(newReply)
        // }
        setReplyText('')
        console.log(new Date)
        console.log([...currentComment.replies, ...userComment])
        // fetch(`http://localhost:8000/comments/${currentComment.id}`, {
        //     method: 'POST',
        //     headers: { 'content-Type': 'application/json'},
        //     body: ({
        //         ...currentComment,
        //         replies: [...currentComment.replies, { content: replyText, createdAt: '1 week ago', id: 3, replyingTo: '@mark', score: replies.length + 1, user: userObj}]
        //     })
        // })
    } 
  return (
    <div className='flex flex-col gap-4'>
        {
            userComment.map(comment=> {
                return(
                    <div key={comment.id} className='flex flex-col gap-3'>
                        <div className='flex flex-col gap-1'>
                            <div className='bg-White p-2 flex rounded-md md:p-5 md:gap-5'>
                                <div className='hidden md:block items-center bg-lightGray rounded-md h-[50%] w-[3%] text-center m-auto'>
                                    <button onClick={plusClicked}><img className='p-2' src='/images/icon-plus.svg'/> </button>
                                    <h1 className='p-2 text-moderateBlue font-medium'>{counter}</h1>
                                    <button disabled={counter === 0} onClick={minusClicked}><img className='p-2' src='/images/icon-minus.svg'/></button>
                                </div>
                                <div className=''>
                                    <div className='md:flex md:justify-between'>
                                        <div className='flex items-center gap-4'>
                                            <img src={comment.user.image.png} className='w-[10%]'/>
                                            <p className='font-medium'>{comment.user.username}</p>
                                            <p>{comment.createdAt}</p>
                                        </div>
                                        <button onClick={()=>handleReply(comment)} className='hidden text-moderateBlue md:flex items-center gap-2'><img src='images/icon-reply.svg' />Reply</button>
                                    </div>
                                    <p>{comment.content}</p>
                                    <div className='flex justify-between md:hidden'>
                                        <div className='flex items-center bg-lightGray rounded-md'>
                                            <button onClick={plusClicked}><img className='p-2' src='/images/icon-plus.svg'/></button>
                                            <h1 className='p-2 text-moderateBlue font-medium'>{counter}</h1>
                                            <button disabled={counter === 0} onClick={minusClicked}><img className='p-2' src='/images/icon-minus.svg'/></button>
                                        </div>
                                        <button onClick={()=>handleReply(comment)} className='text-moderateBlue flex items-center gap-2'><img src='images/icon-reply' />Reply</button>
                                    </div>
                                </div>
                            </div>
                            { replyModal ?
                            <form onSubmit={handleSubmit} className='w-full bg-White p-4 rounded md:flex md:justify-between md:items-start md:gap-5'>
                                <img src={userObj?.image?.png} className='hidden md:block w-[3%] object-contain'/>
                                <textarea typeof='text' placeholder='Add a comment...' value={replyText} onChange={(e) => setReplyText(e.target.value)} className='w-full px-3 pt-2 pb-10 md: border rounded-md mb-1 border-lightGrayishBlue md:w-[90%] outline-none' />
                                <button className='hidden md:block bg-moderateBlue text-White py-2 px-5 rounded'>SEND</button>

                                <div className='flex justify-between md:hidden'>
                                    <img src={userObj?.image?.png} className='w-[10%] object-contain'/>
                                    <button onClick={() => setReplyModal(!replyModal)} className='bg-moderateBlue text-White py-2 px-5 rounded'>SEND</button>
                                </div>
                            </form> : null}
                        </div>
                        {
                            comment.replies.length <= 0 ? null
                            :
                            <div className='flex gap-4 md:gap-0 md:justify-end'>
                                <div className='w-[10px] md:w-[3px] bg-lightGray md:flex md:mx-auto'>
                                    
                                </div>
                                <div className='flex flex-col gap-4 md:w-[90%]'>
                                    {
                                        comment.replies.map(reply=> {
                                            return(
                                                <div key={reply.id} className='flex p-2 rounded-md bg-White md:p-4 md:gap-2'>
                                                    <div className='hidden md:block items-center bg-lightGray rounded-md  w-[3%] text-center m-auto'>
                                                        <button onClick={plusClicked}><img className='p-2' src='/images/icon-plus.svg'/> </button>
                                                        <h1 className='p-2 text-moderateBlue font-medium'>{counter}</h1>
                                                        <button disabled={counter === 0} onClick={minusClicked}><img className='p-2' src='/images/icon-minus.svg'/></button>
                                                    </div>
                                                    <div className=''>
                                                        <div className='flex items-center gap-4 justify-between'>
                                                            <div className='flex items-center gap-4'>
                                                                <img src={reply.user.image.png} className='w-[10%]'/>
                                                                <p className='font-medium'>{reply.user.username} {reply.user.username === userObj.username ? <span className='bg-moderateBlue text-White rounded px-1'>You</span> : null }</p>
                                                                <p>{reply.createdAt}</p>
                                                            </div>
                                                            {
                                                                reply.user.username === userObj.username ?
                                                                <div className='hidden md:flex justify-between gap-4'>
                                                                    <button onClick={() => handleDelete()} className='flex items-center gap-1'><img src='images/icon-delete.svg'/>Delete</button>
                                                                    <button onClick={() => handleEdit} className='flex items-center gap-1'><img src='images/icon-edit.svg'/>Edit</button>
                                                                </div> 
                                                                    :
                                                                <button className='text-moderateBlue hidden md:flex items-center  gap-2'><img src='images/icon-reply.svg'/>Reply</button>
                                                            }
                                                        </div>  
                                                        <p><span className='text-moderateBlue font-medium'>@{reply.replyingTo}</span> {reply.content}</p>
                                                        <div className='flex justify-between md:hidden'>
                                                            <div className='flex items-center bg-lightGray'>
                                                                <button onClick={plusClicked}><img className='p-2' src='/images/icon-plus.svg'/></button>
                                                                <h1 className='p-2 text-moderateBlue font-medium'>{counter}</h1>
                                                                <button disabled={counter === 0} onClick={minusClicked}><img className='p-2' src='/images/icon-minus.svg'/></button>
                                                            </div>
                                                            {
                                                                reply.user.username === userObj.username ?
                                                                <div className='flex justify-between gap-4'>
                                                                    <button onClick={()=>handleDelete()} className='flex items-center gap-1'><img src='images/icon-delete.svg'/>Delete</button>
                                                                    <button onClick={handleEdit} className='flex items-center gap-1'><img src='images/icon-edit.svg'/>Edit</button>
                                                                </div> 
                                                                    :
                                                                <button onClick={handleReply} className='text-moderateBlue flex items-center  gap-2'><img src='images/icon-reply.svg'/>Reply</button>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        }
                    </div>
                )
            })
        }
    </div>
  )
}
