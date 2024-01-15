import React, {Component} from 'react';
import Heade from "../Compose/Forall/Head";
import PerOrder from "../Compose/Order/PerOrder";

class OrderPage extends Component {
    render() {
        return (
            <div>
                <Heade></Heade>
                <PerOrder></PerOrder>
            </div>
        );
    }
}

export default OrderPage;