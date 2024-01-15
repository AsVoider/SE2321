import React from 'react';
import {Descriptions, Button, Badge, Space, Row, Col} from "antd";
import {DollarOutlined } from "@ant-design/icons";
import '../../CSS/detail.css'
import {addCartItem} from "../../Service/api";
import {getUser} from "../../Service/userApi";
import {Link} from "react-router-dom";

//test todo replace it


const BookDetail = ({info}) => {

    const ADD = () =>{
        let bk = {...info, num : 1};
        addCartItem(bk.id).then();
    }

    console.log("info", info);
    if(info == null) return (
        <h1>I Haven't Got This Book's Detail</h1>
    );

    if(!info || info.length === 0)
        return <div>Waiting</div>

    const date = new Date(info.publishTime);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateString = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    return (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={6}>
                <div className={"bkimg"}><img alt="Abook" src={info.src/*require("../img/front/" + info.id + ".jpg")*/} style={{width:'100%'}}/></div>
            </Col>
            <Col span={18}>
                <div className={"content"}>
                    <div className={"bookD"}>
                        <div>
                            <Descriptions title="Book Info" layout="vertical" bordered>
                                <Descriptions.Item label="Author">{info.authors}</Descriptions.Item>
                                <Descriptions.Item label="Title">{info.title}</Descriptions.Item>
                                <Descriptions.Item label="Type">{info.types}</Descriptions.Item>
                                <Descriptions.Item label="Publish Time">{dateString}</Descriptions.Item>
                                <Descriptions.Item label="ISBN" span={2}>
                                    {info.isbn}
                                </Descriptions.Item>
                                <Descriptions.Item label="Books Left" span={3}>
                                    <Badge status={info.isExist > 0 ? "processing" : "error"} text={info.isExist !== -1 ? info.isExist+"本" : "此书已删除"} />
                                </Descriptions.Item>
                                <Descriptions.Item label="Price">{'$'+info.price}</Descriptions.Item>
                                <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
                                <Descriptions.Item label="Official Receipts">$80.00</Descriptions.Item>
                                <Descriptions.Item label="Brief Intro">
                                    {info.description}
                                </Descriptions.Item>
                            </Descriptions>
                        </div>
                    </div>
                    {getUser().admin !== true ? <div className="buy">
                        <Button icon={<DollarOutlined />} size={"middle"} style={{float:"left"}} onClick={ADD} disabled={info.isExist <= 0}>
                            加入购物车
                        </Button>
                        <Space></Space>
                    </div> : <Link to={"/admin"}><Button>返回</Button></Link>}
                </div>
            </Col>
        </Row>
    );
}

export default BookDetail;