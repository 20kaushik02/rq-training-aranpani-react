import React, { FC } from 'react'
import "./repPaymentStats.scss"
import { Col, Row } from "antd";

interface RepPaymentStatsProps {
    paymentStats?: any;
}

const RepPaymentStats: FC<RepPaymentStatsProps> = (props) => {
    const { paymentStats } = props;

    return (
        <div className="payment-stats">
            <Row>
                <Col span={4}>
                    <div className="payment-stats__label">Month Donations</div>
                    <div className="payment-stats__value font-bold">
                        ₹{paymentStats?.monthDonationsValue || '-'}
                        <span className="font-light">
                            ({paymentStats?.monthDonationsCount || '-'})
                        </span>
                    </div>
                </Col>
                <Col span={4} offset={1}>
                    <div className="payment-stats__label">Online Donations</div>
                    <div className="payment-stats__value font-bold">
                        ₹{paymentStats?.onlineDonationsValue || '-'}
                        <span className="font-light">
                            ({paymentStats?.onlineDonationsCount || '-'})
                        </span>
                    </div>
                </Col>
                <Col span={4} offset={1}>
                    <div className="payment-stats__label">Offline Donations</div>
                    <div className="payment-stats__value font-bold">
                        ₹{paymentStats?.offlineDonationsValue || '-'}
                        <span className="font-light">
                            ({paymentStats?.offlineDonationsCount || '-'})
                        </span>
                    </div>
                </Col>
                <Col span={5} offset={1}>
                    <div className="payment-stats__label">Pending Amount from Rep</div>
                    <div className="payment-stats__value font-bold">
                        ₹{paymentStats?.pendingFromRepValue || '-'}
                        <span className="font-light">
                            ({paymentStats?.pendingFromRepCount || '-'})
                        </span>
                    </div>
                </Col>
                <Col span={3} offset={1}>
                    <div className="payment-stats__label">Not Paid amt</div>
                    <div className="payment-stats__value font-bold">
                        ₹{paymentStats?.notPaidValue || '-'}
                        <span className="font-light">
                            ({paymentStats?.notPaidCount || '-'})
                        </span>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default RepPaymentStats;