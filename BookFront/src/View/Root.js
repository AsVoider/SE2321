import {Col, Layout, Row} from "antd";
import {Content} from "antd/es/layout/layout";
import UserManage from "../Compose/User/UserManage";
import OrderManage from "../Compose/Order/OrderManage";
import BookManage from "../Compose/Book/BookManage";
import {useEffect, useState} from "react";
import RootHead from "../Compose/Forall/RootHead";
const Root = () => {

    const [num, setNum] = useState("1");

    useEffect(()=>
    {
        setNum("1")
    },[])

    const OnCurrChange = (e) => {
        setNum(e)
    }

    return(
        <Layout style={{ minHeight: '100vh' }}>
            <RootHead onCurrChange={OnCurrChange}/>
            <Layout style={{minHeight: '100%'}}>
                <Content style={{padding:"0 50px"}}>
                    <Row>
                        <Col span={2}></Col>
                        <Col span={20}>
                            <RootPage num={num}></RootPage>
                        </Col>
                        <Col span={2}></Col>
                    </Row>
                </Content>
            </Layout>
        </Layout>
    )
}

export default Root;

const RootPage = (num) => {
    if(num.num === "1")
        return<UserManage></UserManage>
    else if(num.num === "2")
        return<OrderManage></OrderManage>
    else if(num.num === "3")
        return<BookManage></BookManage>
    else
        return<div>WRONG PAGE</div>
}

