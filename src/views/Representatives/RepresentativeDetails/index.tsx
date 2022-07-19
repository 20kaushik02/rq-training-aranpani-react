import React, { useState } from 'react'
import "./representativeDetails.scss"
import { Col, Row, Tabs } from "antd";
import Back from "../../../shared/components/Back";
import { useLocation } from 'react-router-dom';
import RepPaymentStats from './RepPaymentStats';

const { TabPane } = Tabs;

const RepresentativeDetails = () => {
    const location = useLocation();
    const id = new URLSearchParams(location.search).get('id') || undefined;

    const [tab, setTab] = useState("rep");

    const handleChange = (activeKey: string) => {
        setTab(activeKey);
    };

    return (
        <div className="representative-details">
            <Back name={"Representatives"} />

            <Tabs defaultActiveKey={tab}
                onChange={handleChange}
            >
                <TabPane tab={"Representative Details"}
                    key={"rep"}
                >
                    <div className="rep-header">
                        <img src={`${process.env.PUBLIC_URL}/user-placeholder.png`} alt="Profile Picture" />
                    </div>
                    <Row>
                        <Col span={19}>
                            <RepPaymentStats paymentStats={null}/>
                        </Col>
                        </Row>
                </TabPane>
                <TabPane tab={"Profile Details"}
                    key={"profile"}
                >
                </TabPane>
            </Tabs>
        </div>
    )
}

export default RepresentativeDetails;
