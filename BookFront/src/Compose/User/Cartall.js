import React, {Component} from 'react';
import {Button, Space, Table, Tag} from "antd";
import Column from "antd/es/table/Column";
import {addCartItem, delOne, getCart} from "../../Service/api";
class Cartall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: []
        }
    }

    componentDidMount() {
        getCart().then((response) => {
            let newarr = response.map(({book, num}) => ({
                id: book.id,
                title: book.title,
                authors: book.authors,
                price: book.price,
                typesArray: book.typesArray,
                num: num,
            }))
            this.setState({ cart: newarr }, () => {
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    delete = (e) => {
        delOne(e.id).then(() => {
            getCart().then((response) => {
            let newarr = response.map(({book, num}) => ({
                id: book.id,
                title: book.title,
                authors: book.authors,
                price: book.price,
                typesArray: book.typesArray,
                num: num,
            }))
            this.setState({cart : newarr}, () => {
            })
        }).catch((err) => {
            console.log(err);
        })})
    }

    addOne = (e) => {
        addCartItem(e.id).then(() => {
            getCart(1).then((response) => {
                let newarr = response.map(({book, num}) => ({
                    id: book.id,
                    title: book.title,
                    authors: book.authors,
                    price: book.price,
                    typesArray: book.typesArray,
                    num: num,
                }))
                this.setState({cart: newarr}, () => {
                })
            })
                .catch((err) => {
                    console.log(err)
                })
        })
  }

  goOrder = () =>{
        if(this.state.cart.length === 0)
        {
            alert("购物车为空")
        }
        else
        {
            window.location.href = '/Order'
        }
  }
    render() {
        return (
            <div>
                <Table dataSource={this.state.cart}>
                    <Column defaultSortOrder={"ascend"} dataIndex={"id"} title={"id"}></Column>
                    <Column title={"name"} dataIndex={"title"} key={"title"} render={(_,record)=>(
                        <a href={`/details/${record.id}`}>{record.title}</a>
                    )}></Column>
                    <Column title={"author"} dataIndex={"authors"} key={"id"}></Column>
                    <Column title={"price"} dataIndex={"price"} key={"id"}></Column>
                    <Column title={"types"} dataIndex={"typesArray"} key={"id"} render={(tags) => (
                        <>{tags.map((types) => (
                            <Tag color="blue" key={types}>
                                {types}
                            </Tag>))}</>)}></Column>
                    <Column title={"NUM"} dataIndex={"num"} key={"id"}></Column>
                    <Column title={"Action"} align={"center"} key={"id"} render={(_)=>(<Space size="small">
                        <Button onClick={()=>{this.addOne(_)}}>ADD ONE</Button>
                        <Button onClick={()=>{this.delete(_)}}>DELETE</Button>
                        <Button>Buy</Button>
                    </Space>)}></Column>
                </Table>
                {/*<Link to={'/Order'}>*/}<Button type={'primary'} onClick={this.goOrder}>
                    清空购物车
                </Button>{/*</Link>*/}
            </div>
        );
    }
}

export default Cartall;