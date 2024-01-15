import React from 'react';
import { Card } from 'antd';
import '../../CSS/booktolist.css'
const { Meta } = Card;

class Book extends React.Component
{
    render()
    {
        const {info} = this.props;
        return(
            <Card hoverable style={{width: "240px", marginTop: 10, height: "400px"}}
                  cover={<img alt="img" style={{height:"300px"}} src={info.src/*require(`../img/front/${info.id}.jpg`)*/}
                              className="Abook"/>}>
                    <Meta title={info.title} style={{margin:"auto", width:"100%"}} description={'￥' + info.price}></Meta>
            </Card>
        );
    }
}

export default Book;