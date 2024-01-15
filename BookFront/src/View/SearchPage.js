import {Row, Col} from "antd";
import Heade from "../Compose/Forall/Head";
import {Content} from "antd/es/layout/layout";
import SearchBar from "../Compose/User/Search";


const SearchPage = () => {
    return(
        <div>
            <Heade></Heade>
            <div style={{height:"30px"}}></div>
            <Content>
                <Row gutter={[12, 12]}>
                    <Col span={1}></Col>
                    <Col span={22}>
                        <SearchBar></SearchBar>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </Content>
        </div>
    )
}

export default SearchPage