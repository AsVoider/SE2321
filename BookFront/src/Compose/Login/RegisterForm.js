import {Button, Form, Input, Space} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {Register} from "../../Service/userApi";

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const RegisterForm = () => {

    const navigate = useNavigate();

    const onFinish = (e) => {
        let cc = {
            UserName: e.Username,
            PassWord: e.Password,
            Email: e.Email,
            Name: e.Name,
        }
        console.log(cc)
        Register(JSON.stringify(cc)).then((res) => {
            if(res === true)
                navigate('/')
        })
    }

    return(
        <div>
            <Form {...formItemLayout}
                  name="nest-messages"
                  onFinish={onFinish}
                  style={{
                      maxWidth: 600,
                  }}>
                <Form.Item name="Name" label="Name" rules={[{required:true, message:"Input Your Name"}]}>
                    <Input.TextArea showCount allowClear></Input.TextArea>
                </Form.Item>
                <Form.Item name="Email" label="Email" rules={[{required:true, message:"Input Your Name"},
                    {type:"email",message:"Invalid Email"}]}>
                    <Input></Input>
                </Form.Item>
                <Form.Item name="Username" label="Username" rules={[{required:true, message:"Input Your Username"}]}>
                    <Input></Input>
                </Form.Item>
                <Form.Item name="Password" label="Password" rules={[{required:true, message:"Input Your Password"}]} hasFeedback>
                    <Input.Password></Input.Password>
                </Form.Item>
                <Form.Item name="Confirm" label="Confirm it" dependencies={['Password']} rules={[{required:true, message:"ReInput Your Password"},
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('Password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    })]}>
                    <Input.Password></Input.Password>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Space direction={"horizontal"}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                        <Link to={'/'}><Button type="primary">
                            Login?
                        </Button></Link>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    )
}

export default RegisterForm;