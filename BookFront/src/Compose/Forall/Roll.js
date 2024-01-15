import { Carousel } from 'antd';
import React, {Component} from 'react';
const contentStyle: React.CSSProperties = {
    height: '300px',width: '500px',
    color: '#fff',background: '#364d79',
    lineHeight: '160px',
    textAlign: 'center',
    justifyContent:'center'
};
const sty1: React.CSSProperties = {
    height: '300px',
    // transform: "translate(40%, 0%)",
    width: '750px',
    margin:"auto",
}
class Roll extends Component {
    creatContent = (img) =>{
        const im = img.keys().map(img);
        console.log(im);
        let outPut = [];
        for(let i = 0; i < img.keys().length; i++)
        {
            let imgi = im[i];
            console.log(imgi);
            outPut.push(<div style={contentStyle}><img key={i} alt={"a book"} src={imgi} style={sty1}/></div>)
        }
        return outPut;
    }

    render() {
        const requireContext = require.context("../../Img/gothrough", true, /^\.\/.*\.jpg$/);
        return (
            <Carousel style={{textAlign:"center", justifyContent:"center", margin:"auto"}}>
                {this.creatContent(requireContext)}
            </Carousel>
        );
    }
}

export default Roll;