import React, {useEffect, useState} from 'react';
import {Button, Card, Space, Table, Tag} from "antd";
import moment from 'moment';
import Search from "antd/es/input/Search";
import {Link} from "react-router-dom";
import {FetchBookByTitle, getAuthorByTitle, getBooksContains, getRelatedBooks, mapperReduce} from "../../Service/api";
import {getUser} from "../../Service/userApi";
import Text from "antd/lib/typography/Text";

const column = [
    {
        title: "title",
        dataIndex: "title",
        key: "title",
        defaultSortOrder: "ascend",
        sortDirections: ["ascend", "descend"],
        render: (text, record) => <Link to={`/details/${record.id}`}>{text}</Link>
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
        render: (_, record) => record.isExist === -1 ? "已删除" : record.isExist,
    },
    {
        title: "Publish Time",
        dataIndex: "publishTime",
        key: "publishTime",
        render: (date) => moment(date).format("YYYY-MM-DD"),
    }
]
const SearchBar = () => {
    const [sear, setSear] = useState("");
    const [author, setAuthor] = useState("")
    const [book, setBook] = useState([]);
    const [title, setTitle] = useState("")
    const [book3, setBook3] = useState([])
    const [rela, setRela] = useState("")
    const [gql, setGql] = useState("")
    const [gqlBook, setGqlBook] = useState([])
    const [map, setMap] = useState()

    const handleSearch = (text) => {
        console.log(getUser())
        if(text === "")
            setSear("");
        else
            setSear(text);
    }

    const getBooksContain = (text) => {
        if(text === "")
            setBook([]);
        else
            getBooksContains(text).then((res) => {
                setBook(res);
            })
    }

    useEffect(() => {
        getBooksContain(sear)
    }, [sear])

    const handleSearch2 = (text) => {
        setAuthor("")
        if (text === "")
            setTitle("")
        else
            setTitle(text)
    }

    const getAuthorsByTitle = (text) => {
        if(text === "")
            setAuthor("")
        else
            getAuthorByTitle(text).then((res) => {
                setAuthor(res)
                console.log(res)
            })
    }

    useEffect(() => {
        getAuthorsByTitle(title)
    }, [title])

    const handleSearch3 = (text) => {
        setRela("")
        if (text === "")
            setRela("")
        else
            setRela(text)
    }

    const getRelated = (text) => {
        if (text === "")
            setBook3([])
        else
            getRelatedBooks(text).then((res) => {
                setBook3(res)
            })
    }

     useEffect(() => {
         getRelated(rela)
     }, [rela])

    const handleSearch4 = (text) => {
        setGql("")
        if (text === "")
            setGql("")
        else
            setGql(text)
    }

    const getByName = (text) => {
        if (text === "")
            setGqlBook([])
        else {
            FetchBookByTitle(text).then(res => {
                setGqlBook([res.bookByTitle])
                //console.log(res.data)
            })
        }
    }

    useEffect(() => {
        getByName(gql)
    }, [gql])

    const mapReduce = () => {
        mapperReduce().then((res) => {
            console.log(res)
            setMap(res)
            //console.log(map)
        })
    }

    return (
        <div>
            <Card title="Search Books!">
                <Space direction={"vertical"} size={"middle"} style={{display:'flex'}}>
                    <Search placeholder="Search Books" onSearch={handleSearch}></Search>
                    <Table columns={column} dataSource={book} rowKey={"id"} pagination={{pageSize: 15}}></Table>
                </Space>
            </Card>
            <Card title={"Search Authors"}>
                <Space direction={"vertical"} size={"middle"} style={{display: "flex"}}>
                    <Search placeholder={"Search Authors"} onSearch={handleSearch2}></Search>
                    <Text>{author !== "" ? "书的作者是: " + author : ""}</Text>
                </Space>
            </Card>
            <Card title="Search related">
                <Space direction={"vertical"} size={"middle"} style={{display: "flex"}}>
                    <Search placeholder={"Search Related"} onSearch={handleSearch3}></Search>
                    <Table columns={column} dataSource={book3} rowKey={"id"} pagination={{pageSize: 15}}></Table>
                </Space>
            </Card>
            <Card title="Search book title">
                <Space direction={"vertical"} size={"middle"} style={{display: "flex"}}>
                    <Search placeholder={"Search Title"} onSearch={handleSearch4}></Search>
                    <Table columns={column} dataSource={gqlBook} rowKey={"id"} pagination={{pageSize: 15}}></Table>
                </Space>
            </Card>
            <Card>
                <Space direction={"vertical"} size={"middle"} style={{display: "flex"}}>
                    <Button onClick={mapReduce}>点击mapreduce</Button>
                    <text>{JSON.stringify(map)}</text>
                </Space>
            </Card>
        </div>
    );
}

export default SearchBar;