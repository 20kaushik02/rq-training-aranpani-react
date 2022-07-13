import React, { FC, useCallback } from 'react';
import { debounce } from "lodash";

import "./appTable.scss"
import { Col, Input, Row, Table, TablePaginationConfig } from "antd";
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/lib/table/interface';

interface AppTableProps {
    data?: any;
    projectType?: string;
    title?: string;
    handleSearch: Function;
    columns: any;
    loading?: boolean;
    totalRecords?: number;
    onChange?: (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: SorterResult<any> | SorterResult<any>[], extra: TableCurrentDataSource<any>) => void
    pagination?: TablePaginationConfig | false;
    handleRedirect?: Function;
}

const AppTable: FC<AppTableProps> = (props) => {
    const { data, projectType, title, handleSearch, columns, loading, totalRecords, onChange, pagination = {
        defaultPageSize: 50,
    }, handleRedirect } = props;


    const searchHandler = useCallback(debounce(handleSearch as any, 500), []);

    return (
        <div className="app-table">
            <Row justify="space-between" className="filters">
                <Col span={6}>
                    {!!totalRecords && <pre><span>{totalRecords ?? 0}</span> {projectType} {title}(s)</pre>}
                </Col>
                <Col span={18}>
                    <Input
                        className="search-field"
                        placeholder="Search by reg no., name, phone number ..."
                        size="small"
                        prefix={<i className="icon-search" />}
                        onChange={(e: any) => searchHandler(e?.target?.value)}
                    />
                </Col>
            </Row>
            <Table
                dataSource={data}
                columns={columns}
                pagination={{
                    ...pagination,
                    showSizeChanger: false
                }}
                onRow={handleRedirect as any}
                loading={loading}
                onChange={onChange}
            />
        </div>
    )
}

export default AppTable;