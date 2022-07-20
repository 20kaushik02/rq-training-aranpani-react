import React, { FC, useEffect, useState } from "react";
import './listDonors.scss'
import { Button, Dropdown, Menu, Popover, TablePaginationConfig } from "antd";
import { generatePath, useLocation, useNavigate } from "react-router-dom";
import DonorService from "../../../../services/DonorService/donor.service";
import { Donor } from "../../../../models/Donor/donor.model";
import { AppRoutes } from "../../../../routes/routeConstants/appRoutes";
import AppTable from "../../../../shared/components/AppTable";

interface ListDonorProps {
    representativeId?: number;
}

const ListDonors: FC<ListDonorProps> = ({ representativeId }) => {

    const navigate = useNavigate();
    const location = useLocation();

    const { fetchDonorList, donorPagination, donorList, donorLoading } = DonorService();

    useEffect(() => {
        fetchDonorList({
            representative_id: representativeId,
            page: donorPagination?.currentPage || Number(new URLSearchParams(location.search).get('page')) || 1,
            search: new URLSearchParams(location.search).get('search') || '',
        }).then()
    }, [])

    const [columns, setColumns] = useState([
        {
            title: "S.No",
            dataIndex: "id",
            key: "id",
            width: 80,
            render: (_checked: boolean, _record: Donor, index: number): number => {
                return index + 1;
            },
            defaultSortOrder: 'ascend',
            sorter: (a: any, b: any) => Number(a.regNumber.substring(3)) - Number(b.regNumber.substring(3)),
        },
        {
            title: "Donor ID",
            dataIndex: "regNumber",
            key: "regNumber",
            width: 70,
        },
        {
            title: "Name",
            dataIndex: "username",
            key: "username",
            width: 130,
            ellipsis: true,
        },
        {
            title: "Mobile",
            dataIndex: "mobileNumber",
            key: "mobileNumber",
            width: 150,
            render: (text: String, record: Donor) => <span>{`${record.isdCode || ''}-${record.mobileNumber || ''}`}</span>
        },
        {
            title: "Group #",
            dataIndex: "numberOfMembers",
            key: "numberOfMembers",
            width: 90,
            render: (text: string, record: Donor) =>
                <span>{record?.group?.members?.length}</span>
        },
        {
            title: "Type",
            dataIndex: "donorType",
            key: "donorType",
            width: 130,
            render: (text: string) => <span className="text-capitalize">{text}</span>
        },
        {
            title: "Group Head",
            dataIndex: "headRegNumber",
            key: "headRegNumber",
            width: 120,
        },
        {
            title: "Country",
            dataIndex: ["country", "name"],
            key: "country",
            width: 50,
            render: (text: string) => <span className="text-capitalize">{text}</span>
        },
        {
            title: "State",
            dataIndex: ["state", "name"],
            key: "state",
            width: 50,
            render: (text: string) => <span className="text-capitalize">{text}</span>
        },
        {
            title: "District",
            dataIndex: ["city", "name"],
            key: "city",
            width: 50,
            render: (text: string) => <span className="text-capitalize">{text}</span>
        },
        {
            title: "Pincode",
            dataIndex: "pinCode",
            key: "pinCode",
            width: 50,
        },
        {
            title: "Donation",
            dataIndex: "donation",
            key: "donation",
            width: 100,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: 60,
            render: (text: string, record: Donor) =>
                <span className={`${record?.status ? 'text-active' : 'text-inactive'}`}>
                    {record?.status ? 'Active' : 'Inactive'}
                </span>
        },
        {
            title: "Last pay",
            dataIndex: "lastPay",
            key: "lastPay",
            width: 100,
        },
    ]);

    const tableChangeHandler = (pagination: TablePaginationConfig) => {
        const params = new URLSearchParams(location.search);
        params.set('page', `${pagination?.current}`);
        navigate(
            location.pathname + "?" + params.toString(),
            { replace: true },
        );
        fetchDonorList({
            representative_id: representativeId,
            page: pagination.current,
        });

    }

    const handleRowClick = (donor: Donor) => ({
        onClick: () => {
            navigate(generatePath(AppRoutes.DONOR_DETAILS, {
                id: donor.id?.toString()
            }))
        },
    });

    const handleSearch = (search: string) => {
        const params = new URLSearchParams(location.search);
        if (search)
            params.set('search', search);
        else
            params.delete('search');
        params.set('page', '1');
        navigate(
            location.pathname + "?" + params.toString(),
            { replace: true },
        );
        fetchDonorList({ search, representative_id: representativeId, page: 1 })
    }

    return (
        <div className="list-donors">
            <AppTable title={"Donor"}
                columns={columns}
                scroll={{ x: true }}
                handleSearch={handleSearch}
                handleRedirect={() => { }}
                onChange={tableChangeHandler}
                data={donorList}
                loading={donorLoading}
                totalRecords={donorPagination?.totalCount || 0}
                pagination={{
                    pageSize: 50,
                    current: donorPagination?.currentPage || 1,
                    total: donorPagination?.totalCount,
                    showTotal: (total: number, range: [number, number]) => <p>Showing <b>{` ${range[0]} - ${range[1]}`}</b> of <b>{`${total.toLocaleString()}`}</b></p>
                }}
            />
        </div>
    );
};

export default ListDonors;
