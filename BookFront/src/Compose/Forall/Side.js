import React from "react";
import {Menu} from "antd";
import Sider from "antd/es/layout/Sider";
import '../../CSS/sidecss.css'
import {BookOutlined} from "@ant-design/icons";

const getItem = (label, key, icon,  type) =>{
    return{
        key,icon,label,type,
    };
}

const items = [
    getItem('文学艺术', 'fir', <BookOutlined />),
    getItem('人文社科', 'sec', ),
    getItem('少儿读物', 'thi', ),
    getItem('经济金融', 'for', ),
    getItem('科学技术', 'fiv', ),
    getItem('学习教育', 'six', ),
]

class Side extends React.Component
{
    state = {
        ifIn : false,
    }
    onCollapse = () =>{
        console.log(this.state.ifIn);
        this.setState({ifIn: !this.state.ifIn})
    }

    render() {
        return(
            <div className={this.state.ifIn ? "class1" : "class2"} style={{float: "left"}}>
                <div className='side'>
                    <Sider  collapsible collapsed={this.state.ifIn} width={this.state.ifIn ? "100px" : "200px"} onCollapse={this.onCollapse} className="sider">
                        <div style={{height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)', textAlign: "center"}}>书籍选择</div>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
                    </Sider>
                </div>
            </div>
        )
    }

}

export default Side;