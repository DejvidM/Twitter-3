import {useState , useEffect} from "react";
import axios from "axios";
import Nav from "../Nav";
import ProfilePosts from "./ProfilePosts";
import { useNavigate } from "react-router-dom";

const MainProfile = () => {

    const [user , setUser ] = useState({});
    const [edited , setEdited] = useState('');
    const [bio , setBio] = useState('');
    const [reload , setReload] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.post('http://localhost:80/server/controllers/profile.php' , {action : 'getloggedin' ,email : localStorage.getItem('state')})
            .then(res =>{ setUser(res.data) })
            .catch(err => console.log(err))

    },[reload])

    const editBio = () => {

        axios.post('http://localhost:80/server/controllers/profile.php' , {action : 'editBio' , bio , id : user.id})
            .then(res => setReload(!reload))
            .catch(err => console.log(err))
    }

    return(
        <> 
        {user ? <> 
            <Nav user={user}/>
            <h1 className="text-3xl text-center pb-6 text-blue-400 cursor-pointer hover:text-blue-300" 
            onClick={() => navigate('/main')}>Back to main</h1>
            <div className="flex">
                <div className="flex flex-col p-2 items-center w-1/3 text-lg">
                    <h1>Name : {user.fullName}</h1>
                    {edited ?
                    <div className="flex flex-col items-center p-1">
                        <textarea rows={'5'} cols={'30'} className="border p-2 text-lg mb-2" onChange={(e) => setBio(e.target.value)} />
                        <button onClick={() =>{editBio() ; setEdited(false)}}  className="px-3 py-1 border rounded-lg bg-slate-200 text-green-600">Done</button>
                    </div>
                    : <div className="flex flex-col items-center p-1 mb-2">
                    <h1>About me : {user.bio}</h1>
                    <button onClick={() => setEdited(true)} className="px-3 py-1 border rounded-lg bg-slate-200 text-violet-600">Edit</button>
                    </div>}
                </div>
                {user.id ?
                <ProfilePosts user_ID={user.id}/>
                : ''
                }
            </div>
            </>
            : ''
            }
        </>
    )
}

export default MainProfile;