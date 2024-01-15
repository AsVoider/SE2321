import React, {Component} from 'react';
import {Col, Layout, Row} from "antd";
import Heade from "../Compose/Forall/Head";
import {Content} from "antd/es/layout/layout";
import Roll from "../Compose/Forall/Roll";
import BookList from "../Compose/Book/BookList";

class HomePage extends Component {

    state= {books: this.props.books}
    render(){return(
    <div>
        <Layout style={{ minHeight: '100vh' }}>
            {<Heade></Heade>}
            <Layout style={{minHeight: '100%'}}>
                <Content style={{padding:"0 50px"}}>
                    <Row>
                        <Col span={2}></Col>
                        <Col span={20}>
                            <div>
                                <Roll></Roll>
                                <div style={{padding:"20px"}}></div>
                                <BookList books={this.state.books}></BookList>
                            </div>
                        </Col>
                        <Col span={2}></Col>
                    </Row>
                </Content>
            </Layout>
        </Layout>
    </div>
    )}
}

export default HomePage;