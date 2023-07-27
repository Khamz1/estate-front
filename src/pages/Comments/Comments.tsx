import React,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteComments, fetchComments, postComments } from '../../features/comments.slice';
import Style from './comments.module.css'

function Comments() {
    const comments = useSelector((state)=>state.comments.comments)
  
    const dispatch = useDispatch();
    const [text, setText]=useState('')

    const handleChangeText=(e)=>{
        setText(e.target.value)
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        dispatch(postComments(text))
       
        
        
    }
    const handleDeleteComment=(id)=>{
        dispatch(deleteComments(id))
    }
    
    useEffect(()=>{
        dispatch(fetchComments())
    },[dispatch])

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor='commentInput'>Будем рады вашим отзывам</label> <br />
        <input className={Style.commentInput} 
        value={text}
        onChange={handleChangeText}
        type="text" />
    </form>
    <div className={Style.commentsBlock} >
        {comments.map((item)=>{
            return(
                <div key={item._id}>
                    <h3>{item.user}</h3>
                    <h3>{item.text}</h3>
                    <button onClick={()=>handleDeleteComment(item._id)}>x</button>
                </div>
            )
        })}
    </div>
    </div>

    
  )
}

export default Comments