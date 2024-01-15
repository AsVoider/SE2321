import {Button, Checkbox, Form, Input, Space} from "antd";
import {AlertOutlined, StepForwardOutlined} from "@ant-design/icons";
import {Logining, onLogin} from "../../Service/userApi";
import {Link, useNavigate} from "react-router-dom";


const Login = ({use}) => {
    const navigate = useNavigate();
    const  handleSubmit = value => {
        sessionStorage.clear();
        let username = value.username;
        let password = value.password;
        Logining({username, password}).then((res) => {
            if(res.role === 0)
            {
                onLogin().then()
                use()
            }
            else if(res.role === 1)
            {
                onLogin().then()
                navigate('/admin')
                use()
            }
            else
                alert("Wrong Input")
        })
    }


    return(
        <Form className="loginf1" onFinish={handleSubmit}>
            <Form.Item label={<label style={{color: "#cdf", fontFamily: "Serif"}}>Username</label>} name = 'username' rules={[{required:true, message:'please input'}]}>
                <Input showCount={true}/>
            </Form.Item>

            <Form.Item className="form1" label={<label style={{color: "#cdf", fontFamily: "Serif"}}>Password</label>} name="password" rules={[{required: true, message: 'Please input your password!'}]}>
                <Input.Password/>
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{offset: 8, span: 16}}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Space size={8}>
                    <Button icon={[<AlertOutlined />]} type="primary" htmlType="submit">LOG IN</Button>
                    <Link to={'/register'}><Button icon={[<StepForwardOutlined />]}>SIGN IN</Button></Link>
                </Space>
            </Form.Item>
        </Form>)
}

export default Login;