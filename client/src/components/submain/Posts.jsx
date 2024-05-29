import React from "react";
import axios, { all } from "axios";
import Comment from "./Comment";
import Icon from '../../icons/like-svgrepo-com'
import { useNavigate } from "react-router-dom";

const Posts = ({setReload , reload, user , posts , allLikes , likesCount , allUsers }) => {

    const navigate = useNavigate();

    const deletePost = (id) => {
        axios.post('http://localhost:80/server/controllers/post.php' , {action : 'deletePost' , id})
            .then(res => {console.log(res) ; setReload(!reload)})
            .catch(err => console.log(err))
    }
    
    const like = (userID , postID) => {

        axios.post('http://localhost:80/server/controllers/updatePost.php' , {action : 'likePost' , userID , postID})
            .then(res => {console.log(res) ; setReload(!reload)})
            .catch(err => console.log(err))
    }

    return(
        <>
            <div  className="flex items-center flex-col-reverse">
                {posts.length > 0
                ? 
                    posts.map( (item) => 
                        <div key={item.id} className="flex flex-col items-center m-10 px-6 py-8 border-2 rounded-xl w-3/5 text-lg text-gray-900 hover:-translate-y-1 hover:bg-gray-100 transition">
                            
                                {item.user_ID == user.id
                                ? <button className="px-4 py-1 border rounded bg-red-600 self-end" onClick={() => deletePost(item.id)}>Delete</button>
                                : ''}
                                {allUsers.map(user => user.id == item.user_ID ? <p className="text-gray-700 self-start ml-10 hover:text-slate-500 hover:cursor-pointer" 
                                onClick={() => navigate(`/account/${item.user_ID}`)}>
                                    {user.fullName} said : </p>
                                    : ''
                                )}
                                <p>{item.content}</p>
                                <div className="flex w-full justify-between px-1 items-center mt-10"> 

                                    <div className="flex items-center">    
                                        <button className="px-5 py-1 bg-gray-300 mr-2 rounded text-blue-700"
                                        onClick={() => like(user.id , item.id)}>Like</button>

                                        {allLikes.length > 0 ?
                                            allLikes.map( (onelike) => onelike.post_ID == item.id && onelike.user_ID == user.id
                                                ?   <Icon key={onelike.id}/>

                                                :  ''
                                            )
                                            : ''     
                                        }
                                        {likesCount.map( likes => 
                                            likes.post_ID == item.id
                                            ?   <p className="text-base p-1">Liked by : {likes.likes_count}</p>
                                            :   ''
                                        )}
                                    </div>

                                    <p className='text-sm -mb-10 text-green-600'>Posted at : {item.postedAt.slice(0,item.postedAt.length -3)}</p>
                                </div>
                                <Comment allUsers={allUsers} user_ID={user.id} post_ID={item.id}/>
                        </div>
                    )    

                : <p>Loading</p>}
            </div>
        </>
    )
}

export default Posts;