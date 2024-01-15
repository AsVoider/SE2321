import React, {useEffect, useState} from 'react';
import Heade from "../Compose/Forall/Head";
import {Button, Card, Col, DatePicker, Layout, Row, Space, Table} from "antd";
import '../CSS/userpg.css'
import UserDetail from "../Compose/User/UserDetail";
import {Content, Footer} from "antd/es/layout/layout";
import moment from 'moment'
import {getMy, getOrders} from "../Service/api";
import {OrderTable} from "../Compose/Order/OrderTable";
import Search from "antd/es/input/Search";
import Meta from "antd/es/card/Meta";

const { RangePicker } = DatePicker;

const columns = [
    {
        title: "title",
        dataIndex: "title",
        key: "title",
    },
    {
        title: "num",
        dataIndex: "num",
        key: "num",
        sortDirections: ['descend'],
    },
    {
        title: "price",
        dataIndex: "price",
        key: "price",
    }
]

const UserView = () => {
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");
    const [date, setDate] = useState([]);
    const [showOrder, setShowOrder] = useState([]);

    const [searchDate, setSearchDate] = useState([]);
    const [disable, setDisable] = useState(true);
    const [myHot, setMyHot] = useState([]);
    const [numAndPrice, setNumAndPrice] = useState([]);

    const customizeOrders = (orders) => {
        return orders.map((order) => {
            return {
                key: order.id,
                orderId: order.id,
                receiverName: order.sendTo,
                address: order.address,
                phoneNumber: order.phoneNum,
                price: order.price,
                purchaseDate: moment(order.buytime)._i,
                orderItems: order.orderItems,
            };
        });
    };

    const onRangeChange = (dates) => {
        if (dates)
        {
            setSearchDate([dates[0].toISOString(), dates[1].toISOString()])
            setDisable(false)
        } else
        {
            setSearchDate([])
            setDisable(true)
        }
    };

    const onclick = () => {
        getMy(searchDate[0], searchDate[1]).then((res) => {
            setMyHot(res)
            let num = 0, price = 0;
            for(let i = 0; i < res.length; i++)
            {
                num += res[i].num;
                price += res[i].price;
            }
            setNumAndPrice([num, price]);
        })
    }

    const handleDateChange = (dates) => {
        if(dates)
            setDate([dates[0], dates[1]]);
        else
            setDate([]);
    }

    const handleSearch = (text) => {
        if(text === "")
            setSearch("");
        else
            setSearch(text);
    }

    const getOrder = () => {
        getOrders().then((data)=>{
            setOrders(customizeOrders(data))
            setShowOrder(customizeOrders(data))
        })
    }

    useEffect(()=>{
        getOrder()
    },[])

    useEffect(() => {
        const filter = (data) => {
            const filterBySear = search !== ""
                ? data.filter((item) => {
                    return item.orderItems.some(orderitem => {
                        return orderitem.book.title.toUpperCase().includes(search.toUpperCase())
                    })
                }) : data;
            return date[0] && date[1]
                ? filterBySear.filter((item) =>
                    new Date(item.purchaseDate) >= date[0] && new Date(item.purchaseDate) <= date[1]
                ) : filterBySear;
        }
        const newData = filter(orders);
        setShowOrder(newData);
    }, [date, search])

    return (
        <Layout style={{minHeight:"100vh"}}>
            <Heade></Heade>
            <Content><Row gutter={[12, 12]}>
                <Col span={8}>
                    <Row>
                        <Col span={16}><UserDetail></UserDetail></Col>
                    </Row>
                    <Card>
                        <Table columns={columns} dataSource={myHot}></Table>
                        <div style={{height:"10px"}}></div>
                        <div>
                            总本数：{numAndPrice[0]} ____ 总计：{numAndPrice[1]}
                        </div>
                        <div style={{height:"10px"}}></div>
                        <Meta description={
                            <div>
                                <RangePicker onChange={onRangeChange} style={{float:"left"}}></RangePicker>
                                <Button style={{float:"right"}} type={"primary"} disabled={disable} onClick={onclick}>查询</Button>
                            </div>
                        }></Meta>
                    </Card>
                </Col>
                <Col span={1}></Col>
                <Col span={15}>
                    <Row gutter={[16,16]}>
                        <Col span={24} style={{ display: "flex", justifyContent: "space-between" }}>
                            <DatePicker.RangePicker onChange={handleDateChange} format="YYYY-MM-DD" showTime={false}/>
                            <Space direction={"vertical"} size={"middle"} style={{display:'flex'}}>
                                <Search placeholder="input search text" onSearch={handleSearch} enterButton />
                            </Space>
                        </Col>
                        <Col span={24}>
                            <OrderTable Orders={showOrder}/>
                        </Col>
                    </Row>
                </Col>
            </Row></Content>
            <Footer style={{textAlign:"center"}}>
                This is Your Page
            </Footer>
        </Layout>
    );
}

export default UserView;