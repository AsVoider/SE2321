import React, {useEffect, useState} from "react";
import {Avatar, Menu} from "antd";
import {Header} from "antd/es/layout/layout";
import {Row, Col} from 'antd'
import {
    GlobalOutlined,
    DesktopOutlined,
    DatabaseOutlined,
    LoadingOutlined,
     UserOutlined, SearchOutlined
} from "@ant-design/icons";
import '../../CSS/heade.css'
import {getAvatar} from "../../Service/userApi";

const getItems = (label, key, icon, children)=>{
    return {
        key, icon, label, children,
    }
}

const Items = [
    getItems('首页', '1', <a href={'/'}><DesktopOutlined /></a>),
    getItems('All-Books', '2', <a href={'/All'}><DatabaseOutlined /></a>),
    getItems('CART', '3', <a href={'/Cart'}><LoadingOutlined /></a>),
]
const Heade = () => {
    const [current, setCurrent] = useState(0)
    const [ava, setAva] = useState("")

    const onClick = (e)=>
    {
        console.log("click", e);
        // this.setState({current : e.key});
        setCurrent(e.key)
    }

    const getAva = () => {
         getAvatar().then((res) => {
             console.log(res.img)
             setAva(res.img)
         })
    }

    useEffect(() => {
        getAva()
    }, [ava]);

    return(
        <Header className='header' style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
            <Row style={{height:"64px"}}>
                <Col span={3}><GlobalOutlined />An outLined web</Col>
                <Col className='meni' style={{flex:"1 1 auto"}}>
                    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={Items} style={{backgroundColor: "aqua"}}></Menu>
                </Col>
                <Col span={1} style={{textAlign:"center"}}><a href={'/Search'}><SearchOutlined /></a></Col>
                <Col span={1} style={{textAlign:"center"}}><a href={"/User"}><Avatar src={ava}/></a></Col>
            </Row>
        </Header>
    )
}

export default Heade;