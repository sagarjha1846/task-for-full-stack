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
    <div className="w-full p-2 rounded-md shadow-md bg-white">
      <Table
        className="w-full"
        columns={columnsDef}
        dataSource={data}
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{
          x: 1300,
          y: 350,
        }}
      />
    </div>
  );
};

export default TableComponent;
