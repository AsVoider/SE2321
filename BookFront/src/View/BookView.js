import React, {useEffect, useState} from 'react';
import {Layout} from "antd";
import Heade from "../Compose/Forall/Head";
import Side from "../Compose/Forall/Side";
import {Content} from "antd/es/layout/layout";
import BookDetail from "../Compose/Book/BookDetail";
import {useParams} from "react-router-dom";
import {getBookbyId} from "../Service/api";
import {getUser} from "../Service/userApi";
//todo Route!!


function BookView(id) {
    const params = useParams();
    const[book, setBook] = useState([]);
    //console.log(params);

    const getBook = (id) =>{
        getBookbyId(id).then(data =>{
            setBook(data);
        });
    }

    useEffect(() => {
        //console.log(params.id);
        getBook(params.id);
    }, []);

    useEffect(() => {
        //console.log("book find");
        console.log("book", book);
    }, [book]);

    return (
        <div>
            <Layout style={{ minHeight: '100vh' }}>
                {getUser().admin !== true ? <Heade></Heade> : null}
                <Layout style={{minHeight: '100%'}}>
                    <Side></Side>
                    <Content style={{padding:"30px 50px"}}>
                        <div>
                            <BookDetail info={book}></BookDetail>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default BookView;