import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Nav = ({user}) => {
    const navigate = useNavigate();
    
    const logout = () => {
        axios.post('http://localhost:80/server/controllers/authentication.php' , {action : 'Destroy'})
            .then(res => {console.log(res) ; localStorage.setItem('state' , ''); window.location.reload() })
            .catch(err => console.log(err))
    }

    return(
        <>
            <div className="flex justify-between p-5 bg-gray-200 mb-10 items-center hover:bg-gray-400 transition">
                <h1 className="px-4 py-3 text-lg hover:text-gray-100 rounded transition cursor-pointer" onClick={() => navigate(`/account/main`)}>Hello {user.fullName}</h1>
                <button className="border py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-500 " onClick={() => logout()}>Log out</button>
            </div>
        </>
    )

}

export default Nav;