import React, {useEffect, useState} from "react";
import {Col, Row, Space, Table} from "antd";
import { DatePicker } from 'antd';
import moment from 'moment';
import {getAllOrder} from "../../Service/api";
import {OrderDetail} from "./OrderTable";
import Search from "antd/es/input/Search";

const column = [
    {
        title: "id",
        dataIndex: "id",
        key: "id",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.id - b.id,
    },
    {
        title: "Receiver name",
        dataIndex: "sendTo",
        key: "sendTo",
    },
    {
        title: "PhoneNumber",
        dataIndex: "phoneNum",
        key: "phoneNum",
    },
    {
        title: "Address",
        dataIndex: "address",
        key: "address",
    },
    {
        title: "TotalPrice",
        dataIndex: "price",
        key: "price",
        sorter: (a, b) => a.price - b.price,
    },
    {
        title: "Purchase Date",
        dataIndex: "buyTime",
        key: "buyTime",
        render: (date) => date.format("MMM Do YYYY, h:mm:ss a"),
    }
]


const OrderManage = () => {
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState([]);
    const [showOrder, setShowOrder] = useState([])
    const [search, setSearch] = useState("");

    const changeToOrder = (orders) => {
        return orders.map((order) => {
            return{
                id: order.id,
                key: order.id,
                sendTo: order.sendTo,
                phoneNum: order.phoneNum,
                address: order.address,
                price: order.price,
                buyTime: moment(order.buyTime),
                orderItems: order.orderItems,
            }
        })
    }

    const handleDateChange = (dates) => {
        if(dates)
        {
            setDate([dates[0], dates[1]]);
        }
        else
        {
            setDate([])
        }
    }

    const handleSearch = (text) => {
        if(text === "")
        {
            setSearch("")
        }
        else
        {
            setSearch(text);
            console.log(text)
        }
    }

    const getOrder = () => {
        getAllOrder().then((data) => {
            setOrder(changeToOrder(data))
            setShowOrder(changeToOrder(data))
        })
    }

    useEffect(()=>{
        getOrder()
    }, [])

    useEffect(() => {
        const filter = (data) => {
            const filterBySear = search !== ""
                ? data.filter((item) => {
                    return item.orderItems.some(orderitem => {
                        return orderitem.book.title.includes(search)
                    })
                }) : data;
            const filterByDate = date[0] && date[1]
                ? filterBySear.filter((item) =>
                    new Date(item.buyTime) >= date[0] && new Date(item.buyTime) <= date[1]
                ) : filterBySear;
            return filterByDate;
        }
        const newData = filter(order);
        setShowOrder(newData);
    }, [date, search])

    return(
        <div>
            <Row>
                <Col span={1}></Col>
                <Col span={22}>
                    <Row gutter={[20, 20]}>
                        <Col span={24} style={{ display: "flex", justifyContent: "space-between" }}>
                            <DatePicker.RangePicker onChange={handleDateChange} format="YYYY-MM-DD" showTime={false}/>
                            <Space direction={"vertical"} size={"middle"} style={{display:'flex'}}>
                                <Search placeholder="input search text" onSearch={handleSearch} enterButton />
                            </Space>
                        </Col>
                        <Col span={24}>
                            <Table columns={column} dataSource={showOrder} pagination={{pageSize: 10}} expandable={{
                                expandedRowRender: (record) =>(
                                    <OrderDetail OrderItems={record.orderItems}></OrderDetail>
                                )
                            }}>
                            </Table>
                        </Col>
                    </Row>
                </Col>
                <Col span={1}></Col>
            </Row>
        </div>
    );
}

export default OrderManage;