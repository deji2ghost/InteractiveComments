import { useEffect, useState } from 'react'
import './App.css'
import { Comments } from './components/Comments'
import { CommentBox } from './components/CommentBox'
import { fetchComments } from './data/data'

function App() {

  const [ userObj, setUserObj ] = useState({}) 
  const [ userComment, setUserComment ] = useState<any>([]) 
  const [ showModal, setShowModal ] = useState(false)
  const [ replyText, setReplyText ] = useState('')
  const [ subText, setSubText ] = useState()
  const [ mainText, setMainText ] = useState()

  // type Comment={
  //   id: any,
  //   content: string,
  //   createdAt: string, 
  //   replies: any[], 
  //   user: any, 
  //   score: number, 
  //   isEditing: boolean,
  // }

  const handleFecth = async()=>{
    const data = await fetchComments()
    setUserComment(data)
  }
  useEffect(() => {
    handleFecth()
  }, [])

  useEffect(() => {
    fetch('http://localhost:8000/currentUser')
      .then(res=> res.json())
      .then(data=> {
        console.log(data)
        setUserObj(data)
        // setUserComment(data)
      })
  }, [])

  const handleComment = ({replyText, comment}:any) => {
    const newDay = getDate(new Date())
    const replyBox = userComment.map((userBox: any) => {
      if(userBox.id === comment.id){
        return(
          {...userBox, replies: [...userBox.replies, { id: Math.trunc(Math.random() * 10000), content: replyText, createdAt: newDay, replyingTo: comment.user.username, user: userObj, score: 0, isEditing: false}]}
        )
      }else{
        return( userBox )
      }
    })
    setUserComment(replyBox)
    fetch(`http://localhost:8000/comments/${comment?.id}`, {
      method: 'PUT',
      headers: { 'content-Type': 'application/json'},
      body: JSON.stringify({...comment, replies: [...comment?.replies, { id: Math.trunc(Math.random() * 10000), content: replyText, createdAt: newDay, replyingTo: comment?.user?.username, user: userObj, score: 0}]
      })
    })
  }

  const handleSubComment = ({replyText, reply}:any) => {
    const headObject = userComment.find((comment: any) => comment.id === reply.headId)
    const newDay = getDate(new Date())
    const subReplyBox = userComment.map((userBox: any)=> {
          if(userBox.headId === reply.headId){
            return(
              {...userBox, replies: [...userBox.replies, {id: Math.trunc(Math.random() * 100000), content: replyText, createdAt: newDay, replyingTo: reply.user.username, user: userObj, score: 10, isEditing: false}]}
            )
          }else{
            return userBox
          }
    })
    setUserComment(subReplyBox)

    fetch(`http://localhost:8000/comments/${headObject.id}`, {
      method: 'PUT',
      headers: { 'content-Type': 'application/json'},
      body: JSON.stringify({...headObject, replies: [...headObject.replies, { id: Math.trunc(Math.random() * 10000), content: replyText, createdAt: newDay, replyingTo: reply.user.username, user: userObj, score: 0}]
      })
    })

  }

  const addComment = (userWords: string) => {
    const newDay = new Date().toISOString()
    setUserComment([...userComment, {id: Math.trunc(Math.random() * 100000), content: userWords, createdAt: newDay, replies: [], user: userObj, score: 0, isEditing: false,}])
    fetch(`http://localhost:8000/comments`, {
      method: 'POST',
      headers: { 'content-Type': 'application/json'},
      body: JSON.stringify({id: Math.trunc(Math.random() * 100000), content: userWords, createdAt: newDay, replies: [], user: userObj, score: 0, isEditing: false})
    })
  }

  const handleEdit = (comment: any) => {
    console.log(comment)
    const editTab = userComment.map((user : any)=> {
      return({ ...user,
        replies: [...user.replies.map((reply: any)=> {
          if(reply.id === comment.id){
            return(
              {...reply, isEditing: !reply.isEditing}
            )
          }else{
            return reply
          }
        })]
    })
    })
    setUserComment(editTab)
  }

  const handleMainEdit = (comment :any) => {
    const editTab = userComment.map((user : any)=> {
      if (user.id === comment.id){
        return(
          {...user, isEditing: !userComment.isEditing }
        )
      }else{
        return user
      }
    })
    setUserComment(editTab)
  }

  const submitMainEdit = ({comment, mainText}: any) => {
    const newEdit = userComment.map((coment:any) => {
      if(coment.id === comment.id){
        return(
          {...coment, content: mainText, isEditing: !coment.isEditing}
        )
      }else{
        return coment
      }
    })
    setUserComment(newEdit)
    fetch(`http://localhost:8000/comments/${comment.id}`, {
      method: 'PUT',
      headers: { 'content-Type': 'application/json'},
      body: JSON.stringify({...comment, content: mainText})
    })
  }

  const submitEdit = ({reply, subText}: any) => {
    const newEdit = userComment.map((comment: any) => {
      return({
        ...comment, replies: [...comment.replies.map((rep: any) => {
          if(rep.id === reply.id){
            return({
              ...rep, content: subText, isEditing: !rep.isEditing
            })
          }else{
            return rep
          }
        })]
      })
    })
    setUserComment(newEdit)
    
    const headObject = userComment.find((comment:any) => comment.id === reply.headId)
    fetch(`http://localhost:8000/comments/${headObject.id}`, {
      method: 'PUT',
      headers: { 'content-Type': 'application/json'},
      body: JSON.stringify({...headObject, replies: [...headObject.replies.map((rep: any)=> {
        if(rep.id === reply.id){
          return(
            {...rep, content: subText, isEditing: !rep.isEditing}
          )
        }else{
          return rep
        }
      })]
      })
    })
  }

  const handleDelete = (comment: any) => {
    // setShowModal(!showModal)
    const newDelete = userComment.filter((coment: any) => coment.id !== comment.id)
    console.log(newDelete)
    setUserComment(newDelete)
    fetch(`http://localhost:8000/comments/${comment.id}`, {
      method: 'DELETE',
      headers: { 'content-Type': 'application/json'},
    })
  }

  const subDelete = (comment: any) => {
    const newEdit = userComment.map((coment: any) => {
      return({
        ...coment, replies: [...coment.replies.filter((rep: any)=> rep.id !== comment.id)]
      })
    })
    setUserComment(newEdit)
    const headObject: any = userComment.find((coment: any) => coment.id === comment.headId)
    fetch(`http://localhost:8000/comments/${headObject.id}`, {
      method: 'PUT',
      headers: { 'content-Type': 'application/json'},
      body: JSON.stringify({...headObject, replies: [...headObject.replies.filter((rep: any)=> rep.id !== comment.id)]})
    })
    
  }

  const getDate = (date: any) => {
    const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
    const daysPassed = calcDaysPassed(new Date(), date)
    const numberpassed = daysPassed === 0 ? "Today" : daysPassed === 1 ? "Yesterday" : `${daysPassed} days ago`
    // console.log(daysPassed, numberpassed)
    return numberpassed
  }

  console.log(userObj, userComment)

  return (
    <div className='bg-veryLightGray text-[16px] px-3 py-6 md:px-6 md:py-20 h-full'>
      <Comments userComment={userComment} userObj={userObj} handleDelete={handleDelete} handleEdit={handleEdit} handleComment={handleComment} replyText={replyText} setReplyText={setReplyText} handleSubComment={handleSubComment} setUserComment={setUserComment} handleMainEdit={handleMainEdit} subText={subText} setSubText={setSubText} submitEdit={submitEdit} submitMainEdit={submitMainEdit} mainText={mainText} setMainText={setMainText} subDelete={subDelete}/>
      <CommentBox userObj={userObj} addComment={addComment}/>
      <div className={`${showModal ? 'visible' : 'hidden'} bg-grayishBlue bg-opacity-30 absolute top-0 left-0 w-full h-screen`}>
        <div className='bg-White absolute left-0 right-0 w-[40%] mx-auto top-1/2 -translate-y-1/2 p-6 text-darkBlue rounded-md'>
          <h1 className='mb-5 font-bold'>DELETE COMMENT</h1>
          <p className='mb-4'>Are you sure you want to delete this comment? This will remove the comment and can't be undone</p>
          <div className='flex justify-between'>
            <button onClick={handleDelete} className='text-White bg-darkBlue w-[45%] py-2 rounded-md font-medium'>No, Cancel</button>
            <button className='text-White bg-softRed w-[45%] py-2 rounded-md font-medium'>Yes, Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
