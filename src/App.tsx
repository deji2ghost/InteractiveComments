import { useEffect, useState } from 'react'
import './App.css'
import { Comments } from './components/Comments'
import { CommentBox } from './components/CommentBox'

function App() {

  const [ userObj, setUserObj ] = useState({}) 
  const [ userComment, setUserComment ] = useState([]) 
  const [ showModal, setShowModal ] = useState(false)
  const [ replyText, setReplyText ] = useState('')
  
  useEffect(() => {
    fetch('http://localhost:8000/comments')
      .then(res=> res.json())
      .then(data=> {
        console.log(data)
        // setUserObj(data.currentUser)
        setUserComment(data)
      })
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

  const handleComment = (replyText, currentComment) => {
    console.log(replyText, currentComment)
    const newDay = new Date().toISOString()
    console.log(newDay)
    const replyBox = userComment.map(userBox => {
      if(userBox.id === currentComment.id){
        return(
          {...userBox, replies: [...userBox.replies, { id: Math.trunc(Math.random() * 10000), content: replyText, createdAt: newDay, replyingTo: currentComment.id, user: userObj, score: 8}]}
        )
      }else{
        return( userBox )
      }
    })
    console.log(replyBox)
    setUserComment(replyBox)
  }

  const handleDelete = () => {
    setShowModal(!showModal)
  }
  console.log(showModal)

  const handleEdit = () => {

  }

  console.log(userObj, userComment)

  return (
    <div className='bg-veryLightGray text-[16px] px-3 py-6 md:px-6 md:py-20 h-full'>
      <Comments userComment={userComment} userObj={userObj} handleDelete={handleDelete} handleEdit={handleEdit} handleComment={handleComment} replyText={replyText} setReplyText={setReplyText}/>
      <CommentBox userObj={userObj} />
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
