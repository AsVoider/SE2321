import {Header} from "antd/es/layout/layout";
import {Col, Menu, Row} from "antd";
import {ReadOutlined, SaveOutlined, SearchOutlined, UserOutlined} from "@ant-design/icons";
import {useState} from "react";

const getItems = (label, key, icon) => {
    return {label, key, icon}
}

const items = [
    getItems('用户管理', '1', <UserOutlined />),
    getItems('订单查看', '2', <ReadOutlined />),
    getItems('图书管理', '3', <SaveOutlined />)
]


const RootHead = ({ onCurrChange }) => {
    const [curr, setCurr] = useState("1");

    const onClick = (e) => {
        setCurr(e.key)
        onCurrChange(e.key);
    }

    return(
        <Header>
            <Row style={{height:"64px"}}>
                <Col span={2}></Col>
                <Col style={{flex:"1 1 auto"}}>
                    <Menu onClick={onClick} selectedKeys={curr} mode={"horizontal"} items={items} style={{backgroundColor: "aqua"}}></Menu>
                </Col>
                <Col span={2} style={{textAlign:"center"}}></Col>
            </Row>
        </Header>
    )
}

export default RootHead;