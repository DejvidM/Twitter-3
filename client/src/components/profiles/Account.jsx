import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "../Nav";
import ProfilePosts from "./ProfilePosts";

const Account = () => {

    const {id} = useParams();
    const [user , setUser ] = useState({});
    const [loggedUser , setLoggedUser ] = useState({});
    const navigate = useNavigate();


    useEffect(() => {
        
        axios.post('http://localhost:80/server/controllers/profile.php' , {action : 'getloggedin' , email : localStorage.getItem('state')})
            .then(res =>{ setLoggedUser(res.data); console.log(res.data , 'loggeduser')})
            .catch(err => console.log(err))

        axios.post('http://localhost:80/server/controllers/profile.php' , {action : 'getOneUser' , id})
            .then(res =>{ setUser(res.data) ;  console.log(res.data , 'user ')})
            .catch(err => console.log(err))
    },[])

    return(
        <>

            {user && loggedUser ? 
            <>
                <Nav user={loggedUser} />
                <h1 className="text-3xl text-center pb-6 text-blue-400 cursor-pointer hover:text-blue-300"      
                onClick={() => navigate('/main')}>Back to main</h1>
                
                <div className="flex">
                    <div className="flex flex-col w-1/3 items-center text-2xl">
                        <h1>Name : {user.fullName}</h1>
                        <p>About me : {user.bio}</p>
                    </div>
                        {user.id ?
                        <ProfilePosts user_ID={user.id}/>
                        : '' }
                </div>
                
            </>
            : ''
        
            }
        
        </>)
}

export default Account;