
import '../CSS/1.css'
import Login from "../Compose/Login/Login";
const LoginPage = ({use}) => {
    return(
        <div className='pg1'>
            <div className='contain'>
                <div className='box'>
                    <h1 className='title' >Login</h1>
                    <div className='content'></div>
                    <Login use={use}></Login>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;