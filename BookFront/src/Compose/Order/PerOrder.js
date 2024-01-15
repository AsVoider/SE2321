import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Form, Input, Table} from "antd";
import {checkout, getCart} from "../../Service/api";
import {getUser} from "../../Service/userApi"

const validateMessages = {
    required: "${label} is required!",
    types: {
        email: "${label} is not a valid email!",
        number: "${label} is not a valid number!",
    },
    number: {
        range: "${label} must be between ${min} and ${max}",
    },
};

function renderTotalPrice(text, record) {
    // text 为该列对应的数据
    // record 为该行的数据对象，可以通过 record.price 和 record.num 访问到对应的价格和数量
    const totalPrice = record.price * record.num;
    return <span>{totalPrice.toFixed(2)}</span>; // 格式化成两位小数并返回JSX元素
}

const columns = [
    {
        title: "商品信息",
        dataIndex: 'title'
    },
    {
        title: '价格(￥)',
        dataIndex: 'price'
    },
    {
        title: '数量',
        dataIndex: 'num'
    },
    {
        title: '小计',
        dataIndex: 'total',
        render: renderTotalPrice,
    }
];

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 20,
    },
};

const PerOrder = () => {
    const [orderItems, setOrderItems] = useState([]);
    const [form] = Form.useForm();
    const get = () =>{
        getCart(1).then((response)=>{
            let newarr = response.map(({book, num}) => ({
                id: book.id,
                title: book.title,
                price: book.price,
                num: num,
            }))
            setOrderItems(newarr);
        }).catch((err) => {
            console.log(err);
        })
    }

    const onFinish = (v) =>{
        /*checkout(JSON.stringify({...v.order, buyTime: new Date(), orderItems: orderItems.map(({ id, num }) => ({ id, num }))}));*/
        checkout(JSON.stringify({
            id: getUser().id,
            cart: 0,
            ...v.order,
            orderItems: orderItems.map(({id, num}) => ({id, num}))
        })).then((data)=>{
            console.log(data)
            window.location.href = "/OnOrderFinished/" + data.data
        })
    }

    useEffect(get, [])

    return (
        <div>
            <Col span={16} offset={4}>
                <Card style={{marginTop: 20}} bordered={true}>
                    请确认您的商品信息
                    <div style={{height: 10}}></div>
                    <Table columns={columns} dataSource={orderItems}></Table>
                </Card>
                <Card style={{marginTop: 20}} title={"请填写收货信息"}>
                    <Form
                        {...layout}
                        name="nest-messages"
                        onFinish={onFinish}
                        validateMessages={validateMessages}
                        style={{ width: "100%" }}
                    >
                        <Form.Item
                            name={["order", "sendTo"]}
                            label="Consignee"
                            rules={[
                                {
                                    required: true,
                                },]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={["order", "phoneNum"]}
                            label="Phone Number"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={["order", "address"]}
                            label="Address"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item name={["order", "note"]} label="note">
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType={"submit"}
                                type={"primary"}
                                size={"large"}
                                style={{ width: 100 }}
                                onClick={()=>form.submit()}>
                                购买
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </div>
    );
}

export default PerOrder;