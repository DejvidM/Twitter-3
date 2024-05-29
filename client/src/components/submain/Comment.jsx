import React, { useEffect, useState } from "react";
import axios from "axios";

const Comment = ({user_ID , post_ID , allUsers}) => {
    
    
    const [state , setState] = useState('');
    const [error,setError] = useState('');
    const [allComments , setAllComments ] = useState([]);
    
    const [info , setInfo ] = useState('');
    const [showAllComments , setShowAllComments] = useState('');
    const [commentsCount , setCommentsCount] = useState('');
    const [commentstate , setcommentstate] = useState('');
    
    const show = () => {
        setState(!state);
    }

    useEffect(() => {
        setError('');
        setInfo('');

        axios.post('http://localhost:80/server/controllers/comment.php' , {action : 'getComments' , post_ID})
            .then(res => { res.data != 'no comments' ? setAllComments(res.data) : '' })
            .catch(err => console.log(err))

        axios.post('http://localhost:80/server/controllers/comment.php' , {action : 'getCommentsNumber'})
            .then(res => {res.data != 'nothing' ?  setCommentsCount(res.data)  : ''})
            .catch(err => console.log(err))


    }, [state , commentstate])

    const comm = (e) => {
        e.preventDefault();
        info ?
        axios.post('http://localhost:80/server/controllers/comment.php', {action : 'Comment' ,info , user_ID , post_ID})
            .then(res => {console.log(res) ; setError('') ; setState('') ; setInfo('')})
            .catch(err => console.log(err))
        : setError('Comment cannot be empty')
    }

    const deleteComment = (commid) => {

        axios.post('http://localhost:80/server/controllers/comment.php', {action : 'deleteComment' , commid })
            .then(res => res.data == 'deleted comment' ? setcommentstate(!commentstate) : '')
            .catch(err => console.log(err))
    }

    return(
        <>
            <form className="border border-gray-300 w-full p-2 mt-5 flex flex-col" onSubmit={comm}>

                <label className="text-base cursor-pointer p-1 text-blue-800" onClick={() => show()} >Comment</label>
                <div className="px-2 pb-1" style={state ? {visibility : 'visible'} : {visibility : 'hidden' , height : '0px' }}>
                    <input type="text" className="border-2 bg-blue-100 px-2 py-1 mt-2 rounded outline-none w-5/6" 
                    onChange={(e) => setInfo(e.target.value)} value={info} placeholder={error}></input>

                    <input type="submit" value={'Add'} className="border py-1 px-4 ml-4 border-gray-600 cursor-pointer rounded"/>
                </div>
                <div className="text-center w-full px-1 pt-2 border-t-2 text-base text-red-900 cursor-pointer hover:text-red-700" onClick={() => setShowAllComments(!showAllComments)}>                    
                    <label className="cursor-pointer mr-3">Show all comments</label>  
                    {
                        commentsCount ? 
                        
                    commentsCount.map((comcount , index) => comcount.post_ID == post_ID ? <span key={index}
                                                                            className="rounded-full border py-1 px-2 cursor-pointer border-stone-800"
                                                                            >{comcount.comments_count}</span> : '')
                    : ''}
                </div>
                {showAllComments ? 
                <div className="flex w-max flex-col flex-col-reverse">
                {allComments 
                    ? allComments.map( item => 
                        allUsers.map( userItem => userItem.id == item.user_ID 
                            ?   
                                <div className="flex items-center justify-between" key={userItem.id}>
                                <p className="w-max mb-6" > <span className="border rounded-lg border-gray-400 p-2 mr-3 text-indigo-800"> {userItem.fullName} :  </span> {item.info}</p>
                                {userItem.id == user_ID
                                ? <button className="px-2 py-1 border mb-8 ml-10 text-xs rounded-full text-red-400" onClick={() => {
                                    deleteComment(item.id)
                                }}>Delete</button>
                                :''
                                }
                                </div>
                            : ''
                        )
                    )
                    : ''
                }
                </div>
                : '' 
                }
            </form>
        </>
    )

}

export default Comment;