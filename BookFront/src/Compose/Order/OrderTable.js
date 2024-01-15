import {Table} from "antd";
import React, {useEffect} from "react";
import {Link} from "react-router-dom";

const columns = [
    {
        title: "Id",
        dataIndex: "orderId",
        key: "orderId",
        defaultSortOrder: "descend",
        sortDirections: ["ascend", "descend", "ascend"],
    },
    {
        title: "Receiver Name",
        dataIndex: "receiverName",
        key: "receiverName",
    },
    {
        title: "Phone Number",
        dataIndex: "phoneNumber",
        key: "phoneNumber",
    },
    {
        title: "Address",
        dataIndex: "address",
        key: "address",
    },
    {
        title: "Total Price",
        dataIndex: "price",
        key: "price",
        sortDirections: ["ascend", "descend", "ascend"],
    },
    {
        title: "Purchase date",
        dataIndex: "purchaseDate",
        key: "purchaseDate",
        //sortDirections: ["ascend", "descend", "ascend"],
        //render: (date) => date.format("MMM Do YYYY, h:mm:ss a"),
    },
];
export const OrderTable = ({Orders}) => {

    useEffect(() => { console.log((Orders)) }, [Orders])

    return(<Table columns={columns} dataSource={Orders} rowKey={(record)=>record.key}
                  pagination={{pageSize: 10}} expandable={{
        expandedRowRender: (record) =>(
            <OrderDetail OrderItems={record.orderItems}></OrderDetail>
        )
    }}>
    </Table>)
}

export const OrderDetail = ({OrderItems}) => {
    const data = OrderItems.map((orderItem) => {
        return {
            key: orderItem.id,
            title: orderItem.book.title,
            bookId: orderItem.book.id,
            isbn: orderItem.book.isbn,
            quantity: orderItem.num,
        };
    });

    const thiscolumns = [
        {
            title: "Title",
            dataIndex: "title",
            render: (title, record) => (
                <Link to={`/details/${record.bookId}`}>{title}</Link>
            ),
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
        },
        {
            title: "ISBN",
            dataIndex: "isbn",
        }
    ];

    return(<Table dataSource={data} columns={thiscolumns} size={"small"}
                  pagination={{ position: ["none", "none"] }}>
    </Table>)
}
