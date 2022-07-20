import React, { useEffect, useState } from 'react'
import "./representativeDetails.scss"
import { Col, Row, Tabs } from "antd";
import Back from "../../../shared/components/Back";
import { useParams } from 'react-router-dom';
import RepPaymentStats from './RepPaymentStats';
import DonorService from '../../../services/DonorService/donor.service';
import ListDonors from './ListDonors';

const { TabPane } = Tabs;

const RepresentativeDetails = () => {
    const { id } = useParams();

    const { donor, fetchDonor } = DonorService();

    const [tab, setTab] = useState("rep");

    const handleChange = (activeKey: string) => {
        setTab(activeKey);
    };

    useEffect(() => {
        fetchDonor(id || '');
    }, [id])

    const tempStatus = 'done';

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
                        <img src={`${donor?.profilePicUrl ?? process.env.PUBLIC_URL + '/user-placeholder.png'}`} alt='' />
                        <h1 className={"font-bold"}> {donor?.username} </h1>
                    </div>
                    <Row>
                        <Col span={19}>
                            <RepPaymentStats paymentStats={null} />
                        </Col>
                        <Col span={4} offset={1}>
                            <div className={`rep-audit-status ${tempStatus}`}>
                                <div className={"audit-header"}>Audit for the month</div>
                                <div className={"font-bold audit-status-info text-capitalize"}>
                                    {tempStatus} <i className={`${tempStatus === 'done' ? 'icon-paid' : 'icon-pending'}`} />
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <ListDonors representativeId={Number(id)}
                    />
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
