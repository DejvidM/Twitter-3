import axios from "axios";
import React, { useEffect, useState } from "react";
import Icon from '../../icons/like-svgrepo-com'

const ProfilePosts = ({user_ID}) => {

    const [posts , setPosts] = useState([]);
    const [reload , setReload] = useState('');
    const [allLikes, setAllLikes] = useState([]);
    const [likesCount , setLikesCount] = useState([]);
    const [loggedUser , setLoggedUser] = useState('');

    useEffect(() => {
        axios.post('http://localhost:80/server/controllers/profile.php' , {action : 'getOneUserByEmail' , email : localStorage.getItem('state')})
        .then(res =>{ setLoggedUser(res.data.id) ;  console.log(res.data)})
        .catch(err => console.log(err))

        axios.post('http://localhost:80/server/controllers/profile.php' , {action : 'getPosts' , user_ID})
            .then(res =>{ setPosts(res.data) })
            .catch(err => console.log(err))

            axios.post('http://localhost:80/server/controllers/updatePost.php' , {action : 'getLikes'})
            .then(res => { setAllLikes(res.data)})
            .catch(err => console.log(err))

            axios.post('http://localhost:80/server/controllers/updatePost.php' , {action : 'getLikesCount'})
            .then(res => { setLikesCount(res.data)})
            .catch(err => console.log(err))    
    }, [reload])

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
            <div  className="flex items-center flex-col-reverse w-2/3">
                {posts.length > 0
                ? 
                    posts.map( (item) => 
                        <div key={item.id} className="flex flex-col items-center m-2 px-6 py-8 border-2 w-4/5 rounded-xl text-lg text-gray-900 hover:-translate-y-1 hover:bg-gray-100 transition">
                                
                                {loggedUser == user_ID ?

                                <button className="px-4 py-1 border rounded bg-red-600 self-end" onClick={() => deletePost(item.id)}>Delete</button>
                                : ''}
                                
                                <p>{item.content}</p>
                                <div className="flex w-full justify-between px-1 items-center mt-10"> 

                                    <div className="flex items-center">    
                                        <button className="px-5 py-1 bg-gray-300 mr-2 rounded text-blue-700"
                                        onClick={() => like(user_ID , item.id)}>Like</button>

                                        {allLikes.length > 0 ?
                                            allLikes.map( (onelike) => onelike.post_ID == item.id && onelike.user_ID == user_ID
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
                        </div>
                    )    

                : <p>Loading</p>}
            </div>
            
        </>
    )
}

export default ProfilePosts;