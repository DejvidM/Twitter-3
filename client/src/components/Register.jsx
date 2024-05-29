import React, { useEffect, useReducer, useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function ValidateEmail(mail) 
{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
        return true
    }
        return false
}

function CheckPassword(pass) 
{ 
    const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    if(pass.match(passw)) 
        { 
        return true;
        }
    else
        { 
        return false;
        }
}

const person  = {
    fullName : {
        value : '',
        error : ''
    },
    email : {
        value :'',
        error : ''
    },
    password : {
        value : '',
        error : ''
    },
    confirm : {
        value: '', 
        error :''
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_name' : 
            return {
                ...state ,
                fullName : {
                    ...state.fullName,
                    value : action.payload
                }
            }
        case "SET_EMAIL":
            return {
                ...state,
                email: {
                    ...state.email,
                    value : action.payload
                }
            }
        case "SET_PASSWORD":
            return {
                ...state,
                password : {
                    ...state.password,
                    value : action.payload
                }
            }
        case "SET_confirm":
            return {
                ...state,
                confirm : {
                    ...state.confirm,
                    value : action.payload
                }
            }
        case 'SET_name_e' : 
            return {
                ...state ,
                fullName : {
                    ...state.fullName,
                    error : action.payload
                }
            }
        case "SET_EMAIL_e":
            return {
                ...state,
                email: {
                    ...state.email,
                    error : action.payload
                }
            }
        case "SET_PASSWORD_e":
            return {
                ...state,
                password : {
                    ...state.password,
                    error : action.payload
                }
            }
        case "SET_confirm_e":
            return {
                ...state,
                confirm : {
                    ...state.confirm,
                    error : action.payload
                }
            }
        case 'refresh' :
            return {
                ...person
            }
        default:
            return state;
    }
}

