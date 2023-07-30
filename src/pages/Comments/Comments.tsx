import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import {
  deleteComments,
  fetchComments,
  postComments,
} from "../../features/comments.slice";
import Style from "./comments.module.css";

function Comments() {
  const comments = useSelector((state) => state.comments.comments);
  console.log(comments, "DSDSDS");



  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleChangeText = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postComments(text));
   setText('');
  };
  const handleDeleteComment = (id) => {
    dispatch(deleteComments(id));
  };

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  return (
    <div className={Style.allPage}>
        <h2 className={Style.Intro}>Отзывы от наших клиентов</h2>
    <div className={Style.mainCommentPage}>
 
        <div className={Style.scrollComment}>
        {comments.map((item) => {
            
          return (<div className={Style.nameAndComment}>
            <p className={Style.fullName}>{item.user.fullName}:</p>
            <div className={Style.comment_mini_block} key={item._id}>
              <p>{item.text}</p>
              <button className={Style.deleteButton}onClick={() => handleDeleteComment(item._id)}>x</button>
            </div>
            </div>
            
          );
        })}
        </div>
         
    </div>
     <form className={Style.formComments}onSubmit={handleSubmit}>
        <div className={Style.inputBlock}>
     <input
       className={Style.commentInput}
       value={text}
       onChange={handleChangeText}
       type="text"
       
     />
      
     <button className={Style.sendButton}>Отправить</button>
     </div>
   </form>
   </div>
  );
}

export default Comments;
