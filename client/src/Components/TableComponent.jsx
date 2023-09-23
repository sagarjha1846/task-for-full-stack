/* eslint-disable react/prop-types */

import { Table } from 'antd';

const TableComponent = (props) => {
  const { columnsDef, data, pagination, setTableParams } = props;

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  return (
    <div className="p-5">
      <Table
        columns={columnsDef}
        dataSource={data}
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{
          x: 1300,
          y: 500,
        }}
      />
    </div>
  );
};

export default TableComponent;
