import {Button, Col, message, Row, Space, Table, DatePicker} from "antd";
import {useEffect, useState} from "react";
import {Content} from "antd/es/layout/layout";
import {disableUser, enableUser, getQuick, getUsers} from "../../Service/api";
const { RangePicker } = DatePicker;

const sortColumn = [
    {
        title: "name",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "spent",
        dataIndex: "spent",
        key: "spent",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.spent > b.spent,
        sortDirections: ['descend'],
    },
    {
        title: "num",
        dataIndex: "num",
        key: "num",
    }
]

const UserManage = () => {
    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
            defaultSortOrder: "ascend",
            sortDirections: ["ascend", "descend", "ascend"],
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            defaultSortOrder: "ascend",
            sortDirections: ["ascend", "descend", "ascend"],
        },
        {
            title: "email",
            dataIndex: "email",
            key: "email",
            defaultSortOrder: "ascend",
            sortDirections: ["ascend", "descend", "ascend"],
        },
        {
            title: "Operation",
            sortDirections: ["ascend", "descend", "ascend"],
            render: (text, record) => (
                <Space>
                    <Button
                        type={"link"}
                        primary
                        onClick={() => {
                            enableUser(record.id).then(() => {
                                message.success("Enable succeed!");
                                getUsers().then((data) => {
                                    setUsers(data.filter(item => !item.admin));
                                });
                            });
                        }}
                        disabled={record.enabled === true}
                    >
                        Enable
                    </Button>
                    <Button
                        type={"link"}
                        danger
                        onClick={() => {
                            disableUser(record.id).then(() => {
                                message.success("Disable succeed!");
                                getUsers().then((users) => {
                                    setUsers(users.filter(item => !item.admin))
                                });
                            });
                        }}
                        disabled={record.enabled === false}
                    >
                        Disable
                    </Button>
                </Space>
            ),
        },
    ];

    const [users, setUsers] = useState([]);
    const [date, setDate] = useState([]);
    const [disable, setDisable] = useState(true);
    const [quicker, setQuicker] = useState([]);

    const onRangeChange = (dates) => {
        if (dates)
        {
            setDate([dates[0].toISOString(), dates[1].toISOString()])
            setDisable(false)
        } else
        {
            setDate([])
            setDisable(true)
        }
    };

    useEffect(() => {
        getUsers().then((data) => {
            setUsers(data.filter(item => !item.admin));
            //console.log(data)
        })
    }, []);

    const findBuyer = () => {
        //console.log(date)
        getQuick(date[0], date[1]).then((res) => {
            setQuicker(res)
        })
    }

    return (
        <Content className={"page"}>
            <Row justify={"center"}>
                <Col span={8} style={{textAlign:"center"}}>
                    <RangePicker onChange={onRangeChange} style={{float:"left"}}></RangePicker>
                    <Button disabled={disable} onClick={findBuyer} style={{float:"right"}}>查询</Button>
                    <Table columns={sortColumn} dataSource={quicker}></Table>
                </Col>
                <Col span={2}></Col>
                <Col span={14}>
                    <Table dataSource={users} columns={columns} />
                </Col>
            </Row>
        </Content>
    );
}

export default UserManage;