const Register = () =>{

    const [state , dispatch ] = useReducer(reducer , person);
    const [login , setLogin] = useState('');
    const [isSubmmited , setIsSubmmited] = useState('');
    const [mainError , setMainError] = useState('');

    useEffect(() => {
        dispatch({
            type : 'refresh',
            payload : ''
        });
        setMainError('');
    },[login])

    const handleChange = (e, number) => {

        switch (number){
            case 1 :
                if(e.target.value.length < 5 && e.target.value.length > 0){
                    dispatch({
                        type : 'SET_name_e',
                        payload : 'Name must be longer than 5 characters'
                    })
                }
                else{
                    dispatch({
                        type : 'SET_name_e',
                        payload : ''
                    })
                }
                dispatch({
                    type : 'SET_name',
                    payload : e.target.value
                })
                break;

            case 2 :

                const valE = ValidateEmail(e.target.value);
                if(valE == false && e.target.value.length > 0){
                    dispatch({
                        type : 'SET_EMAIL_e',
                        payload : 'Please, enter a valid email'
                    })
                }
                else {
                    dispatch({
                        type : 'SET_EMAIL_e',
                        payload : ''
                    })
                }
                dispatch({
                    type : 'SET_EMAIL',
                    payload : e.target.value
                })
                break;

            case 3 :

                const valP = CheckPassword(e.target.value);
                if(valP == false && e.target.value.length > 0){
                    dispatch({
                        type : 'SET_PASSWORD_e',
                        payload : 'Password must contain an uppercase letter , a lowercase letter and a number. Minimum length is 8'
                    })
                }else{
                    dispatch({
                        type : 'SET_PASSWORD_e',
                        payload : ''
                    })
                }
                dispatch({
                    type : 'SET_PASSWORD',
                    payload : e.target.value
                })
                break;

            case 4 :

                if(state.password.value != e.target.value && e.target.value.length > 0){
                    dispatch({
                        type : 'SET_confirm_e',
                        payload : 'Passwords must match'
                    })
                }else{
                    dispatch({
                        type : 'SET_confirm_e',
                        payload : ''
                    })
                }
                dispatch({
                    type : 'SET_confirm',
                    payload : e.target.value
                })
                break;
        }
    }

    const handleForm = (e) => {
        e.preventDefault();
        state.password.error || state.email.error || state.fullName.error || state.confirm.error
        ? ''
        :
        axios.post('http://localhost:80/server/controllers/authentication.php' , 
        { fullName : state.fullName.value , email : state.email.value , password : state.password.value} )
            .then(res => {res.data == 'Please fill in the form' ? setMainError(res.data) : res.data == 'registred' ?<> {localStorage.setItem('state' , state.email.value)} {window.location.reload()}</> : setMainError(res.data);  })
            .catch(err => console.log(err));
    }

    const handleLogin = (e) => {
        e.preventDefault();
        setIsSubmmited(true); 
        state.password.error || state.email.error
        ? console.log('wrong')
        : 
        axios.post('http://localhost:80/server/controllers/authentication.php' , { fullName : state.fullName.value ,email : state.email.value , password : state.password.value })
            .then(res => { res.data == 'correct' ? <> { localStorage.setItem('state', state.email.value)} {window.location.reload() }</> : setMainError(res.data) ; console.log(res) })
            .catch(err => console.log(err));
    }

    return(
        <>
        {login ?
        <> 
            <div className="flex place-content-center items-center m-10">
                <h1 className="text-3xl font-bold underline text-center hover:cursor-pointer hover:shadow" onClick={() => setLogin(false)}>Register/</h1>
                <h1 className="text-3xl font-bold underline text-center text-sky-700 transition hover:shadow" onClick={() => setLogin(true)}> Log in</h1>
            </div>

            <form className="flex flex-col items-center text-lg min-h-64 justify-evenly" onSubmit={(e) => handleLogin(e)}>
                <label>Email : </label>

                <input type="email" className="border rounded-lg px-2" 
                    value={state.email.value} 
                    style={state.email.error && isSubmmited ? {outlineColor : '#EF0107', borderColor :'#EF0107'} : {}} 
                    onChange={(e) => { handleChange(e,2)}}
                    autoComplete="new-password"
                    >    
                </input>

                {state.email.error && isSubmmited ? 
                <p className="text-red-600 p-2 w-44 text-sm -translate-y-9 translate-x-56 rounded-sm bg-red-100">{state.email.error}</p> 
                : ''}

                <label>Password </label>

                <input type="password" className="border rounded-lg px-2 " 
                    value={state.password.value} 
                    style={state.password.error && isSubmmited ? {outlineColor : '#EF0107', borderColor :'#EF0107'} : {}} 
                    onChange={(e) => { handleChange(e,3)}}
                    autoComplete="new-password"
                    >
                </input>

                {state.password.error && isSubmmited ? 
                <p className="text-red-600 p-2 w-44 text-sm -translate-y-9 translate-x-56 rounded-sm bg-red-100">{state.password.error}</p> 
                : ''}

                <button className="py-2 px-7 mt-3 bg-sky-700 text-gray-50 rounded" type="submit" name="button">Login</button>

            </form>
            {mainError ? 
            <div className="flex justify-center">
            <p className="text-red-600 p-2 w-64 translate-y-9 rounded-sm bg-red-100 text-center text-2xl rounded">{mainError}</p>
            </div>
            : ''
            }
        </>
        
        :
        <>
            <div className="flex place-content-center items-center m-10">
                <h1 className="text-3xl font-bold underline text-center text-sky-700 transition hover:cursor-pointe hover:shadow" onClick={() => setLogin(false)}>Register/</h1>
                <h1 className="text-3xl font-bold underline text-center hover:cursor-pointer hover:shadow" onClick={() => setLogin(true)}> Log in</h1>
            </div>

            <form className="flex flex-col items-center text-lg min-h-80 justify-evenly" onSubmit={(e) => handleForm(e)}>

                <label>Full Name : </label>

                <input type="text" className="border rounded-lg px-2" 
                    value={state.fullName.value} 
                    style={state.fullName.error ? {outlineColor : '#EF0107', borderColor :'#EF0107'} : {}} 
                    onChange={(e) => { handleChange(e,1)}}
                    autoComplete="new-password"
                ></input>

                {state.fullName.error ? 
                <p className="text-red-600 p-2 w-44 text-sm -translate-y-9 translate-x-56 rounded-sm bg-red-100">{state.fullName.error}</p> 
                : ''}

                <label>Email : </label>

                <input type="email" className="border rounded-lg px-2" 
                    value={state.email.value} 
                    style={state.email.error ? {outlineColor : '#EF0107', borderColor :'#EF0107'} : {}} 
                    onChange={(e) => { handleChange(e,2)}}
                    autoComplete="new-password"
                    >    
                </input>

                {state.email.error ? 
                <p className="text-red-600 p-2 w-44 text-sm -translate-y-9 translate-x-56 rounded-sm bg-red-100">{state.email.error}</p> 
                : ''}

                <label>Password </label>

                <input type="password" className="border rounded-lg px-2 " 
                    value={state.password.value} 
                    style={state.password.error ? {outlineColor : '#EF0107', borderColor :'#EF0107'} : {}} 
                    onChange={(e) => { handleChange(e,3)}}
                    autoComplete="new-password"
                    >
                </input>

                {state.password.error ? 
                <p className="text-red-600 p-2 w-44 text-sm -translate-y-9 translate-x-56 rounded-sm bg-red-100">{state.password.error}</p> 
                : ''}

                <label>Confirm password</label>

                <input type="password" className="border rounded-lg px-2" 
                    value={state.confirm.value} 
                    style={state.confirm.error ? {outlineColor : '#EF0107', borderColor :'#EF0107'} 
                    : {}
                    }
                    onChange={(e) => { handleChange(e,4)}}
                />

                {state.confirm.error ? 
                <p className="text-red-600 p-2 w-44 text-sm -translate-y-9 translate-x-56 rounded-sm bg-red-100">{state.confirm.error}</p> 
                : ''}

                <button className="py-2 px-7 mt-3 bg-sky-700 text-gray-50 rounded" type="submit">Register</button>

            </form>
            {mainError ? 
            <div className="flex justify-center">
            <p className="text-red-600 p-2 w-64 translate-y-9 rounded-sm bg-red-100 text-center text-2xl rounded">{mainError}</p>
            </div>
            : ''
            }
            </>
        }
        </>
    )
}

export default Register;