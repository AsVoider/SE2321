import React from "react";
import {List} from "antd";
import Book from "./BookToList";
import {Link} from "react-router-dom";
import '../../CSS/booklist.css'
import {getBooks} from "../../Service/api";
class BookList extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            books:[],
        }
    }

    getAllbooks = () =>
    {
        getBooks().then((data)=>{
            this.setState({
                books: data,
            })
        })
    }

    componentDidMount() {
        this.getAllbooks();
    }

    // todo 后台获取数据
    render() {
        return (
            <List bordered={true}
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 3, lg: 3, xl: 4, xxl: 4,
                }}
                dataSource={this.state.books}
                renderItem={(item, index) => (
                    <List.Item key={index} style={{textAlign:"center"}}>
                        <Link to={`/details/${item.id.toString()}`}><Book info={item}></Book></Link>
                    </List.Item>
                )}
            />
        );
    }
}
export default BookList;