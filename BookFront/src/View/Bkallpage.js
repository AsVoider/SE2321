import React from 'react';
import Heade from "../Compose/Forall/Head";
import BookToAll from "../Compose/Book/BookToAll";
import Side from "../Compose/Forall/Side";
import {Layout} from "antd";
import {Content} from "antd/es/layout/layout";

const Bkallpage = () => {

    return (
        <Layout>
            <Heade></Heade>
            <Layout>
                <Side></Side>
                <Content>
                    <BookToAll></BookToAll>
                </Content>
            </Layout>
        </Layout>
    );
}

export default Bkallpage;