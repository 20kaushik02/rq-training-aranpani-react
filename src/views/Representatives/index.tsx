import React, { useEffect } from 'react'
import "./representatives.scss"
import HeaderWithCreate from "../../shared/components/HeaderWithCreate";
import AppTable from "../../shared/components/AppTable";
import { generatePath, useLocation, useNavigate } from "react-router-dom";
import { AppRoutes } from "../../routes/routeConstants/appRoutes";
import AreaRepService from "../../services/AreaRepService/areaRep.service";
import { TablePaginationConfig } from 'antd';
import { AreaRepresentative } from '../../models/AreaRepresentative/areaRepresentative.model';

const Representatives = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { fetchAreaRepList, repPagination, areaRepLoading, areaRepList } = AreaRepService();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        fetchAreaRepList({
            search: params.get('search') || undefined,
            page: Number(params.get('page')) || undefined,
        });
    }, [])

    const columns = [
        {
            title: "S.No",
            dataIndex: "id",
            key: "id",
            width: 80,
            render: (_checked: boolean, _record: AreaRepresentative, index: number): number => {
                return index + 1;
            },
            defaultSortOrder: 'ascend',
            sorter: (a: any, b: any) => Number(a.regNumber.substring(3)) - Number(b.regNumber.substring(3)),
        },
        {
            title: "Reg Number",
            dataIndex: "regNumber",
            key: "regNumber",
            width: 100,
        },
        {
            title: "Name",
            dataIndex: "username",
            key: "username",
            width: 150,
            render: (_checked: boolean, record: AreaRepresentative): JSX.Element => {
                return <span>
                    {record?.profilePicUrl && <img src={record?.profilePicUrl} alt="" />}
                    <span>{record?.username}</span>
                </span>
            },
            ellipsis: true,
        },
        {
            title: "Mobile",
            dataIndex: "mobileNumber",
            key: "mobileNumber",
            width: 250,
            render: (_text: String, record: AreaRepresentative): JSX.Element => {
                return <span>
                    {`${record.isdCode || ''}-${record.mobileNumber || ''}`}
                </span>;
            }
        },
        {
            title: "# of donors",
            dataIndex: "donorsCount",
            key: "donorsCount",
            width: 100,
        },
        {
            title: "Country",
            dataIndex: ["country", "name"],
            key: "country",
            width: 60,
            ellipsis: true,
        },
        {
            title: "State",
            dataIndex: ["state", "name"],
            key: "state",
            width: 60,
            ellipsis: true,
        },
        {
            title: "District",
            dataIndex: ["city", "name"],
            key: "city",
            width: 90,
            ellipsis: true,
        },
        {
            title: "Pincode",
            dataIndex: "pinCode",
            key: "pinCode",
            width: 80,
        },
        {
            title: "Audit",
            dataIndex: "audit",
            key: "audit",
            width: 100,
            render: (_text: string, record: AreaRepresentative): JSX.Element => {
                return <i className={`${record?.auditStatus ? "icon-paid" : "icon-pending"}`} />;
            },
            filterDropdown: (): JSX.Element => {
                return <div className="audit-info">
                    <div>Column represents the audit for the month</div>
                    <div><i className="icon-paid" /> Done</div>
                    <div><i className="icon-pending" /> Pending</div>
                </div>;
            },
            filterIcon: (): JSX.Element => {
                return <div className="icon-info" />;
            }
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: 90,
            render: (_text: string, record: AreaRepresentative): JSX.Element => {
                return <span className={`${record?.status ? 'text-active' : 'text-inactive'}`}>
                    {record?.status ? 'Active' : 'Inactive'}
                </span>;
            }
        },
    ];

    const handleRowClick = (rep: AreaRepresentative) => ({
        onClick: () => {
            console.log(generatePath(AppRoutes.REPRESENTATIVE_DETAILS, {
                id: rep.id?.toString()
            }));
            
            navigate(generatePath(AppRoutes.REPRESENTATIVE_DETAILS, {
                id: rep.id?.toString()
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
        fetchAreaRepList({ search, page: 1 })
    }

    const tableChangeHandler = (pagination: TablePaginationConfig) => {
        const params = new URLSearchParams(location.search);
        params.set('page', `${pagination?.current}`);
        navigate(
            location.pathname + "?" + params.toString(),
            { replace: true },
        );
        fetchAreaRepList({
            page: pagination.current,
        });
    }

    return (
        <div className="representatives">
            <div className="header">
                <HeaderWithCreate title={"Area Representative"}
                    setFormVisible={() => { }}
                    disableCreate={true}
                />
            </div>

            <AppTable title={"Area Representative"}
                scroll={{ x: true }}
                handleSearch={handleSearch}
                columns={columns}
                data={areaRepList}
                onChange={tableChangeHandler}
                loading={areaRepLoading}
                totalRecords={repPagination?.totalCount || 0}
                handleRedirect={handleRowClick}
                pagination={{
                    pageSize: 50,
                    current: repPagination?.currentPage || 1,
                    total: repPagination?.totalCount,
                    showTotal: (total: number, range: [number, number]) => <p>Showing <b>{` ${range[0]} - ${range[1]}`}</b> of <b>{`${total.toLocaleString()}`}</b></p>
                }}
            />
        </div>
    )
}

export default Representatives;