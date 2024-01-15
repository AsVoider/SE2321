import {getUser} from "../Service/userApi";
import {useEffect} from "react";
import {Button, Result} from "antd";
import {closeWebSocket, createWebSocket} from "../Service/WebSocketS";
import Heade from "../Compose/Forall/Head";
import Text from "antd/lib/typography/Text"
import Paragraph from "antd/lib/typography/Paragraph";


const OnOrderFinished = () => {
    const socketUrIHead = "ws://localhost:8080/public/WS/"
    const userId = getUser().id

    useEffect(() => {
        const socketUrL = socketUrIHead + userId
        console.log(socketUrL)
        createWebSocket(socketUrL, (msg) => {
            const jsonData = JSON.parse(msg.data)
            console.log(jsonData)
            alert(jsonData.Info + " " + jsonData.Code + "\n  Your Id is " + userId);
            closeWebSocket()
        })

    }, []);

    return(
        <div>
            <Heade></Heade>
            <div>
                <Result status={"success"} title={"we've received"} subTitle={"it will be handled soon"} extra={
                    <Button type={"primary"} key={"console"}><a href={"/"}>back to main menu</a></Button>
                } ></Result>

                <div>
                    <Paragraph>
                        <Text strong style={{fontSize: 16}}>
                            attention:
                        </Text>
                    </Paragraph>
                    <Paragraph>
                        <Text>if not notified, go to your own page to see the result</Text>
                    </Paragraph>
                </div>
            </div>
        </div>
    )
}

export default OnOrderFinished;