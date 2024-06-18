import { useState } from 'react'
import { EditForm } from './EditForm'
import { EditmainForm } from './EditmainForm'
import { ReplyForm } from './ReplyForm'
import { ReplySubForm } from './ReplySubForm'

export const Comments = ({ userComment, userObj, handleDelete, handleEdit, handleComment, handleSubComment, setUserComment, handleMainEdit, submitEdit, submitMainEdit, subDelete}: any) => {
    const [ replyModal, setReplyModal] = useState('')
    const [ currentComment, setCurrentComment ] = useState({})

    const plusClicked = (scores:any) => {
        const newScore = scores.score + 1
        const newPlusNum = userComment.map((comment: any) => {
            if(comment.id === scores.id){
                return(
                    {...comment, score: newScore}
                )
            }else{
                return comment
            }
        })
        setUserComment(newPlusNum)
        fetch(`http://localhost:8000/comments/${scores.id}`, {
            method: 'PUT',
            headers: { 'content-Type': 'application/json'},
            body: JSON.stringify({...scores, score: newScore})
        })
    }

    const minusClicked = (scores:any) => {
        const newScore = scores.score - 1
        const newPlusNum = userComment.map((comment: any) => {
            if(comment.id === scores.id){
                return(
                    {...comment, score: newScore}
                )
            }else{
                return comment
            }
        })
        setUserComment(newPlusNum)
        fetch(`http://localhost:8000/comments/${scores.id}`, {
            method: 'PUT',
            headers: { 'content-Type': 'application/json'},
            body: JSON.stringify({...scores, score: newScore})
        })
    }

    const subPlusClicked = (scores: any) => {
        const newScore = scores.score + 1
        console.log(newScore)
        const newPlusNum = userComment.map((comment: any) => {
            return({
                ...comment, replies: [...comment.replies.map((reply: any)=> {
                    if(reply.id === scores.id){
                        return({
                            ...reply, score: newScore
                        })
                    }else{
                        return reply
                    }
                })]
            })
        })
        setUserComment(newPlusNum)
        // setUserComment()
        const headObject = userComment.find((comment:any) => comment.id === scores.headId)
        fetch(`http://localhost:8000/comments/${headObject.id}`, {
        method: 'PUT',
        headers: { 'content-Type': 'application/json'},
        body: JSON.stringify({...headObject, replies: [...headObject.replies.map((rep:any)=> {
            if(rep.id === scores.id){
            return(
                {...rep, score: newScore}
            )
            }else{
            return rep
            }
        })]
        })
        })
    }

    const subMinusClicked = (scores: any) => {
        const newScore = scores.score - 1
        const newMinusNum = userComment.map((comment: any) => {
            return({
                ...comment, replies: [...comment.replies.map((reply: any)=> {
                    if(reply.id === scores.id){
                        return({
                            ...reply, score: newScore
                        })
                    }else{
                        return reply
                    }
                })]
            })
        })
        setUserComment(newMinusNum)

        const headObject = userComment.find((comment :any) => comment.id === scores.headId)
        fetch(`http://localhost:8000/comments/${headObject.id}`, {
        method: 'PUT',
        headers: { 'content-Type': 'application/json'},
        body: JSON.stringify({...headObject, replies: [...headObject.replies.map((rep: any)=> {
            if(rep.id === scores.id){
            return(
                {...rep, score: newScore}
            )
            }else{
            return rep
            }
        })]
        })
        })
    }

    const handleReply = (comment: any) => {
        setReplyModal(comment.user.username)
        setCurrentComment(comment)
    }

    const handleClickDelete = (comment: any) => {
        console.log('handleClicked')
        subDelete(comment)
    }
    const handleMainClickDelete = (comment: any) => {
        handleDelete(comment)
        console.log('mainhandleClicked')
    }
    
    const handleClickEdit = (comment: any) => {
        handleEdit(comment)
        handleMainEdit(comment)
    }
  return (
    <div className='flex flex-col gap-4'>
        {
            userComment.map((comment: any)=> {
                return(
                    <div key={comment.id} className='flex flex-col gap-3'>
                        <div className='flex flex-col gap-1'>
                            <div className='bg-White p-2 flex rounded-md md:p-2 md:gap-5'>
                                <div className='hidden md:block items-center bg-lightGray rounded-md h-[50%] min-w-[5%] max-w-[6%] text-center m-auto'>
                                    <button onClick={() => plusClicked(comment)}><img className='p-2' src='/images/icon-plus.svg'/> </button>
                                    <h1 className='p-2 text-moderateBlue font-medium'>{comment.score}</h1>
                                    <button disabled={comment.score === 0} onClick={() => minusClicked(comment)}><img className='p-2' src='/images/icon-minus.svg'/></button>
                                </div>
                                <div className='w-full'>
                                    <div className='md:flex md:justify-between'>
                                        <div className='flex items-center gap-4'>
                                            <img src={comment.user.image.png} className='w-[10%]'/>
                                            <p className='font-medium'>{comment.user.username}</p>
                                            <p>{comment.createdAt}</p>
                                        </div>
                                        {
                                            comment.user.username === userObj.username ?
                                            <div className='hidden md:flex justify-between gap-4'>
                                                <button onClick={()=>handleMainClickDelete(comment)} className='flex items-center gap-1 text-softRed'><img src='images/icon-delete.svg'/>Delete</button>
                                                <button onClick={()=>handleClickEdit(comment)} className='flex items-center gap-1 text-moderateBlue'><img src='images/icon-edit.svg'/>Edit</button>
                                            </div> 
                                                :
                                            <button onClick={()=> handleReply(comment)} className='text-moderateBlue hidden md:flex items-center gap-2'><img src='images/icon-reply.svg'/>Reply</button>
                                        }
                                    </div>
                                    { comment.isEditing ?
                                        <EditmainForm comment={comment} submitMainEdit={submitMainEdit} />
                                         :
                                        <p>{comment.content}</p>
                                    }
                                    <div className='flex justify-between md:hidden'>
                                        <div className='flex items-center bg-lightGray rounded-md'>
                                            <button onClick={()=>plusClicked(comment)}><img className='p-2' src='/images/icon-plus.svg'/></button>
                                            <h1 className='p-2 text-moderateBlue font-medium'>{comment.score}</h1>
                                            <button disabled={comment.score === 0} onClick={()=>minusClicked(comment)}><img className='p-2' src='/images/icon-minus.svg'/></button>
                                        </div>
                                        {
                                            comment.user.username === userObj.username ?
                                            <div className='flex justify-between gap-4'>
                                                <button onClick={()=>handleClickDelete(comment)} className='flex items-center gap-1 text-softRed'><img src='images/icon-delete.svg'/>Delete</button>
                                                <button onClick={()=>handleClickEdit(comment)} className='flex items-center gap-1 text-moderateBlue'><img src='images/icon-edit.svg'/>Edit</button>
                                            </div> 
                                                :
                                            <button onClick={()=>handleReply(comment)} className='text-moderateBlue flex items-center gap-2'><img src='images/icon-reply.svg'/>Reply</button>
                                        }
                                    </div>
                                </div>
                            </div>
                            { replyModal === comment.user.username ?
                            <ReplyForm replyModal={replyModal} setReplyModal={setReplyModal} comment={comment} handleComment={handleComment} userObj={userObj} /> : null}
                        </div>
                        {
                            comment?.replies?.length <= 0 ? null
                            :
                            <div className='flex gap-4 md:gap-0 md:justify-end'>
                                <div className='w-[5px] md:w-[3px] bg-lightGray md:flex md:mx-auto'>
                                    
                                </div>
                                <div className='w-full flex flex-col gap-4 md:w-[90%]'>
                                    {
                                        comment.replies.map((reply: any)=> {
                                            return(
                                                <div key={reply.id} className='w-full'>
                                                    <div className='flex p-2 rounded-md bg-White md:p-2 md:gap-2'>
                                                        <div className='hidden md:block items-center bg-lightGray rounded-md min-w-[5%] text-center m-auto'>
                                                            <button onClick={()=> subPlusClicked(reply)}><img className='p-2' src='/images/icon-plus.svg'/> </button>
                                                            <h1 className='p-2 text-moderateBlue font-medium'>{reply.score}</h1>
                                                            <button disabled={reply.score === 0} onClick={() => subMinusClicked(reply)}><img className='p-2' src='/images/icon-minus.svg'/></button>
                                                        </div>
                                                        <div className='w-full'>
                                                            <div className='flex items-center gap-4 justify-between'>
                                                                <div className='flex items-center gap-4'>
                                                                    <img src={reply.user.image.png} className='w-[10%]'/>
                                                                    <p className='font-medium'>{reply.user.username} {reply.user.username === userObj.username ? <span className='bg-moderateBlue text-White rounded px-1'>You</span> : null }</p>
                                                                    <p>{reply.createdAt}</p>
                                                                </div>
                                                                {
                                                                    reply.user.username === userObj.username ?
                                                                    <div className='hidden md:flex justify-between gap-4'>
                                                                        <button onClick={() => handleClickDelete(reply)} className='flex items-center gap-1 text-softRed'><img src='images/icon-delete.svg'/>Delete</button>
                                                                        <button onClick={() => handleEdit(reply)} className='flex items-center gap-1 text-moderateBlue'><img src='images/icon-edit.svg'/>Edit</button>
                                                                    </div> 
                                                                        :
                                                                    <button onClick={()=>handleReply(reply)} className='text-moderateBlue hidden md:flex items-center  gap-2'><img src='images/icon-reply.svg'/>Reply</button>
                                                                }
                                                            </div> 
                                                            { reply.isEditing ?
                                                            <EditForm reply={reply} submitEdit={submitEdit} />
                                                             :
                                                            <p><span className='text-moderateBlue font-medium'>@{reply.replyingTo}</span> {reply.content}</p>}
                                                            <div className='flex justify-between md:hidden'>
                                                                <div className='flex items-center bg-lightGray'>
                                                                    <button onClick={()=>subPlusClicked(reply)}><img className='p-2' src='/images/icon-plus.svg'/></button>
                                                                    <h1 className='p-2 text-moderateBlue font-medium'>{reply.score}</h1>
                                                                    <button disabled={reply.score === 0} onClick={()=>subMinusClicked(reply)}><img className='p-2' src='/images/icon-minus.svg'/></button>
                                                                </div>
                                                                {
                                                                    reply.user.username === userObj.username ?
                                                                    <div className='flex justify-between gap-4'>
                                                                        <button onClick={()=>handleClickDelete(reply)} className='flex items-center gap-1 text-softRed'><img src='images/icon-delete.svg'/>Delete</button>
                                                                        <button onClick={()=>handleEdit(reply)} className='flex items-center gap-1 text-moderateBlue'><img src='images/icon-edit.svg'/>Edit</button>
                                                                    </div> 
                                                                        :
                                                                    <button onClick={()=>handleReply(reply)} className='text-moderateBlue flex items-center  gap-2'><img src='images/icon-reply.svg'/>Reply</button>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    { replyModal === reply.user.username ?
                                                        <ReplySubForm replyModal={replyModal} setReplyModal={setReplyModal} userObj={userObj} reply={reply} handleSubComment={handleSubComment} /> : null}
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
