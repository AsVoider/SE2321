import React, {useEffect, useState} from 'react';
import '../CSS/1.css'
import {Outlet} from "react-router-dom";
import LoginPage from "./LoginPage";
import {CheckAuth} from "../Service/userApi";

const RequireLogined = () =>{
    const [isAuthed, setIsAuthed] = useState(false);
    const [isFinished, setIsFinished] = useState(false)

    useEffect(()=>{
        CheckAuth().then((res) => {
            console.log(res)
            setIsAuthed(res)
            setIsFinished(true)
        });
    },[isAuthed])


    const handleLogin = () => {
        setIsAuthed(true)
    };

    if(!isFinished)
        return <div>LOADING……</div>
    else
        return(
            isAuthed ? <Outlet></Outlet> : <LoginPage use={handleLogin}></LoginPage>
        )

    /*return(
        isAuthed ?
        <Outlet></Outlet> : <LoginPage use={handleLogin}></LoginPage>
    )*/
}
export default RequireLogined;


