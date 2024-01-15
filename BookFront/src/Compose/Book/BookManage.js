import {useEffect, useState} from "react";
import {addBook, deleteBook, getBookbyId, getBooks, getHotBooks, updateBooks} from "../../Service/api";
import {Link} from "react-router-dom";
import {Button, Card, Col, DatePicker, Form, Input, Row, Space, Table, Tag} from "antd";
import Search from "antd/es/input/Search"
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const newColumn = [
    {
        title: "title",
        dataIndex: "title",
        key: "title",
    },
    {
        title: "num",
        dataIndex: "num",
        key: "num",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.num > b.num,
        sortDirections: ['descend'],
    },
    {
        title: "price",
        dataIndex: "price",
        key: "price",
    }
]

const BookManage = () => {
    const column = [
        {
            title: "title",
            dataIndex: "title",
            key: "title",
            defaultSortOrder: "ascend",
            sortDirections: ["ascend", "descend"],
            render: (text, record) => <Link to={`/admin/details/${record.id}`}>{text}</Link>
        },
        {
            title: "isbn",
            dataIndex: "isbn",
            key: "isbn",
            defaultSortOrder: "ascend",
            sortDirections: ["ascend", "descend"],
        },
        {
            title: "authors",
            dataIndex: "authors",
            key: "authors",
            // render: (tags) => (<>
            //     {tags.map((author) => author + " ")}
            // </>)
        },
        {
            title: "types",
            dataIndex: "types",
            key: "types",
            render: (_, record) => (
                <Tag color={"blue"}>{record.types}</Tag>
            )

        },
        {
            title: "price",
            dataIndex: "price",
            key: "price",
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: "isExist",
            dataIndex: "isExist",
            key: "isExist",
            sort: (a, b) => a.isExist - b.isExist,
        },
        {
            title: "action",
            key: "action",
            render: (text, record) => (
                <Space>
                    <Button type={"link"} onClick={() => {
                        setBookID(record.id)
                    }}>修改</Button>
                    <Button type={"link"} onClick={() => deleteBook(record.id)}>删除</Button>
                </Space>
            )
        }
    ]


    const [books, setBooks] = useState([]);
    const [showBooks, setShowBooks] = useState([]);
    const [sear, setSear] = useState("");
    const [bookId, setBookID] = useState(0);
    const [hotbooks, setHotbooks] = useState([]);
    const [date, setDate] = useState([]);
    const [disable, setDisable] = useState(true);

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

    useEffect(()=>{
        getBooks().then((res) => {setBooks(res); setShowBooks(res)});
    }, []);

    const handleSearch = (text) => {
        if(text === "")
            setSear("");
        else
            setSear(text);
    }

    const onclick = () => {
        getHotBooks(date[0], date[1]).then((res) => setHotbooks(res))
    }

    useEffect(() => {
        const filter = (data) => {
            return sear !== ""
                ? data.filter((item) => item.title.toUpperCase().includes(sear.toUpperCase()))
                : data;
        }
        const newData = filter(books);
        setShowBooks(newData);
        //console.log(newData)
    }, [sear])

    return (
        <Row>
            <Col span={6}>
                <RangePicker onChange={onRangeChange} style={{float:"left"}}></RangePicker>
                <Button style={{float:"right"}} type={"primary"} disabled={disable} onClick={onclick}>查询</Button>
                <Table columns={newColumn} dataSource={hotbooks} pagination={{pageSize: 10}}></Table>
            </Col>
            <Col span={2}></Col>
            <Col span={16}>
                <Row gutter={[20, 20]}>
                    <Col span={24} style={{ display: "flex", justifyContent: "space-between" }}>
                        <Button onClick={() => setBookID(-1)}>添加书籍</Button>
                        <Space direction={"vertical"} size={"middle"} style={{display:'flex'}}>
                            <Search placeholder="input search text" onSearch={handleSearch} enterButton />
                        </Space>
                    </Col>
                </Row>
                <div style={{height:"30px"}}></div>
                <Row>
                    <Col span={24}>
                        {bookId !== 0 ? <BookEdit id={bookId} setBookID={setBookID}/> : null}
                    </Col>
                </Row>
                <Row gutter={[20, 20]}>
                    <Col span={24}>
                        <Table dataSource={showBooks} columns={column} pagination={{pageSize: 20}} rowKey={"id"} expandable={{
                            expandedRowRender:
                                (record) => <div><img src={record.src} style={{height:"150px",width:"90px"}} alt={"一个图片"}/></div>}}></Table>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default BookManage;

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
const dateFormat = 'YYYY-MM-DD';
export const BookEdit = ({id, setBookID}) => {
    const [book, setBook] = useState(null);

    useEffect(() => {
        if(id !== -1)
        {
            getBookbyId(id).then((data) => {
                setBook(data)
                console.log(data)
            })
        }
        else{
            setBook({})
        }
    }, [])

    if(book === null)
    {
        //console.log(book)
        return <div>Loading……</div>
    }
    else
    {
        return(
            <Card>
                <Form onFinish={(values) => {
                    values.publishTime = values.publishTime.format(dateFormat);
                    console.log(values)
                    let cc = {id: id, ...values}
                    if(id !== -1)
                    {
                        updateBooks(cc).then(() => setBookID(0))
                    }
                    else
                    {
                        addBook(cc).then(() => setBookID(0))
                    }
                }} {...layout}>
                    <Form.Item label="title" name="title" initialValue={book.title}>
                        <Input rules={[{required:true}]}></Input>
                    </Form.Item>
                    <Form.Item label="isbn" name="isbn"  initialValue={book.isbn} >
                        <Input rules={[{required:true}]}></Input>
                    </Form.Item>
                    <Form.Item label="authors" name="authors" initialValue={book.authors}>
                        <Input rules={[{required:true}]}></Input>
                    </Form.Item>
                    <Form.Item label="types" name="types" initialValue={book.types}>
                        <Input rules={[{required:true}]}></Input>
                    </Form.Item>
                    <Form.Item label="price" name="price" initialValue={book.price}>
                        <Input rules={[{required:true}]}></Input>
                    </Form.Item>
                    <Form.Item label="pubishTime" name="publishTime" initialValue={id !== -1 ? dayjs(book.publishTime, dateFormat) : new dayjs(2001-1-1)}>
                        <DatePicker format={dateFormat}/>
                    </Form.Item>
                    <Form.Item label="description" name="description" initialValue={book.description}>
                        <Input.TextArea rules={[{required:true}]}></Input.TextArea>
                    </Form.Item>
                    <Form.Item label="isExist" name="isExist" initialValue={book.isExist}>
                        <Input rules={[{required:true}]}></Input>
                    </Form.Item>
                    <Form.Item label="brief" name="brief" initialValue={book.brief}>
                        <Input rules={[{required:true}]}></Input>
                    </Form.Item>
                    <Form.Item label="Cover" name="src" initialValue={book.src}>
                        <Input rules={[{required:true}]}></Input>
                    </Form.Item>
                    <Form.Item {...tailLayout} style={{display:"contents"}}>
                        <Space>
                            <Button type={"primary"} htmlType={"submit"}>{id !== -1 ? "提交修改" : "添加新书"}</Button>
                            <Button type={"primary"} onClick={() => setBookID(0)} style={{marginLeft:"auto"}}>{id !== -1 ? "取消修改" : "取消添加"}</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}