import { List } from 'antd';
import React, {Component}from 'react';
import '../../CSS/bktall.css'
import {getBooks} from "../../Service/api";
import {Link} from "react-router-dom";
class BookToAll extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books:[]
        }
    }

    getAllbooks = () =>{
        getBooks().then((data)=>{
            this.setState({
                books: data,
            }, ()=>{ })})
    }

    componentDidMount() {
        this.getAllbooks()
    }

    render(){
       return (
           <List
        itemLayout="vertical"
        size="large"
        pagination={{
            onChange: (page) => {
                console.log(page);
            },
            pageSize: 6,
        }}
        dataSource={this.state.books}
        renderItem={(item) => (
                <List.Item
                key={item.title}
                extra={
                    <img
                        width={244}
                        height={300}
                        alt="logo"
                        src={item.src/*require(`../img/front/${item.id}.jpg`)*/}
                    />}>
                <List.Item.Meta
                    title={<Link to={`/details/${item.id}`} className={'idhref'}>{item.title}</Link>}
                    description={
                    <div>
                        <div className={"brief"} style={{fontStyle:'italic'}}>{item.authors}</div>
                        <div style={{fontFamily: "serif"}} className={"brief"}>{item.types}</div>
                        <div className={"brief"}>{item.brief}</div>
                    </div>
                }/>
                {item.content}
            </List.Item>
        )}
    />
);}
}
export default BookToAll;