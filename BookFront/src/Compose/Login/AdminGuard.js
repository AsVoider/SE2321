import {Outlet} from "react-router-dom";
import LoginPage from "../../View/LoginPage";
import {useEffect, useState} from "react";
import {ADCheckAuth} from "../../Service/userApi";


const AdminGuard = () => {
    const [isAuthed, setIsAuthed] = useState(false);
    const [isFinished, setIsFinished] = useState(false)

    useEffect(()=>{
        ADCheckAuth().then((res) => {
            console.log(res)
            setIsAuthed(res)
            setIsFinished(true)
        });
    },[isAuthed])

    const handleLogin = () => {
        setIsAuthed(true)
    };

    if(!isFinished)
    {
        return <div>Loading……</div>
    }
    else
    {
        return(
            isAuthed ?
                <Outlet></Outlet> : <LoginPage use={handleLogin}></LoginPage>
        )
    }
}

export default AdminGuard;