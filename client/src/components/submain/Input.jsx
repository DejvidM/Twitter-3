import {useState} from "react";
import axios from "axios";

const Input = ({user , setReload , reload}) => {

    const [post , setPost] = useState('');

    const tweet = (e) => {
        e.preventDefault();
        post ? 
        axios.post('http://localhost:80/server/controllers/post.php', {action : 'post' , post , id : user.id})
            .then(res =>{ console.log(res) ; setPost(''); setReload(!reload)})
            .catch(err => console.log(err))

        : alert('You should write something to post')
    }

    return(
        <>
            <form onSubmit={tweet} className="flex justify-center">
                <input type="text" className="w-1/3 border py-1 px-2 mr-5 rounded outline-none hover:shadow hover:shadow-slate-400" placeholder="Say something" value={post} onChange={(e) => setPost(e.target.value)}/>
                <button type="submit" className="py-1 px-5 border-2 border-gray-300 text-gray-600 rounded hover:border-blue-400 hover:text-blue-600"> Post </button>
            </form> 
        </>
    )
}

export default Input;