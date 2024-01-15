import RegisterForm from "../Compose/Login/RegisterForm";
import {Card, Col, Row} from "antd";
import '../CSS/RegisterCss.css'

const RegisterPage = () => {
    return(
        <div>
            <Row justify="center" align="middle" style={{ height: '100vh' }}>
                <Col span={6}></Col>
                <Col span={12}>
                    <div style={{ display: 'block', alignItems: 'center', height: '100%', width:"100%"}}>
                        <Card bordered>
                            <RegisterForm></RegisterForm>
                        </Card>
                    </div>
                </Col>
                <Col span={6}></Col>
            </Row>
        </div>
    )
}

export default RegisterPage;