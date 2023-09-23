/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import GraphComponent from './GraphComponent';
import TableComponent from './TableComponent';
import { useNavigate } from 'react-router-dom';

const Analytics = ({ jsonData, revenueType, setOptions }) => {
  const navigate = useNavigate();
  const listOfProduct = ['line_of_business', 'product', 'revenue_type'];
  const listOfRevenue = ['acv', 'tcv', 'revenue'];
  const [data, setData] = useState([]);
  const [columnsDef, setColumnsDef] = useState([]);

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  useEffect(() => {
    if (jsonData) {
      const columns = jsonData?.filter((el) => el.sheetName === 'Dictionary');

      const columnsDef = columns[0]?.data.map((el) => ({
        title: el['Definition'],
        dataIndex: el['Column name'],
        type: el['Value Type'],
        sorter: (a, b) => sortedTableData(a, b, el['Column name']),
        render: (value) =>
          listOfRevenue.includes(el['Column name'])
            ? value?.toLocaleString('en-IN', {
                style: 'currency',
                currency: 'INR',
              })
            : value,
      }));

      const data = jsonData.filter((el) => el.sheetName === 'Data');
      const dataSource = data[0]?.data;

      setData(dataSource?.sort((a, b) => b.acv - a.acv));

      setColumnsDef(columnsDef);
      setOptions(
        [...new Set(data[0]?.data.map((el) => el.revenue_type))].map((el) => ({
          value: el,
          label: el,
        }))
      );
    }
  }, [jsonData]);

  const sortedTableData = (a, b, field) => {
    const valueA = listOfProduct.includes(field)
      ? parseInt(a[field].split('-')[1])
      : a[field];
    const valueB = listOfProduct.includes(field)
      ? parseInt(b[field].split('-')[1])
      : b[field];

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return valueA - valueB;
    }

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return valueB.localeCompare(valueA);
    }

    return 0;
  };

  useEffect(() => {
    if (jsonData) {
      const data = jsonData.filter((el) => el.sheetName === 'Data')[0]?.data;
      if (revenueType) {
        setData(data?.filter((el) => el.revenue_type === revenueType));
      } else {
        setData(jsonData.filter((el) => el.sheetName === 'Data')[0]?.data);
      }
    }
  }, [jsonData, revenueType, tableParams]);

  useEffect(() => {
    if (!jsonData) navigate('/');
  }, [jsonData]);

  return (
    <div className="">
      <GraphComponent
        columnsDef={columnsDef}
        revenueType={revenueType}
        listOfProduct={listOfProduct}
        listOfRevenue={listOfRevenue}
        jsonData={
          jsonData
            ? jsonData.filter((el) => el.sheetName === 'Data')[0].data
            : null
        }
      />
      <TableComponent
        columnsDef={columnsDef}
        data={data}
        pagination={tableParams.pagination}
        setTableParams={setTableParams}
        tableParams={tableParams}
        setData={setData}
      />
    </div>
  );
};

export default Analytics;
