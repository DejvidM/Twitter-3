import axios, { all } from "axios";
import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Input from "./submain/Input";
import Posts from "./submain/Posts";

const Main = () => {
    const [user , setUser] = useState({
        fullName : '',
    });
    const [posts , setPosts ] = useState('');
    const [reload , setReload ] = useState('');
    const [allUsers , setAllUsers] = useState([]);
    const [allLikes, setAllLikes] = useState([]);
    const [likesCount , setLikesCount] = useState([]);


    useEffect(() => {

        axios.post('http://localhost:80/server/controllers/post.php' , {action : 'getInfo' , email : localStorage.getItem('state')})
            .then(res =>{ setUser(res.data);})
            .catch(err => console.log(err))

        axios.post('http://localhost:80/server/controllers/post.php' , {action : 'getPosts'})
            .then(res => { setPosts(res.data)})
            .catch(err => console.log(err)) 

        axios.post('http://localhost:80/server/controllers/updatePost.php' , {action : 'getLikes'})
            .then(res => { setAllLikes(res.data)})
            .catch(err => console.log(err))

            axios.post('http://localhost:80/server/controllers/updatePost.php' , {action : 'getLikesCount'})
            .then(res => { setLikesCount(res.data)})
            .catch(err => console.log(err))    

        axios.post('http://localhost:80/server/controllers/updatePost.php' , {action : 'getUsers'})
            .then(res => { setAllUsers(res.data)})
            .catch(err => console.log(err))

    },[reload])


    return (
        <>
            <Nav user={user}/>

            <Input user={user} setReload={setReload} reload={reload}/>
            
            <Posts user={user} allLikes={allLikes} posts={posts} setReload={setReload} likesCount={likesCount} allUsers={allUsers} reload={reload}/>

            
        </>
    )
}

export default Main;